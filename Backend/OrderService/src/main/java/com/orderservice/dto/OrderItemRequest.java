package com.orderservice.dto;

import lombok.Data;

@Data
public class OrderItemRequest {
	
	private Long itemId;
	private String itemName;
	private int quantity;
	private double unitPrice;
	
	

}
