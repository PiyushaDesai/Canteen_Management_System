package com.orderservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentResponse {
	    
	    private Long id;
	    private String razorpayOrderId;
	    private String razorpayKey;
	    private double amount;
	    private String currency;

	    public PaymentResponse(Long id,String razorpayOrderId, String razorpayKey, double amount, String currency) {
	        this.id=id;
	    	this.razorpayOrderId = razorpayOrderId;
	        this.razorpayKey = razorpayKey;
	        this.amount = amount;
	        this.currency = currency;
	    }
}
