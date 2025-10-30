package com.orderservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orderservice.dto.PaymentRequestDto;
import com.orderservice.service.IPaymentService;
import com.orderservice.service.PaymentService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = {
		"http://localhost:5173",
		"https://canteen-management-system-theta.vercel.app"})
public class PaymentController {
	
	
	private  final IPaymentService paymentService;
	
	 public PaymentController(PaymentService paymentService) {
	        this.paymentService = paymentService;
	    }
	
	@PostMapping("/create")
	public ResponseEntity<?> createPayment(@RequestBody PaymentRequestDto request) throws RazorpayException
	{
		return ResponseEntity.ok(paymentService.createPayment(request));
	}
	
	
	
	@PostMapping("/verify")
	public ResponseEntity<?> confirmPayment(@RequestParam Long paymentId, @RequestParam String status)
	{
		return ResponseEntity.ok(paymentService.updatePaymentStatus(paymentId, status));
	}
	
	
	
	

}
