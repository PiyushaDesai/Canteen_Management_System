package com.orderservice.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(collection="Orders")
public class Orders {
	
	@Transient
	public static final String SEQUENCE_NAME="orders_sequence";
	
	@Id
	private Long id;
	private Long userId;
	
	private String tokenNo;
	private double totalAmount;
	private String status;  //"pending" , "confirmed" ,"delivered"
	private String paymentStatus; // "pending" ,"success" , "failed"
	private LocalDateTime createdOn;
    private LocalDateTime updatedOn; 
	
	private List<OrderItems> items;
	
	
	
	


}
