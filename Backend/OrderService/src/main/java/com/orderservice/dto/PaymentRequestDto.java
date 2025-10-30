package com.orderservice.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDto {
	
	    private Long orderId;
	    private double amount;
	    
	   // private String paymentMethod; // UPI, Card, NetBanking
	   // private String paymentStatus; // success, failed, pending
	   // private String razorpayPaymentId;
	    //private LocalDateTime paymentDate;
}
