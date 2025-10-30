package com.orderservice.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.orderservice.dto.ApiResponse;
import com.orderservice.dto.PaymentRequestDto;
import com.orderservice.dto.PaymentResponse;
import com.orderservice.model.Orders;
import com.orderservice.model.Payment;
import com.orderservice.repository.OrderRepository;
import com.orderservice.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class PaymentService implements IPaymentService {

    @Value("${razorpay.key_id}")
    private String razorpayKey;

    @Value("${razorpay.key_secret}")
    private String razorpaySecret;

    private final PaymentRepository paymentRepository;
    
    private final OrderRepository orderRepository;
    
    private final SequenceGeneratorService sequenceGenerator;

    public PaymentService(PaymentRepository paymentRepository,OrderRepository orderRepository,SequenceGeneratorService sequenceGenerator) {
        this.paymentRepository = paymentRepository;
        this.orderRepository=orderRepository;
        this.sequenceGenerator=sequenceGenerator;
    }

    /**
     * Step 1: Create Payment Order in Razorpay and store details in DB.
     */
    @Override
    public PaymentResponse createPayment(PaymentRequestDto request) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", request.getAmount() * 100); // Razorpay expects paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_rcptid_" + request.getOrderId());

        // Create Razorpay Order
        Order razorpayOrder = client.orders.create(orderRequest);

        // Save initial payment record
        Payment payment = new Payment();
        payment.setId(sequenceGenerator.generateSequence(Payment.SEQUENCE_NAME));
        payment.setOrderId(request.getOrderId());
        payment.setAmount(request.getAmount());
        payment.setCurrency("INR");
        payment.setPaymentStatus("PENDING"); // Status will be updated after verification
        payment.setRazorpayOrderId(razorpayOrder.get("id"));

        paymentRepository.save(payment);

        // Send this back to frontend so they can use Razorpay Checkout
      
        		return new PaymentResponse(
        			    payment.getId(),
        			    razorpayOrder.get("id"),
        			    razorpayKey,
        			    request.getAmount() * 100,  // amount in paise
        			    "INR"
        			);

    }

    /**
     * Step 2: Update payment status after frontend verification
     */
    @Override
    public ApiResponse updatePaymentStatus(Long paymentId, String status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setPaymentStatus(status.toUpperCase());
        paymentRepository.save(payment);
        
        // Update order status accordingly
        Orders order = orderRepository.findById(payment.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if ("SUCCESS".equalsIgnoreCase(status)) {
            order.setPaymentStatus("PAID");
        } else if ("FAILED".equalsIgnoreCase(status)) {
            order.setPaymentStatus("PAYMENT_FAILED");
        }
        orderRepository.save(order);

        return new ApiResponse("Payment status updated successfully");
    }
}
