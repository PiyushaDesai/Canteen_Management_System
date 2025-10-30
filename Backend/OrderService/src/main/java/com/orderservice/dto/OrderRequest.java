package com.orderservice.dto;

import java.time.LocalDateTime;
import java.util.List;



import lombok.Data;

@Data
public class OrderRequest {
	
	private Long userId;
	private double totalAmount;
	private String status;
	private String paymentStatus;
	private List<OrderItemRequest> items;

}
