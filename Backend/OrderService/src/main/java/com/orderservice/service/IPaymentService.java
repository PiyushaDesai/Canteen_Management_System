package com.orderservice.service;

import org.springframework.http.ResponseEntity;

import com.orderservice.dto.ApiResponse;
import com.orderservice.dto.PaymentRequestDto;
import com.orderservice.dto.PaymentResponse;
import com.razorpay.RazorpayException;

public interface IPaymentService {

	PaymentResponse createPayment(PaymentRequestDto request) throws RazorpayException;

	ApiResponse updatePaymentStatus(Long paymentId, String status);

}
