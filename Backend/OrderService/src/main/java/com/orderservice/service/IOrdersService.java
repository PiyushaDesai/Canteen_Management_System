package com.orderservice.service;

import java.util.List;

import com.orderservice.dto.ApiResponse;
import com.orderservice.dto.OrderRequest;
import com.orderservice.dto.OrderResponse;
import com.orderservice.dto.OrderUpdateRequest;
import com.orderservice.model.Orders;



public interface IOrdersService {
	
	OrderResponse placeOrder(OrderRequest order);

	List<OrderResponse> getAllOrders();

	 List<OrderResponse> getAllOrdersById(Long id);

	ApiResponse deleteOrderById(Long id);

	

	 boolean updateOrderStatus(long orderId, String status);

	Integer getTotalOrders();

	Double getTotalRevenue();

}
