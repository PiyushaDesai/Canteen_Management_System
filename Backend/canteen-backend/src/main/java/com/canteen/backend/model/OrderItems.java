package com.canteen.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(collection="OrderItems")
public class OrderItems {
  
	@Transient
	public static final String SEQUENCE_NAME="ordersItem_sequence";
	
	@Id
	private Long id;
	private Long orderId;
	private Long itemId;
	private int quantity;
	private double unitPrice;
	
	
}
