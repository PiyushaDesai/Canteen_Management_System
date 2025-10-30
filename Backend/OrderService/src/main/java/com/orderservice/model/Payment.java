package com.orderservice.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection="payments")
public class Payment {
 
	@Transient
	public static final String SEQUENCE_NAME="payments_sequence";
	
	@Id
	private Long id;
	
	private Long orderId;
	
	private double amount;
	
	private String currency;

	private String paymentStatus;  //success, failed, pending
	
	private String razorpayOrderId;
			
}
