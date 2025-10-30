package com.orderservice.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orderservice.custom_exception.ResourceNotFoundException;
import com.orderservice.dto.ApiResponse;
import com.orderservice.dto.OrderItemRequest;
import com.orderservice.dto.OrderItemResponse;
import com.orderservice.dto.OrderRequest;
import com.orderservice.dto.OrderResponse;
import com.orderservice.dto.OrderUpdateRequest;
import com.orderservice.model.OrderItems;
import com.orderservice.model.Orders;
import com.orderservice.repository.OrderItemsRepository;
import com.orderservice.repository.OrderRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OrderService implements IOrdersService{
  
	
	private  OrderRepository orderRepository;
	
	private OrderItemsRepository orderItemRepository;
	
	private SequenceGeneratorService sequenceGenerator;
	
	private ModelMapper modelMapper;
	
	
	@Override
	public OrderResponse placeOrder(OrderRequest request) {
		
//		Orders tempOrder=modelMapper.map(order, Orders.class);
//		tempOrder.setId(sequenceGenerator.generateSequence(Orders.SEQUENCE_NAME));
//
//		tempOrder.setCreatedOn(LocalDateTime.now());
//		
//		
//	
//		
//		 
//		Orders saveOrder=orderRepository.save(tempOrder);
//		
//		for(OrderItemRequest item:order.getItems())
//		{
//			OrderItems orderItem=modelMapper.map(item,OrderItems.class);
//			OrderItems orderItem=modelMapper.typeMap(item, OrderItems.class)
//		    .addMappings(mapper -> mapper.skip(Orders::setId));
//
//			
//			orderItem.setId(sequenceGenerator.generateSequence(OrderItems.SEQUENCE_NAME));
//			orderItem.setOrderId(saveOrder.getId());
//			
//			
//			orderItemRepository.save(orderItem);
//		}
		
		 Orders order = new Orders();
	        long orderId=sequenceGenerator.generateSequence(Orders.SEQUENCE_NAME);
	        order.setId(orderId);
	 
	        order.setUserId(request.getUserId());
	        String orderToken = "ORD-" + LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE)
                    + "-" + String.format("%05d", orderId);
            order.setTokenNo(orderToken);
	        order.setStatus("pending");
	        order.setPaymentStatus("pending");
	        order.setCreatedOn(LocalDateTime.now());
	        order.setUpdatedOn(LocalDateTime.now());
	        

	        Orders savedOrder = orderRepository.save(order);

	        // Save each OrderItem linked to the order
	        for (OrderItemRequest item : request.getItems()) {
	            OrderItems orderItem = new OrderItems();
	            orderItem.setId(sequenceGenerator.generateSequence(OrderItems.SEQUENCE_NAME));
	            orderItem.setOrderId(savedOrder.getId());
	            orderItem.setItemId(item.getItemId());
	            orderItem.setItemName(item.getItemName());
	            orderItem.setQuantity(item.getQuantity());
	            orderItem.setUnitPrice(item.getUnitPrice());
	            
	            
	            orderItemRepository.save(orderItem);
	        }
	        List<OrderItemRequest> items=request.getItems();
	        double totalAmount = items.stream()
	        		.mapToDouble(i->i.getQuantity()* i.getUnitPrice())
	        		.sum();
	        savedOrder.setTotalAmount(totalAmount);
	        orderRepository.save(savedOrder);
	        
	        
	        
	        
	     // Map to response DTO
	        OrderResponse response = modelMapper.map(savedOrder, OrderResponse.class);

	        // Map items to DTO
	        List<OrderItemResponse> itemResponses = items.stream()
	                .map(i -> modelMapper.map(i, OrderItemResponse.class))
	                .collect(Collectors.toList());
	        response.setItems(itemResponses);

	        // Initially no payment details
	        response.setPaymentStatus(null);

	        return response;
		
		
	}


	@Override
	public List<OrderResponse> getAllOrders() {
		List<Orders> ordersList=orderRepository.findAll();
		
		List<OrderResponse> responses=new ArrayList<>();
		
		for(Orders order: ordersList)
		{
			OrderResponse orderResponse=modelMapper.map(order, OrderResponse.class);
			
			List<OrderItems> orderItems=orderItemRepository.findByOrderId(order.getId());
			
			List<OrderItemResponse> itemResponses= orderItems.stream()
					.map(item->modelMapper.map(item,OrderItemResponse.class))
					.toList();
			
			orderResponse.setItems(itemResponses);
			
			responses.add(orderResponse);
			
		}
		
		return responses;
		
		
		
		
	}


	@Override
	public List<OrderResponse> getAllOrdersById(Long id) {
       
		List<Orders> ordersList=orderRepository.findByUserId(id);
		
		List<OrderResponse> responses=new ArrayList<>();
		
		for(Orders order: ordersList)
		{
			OrderResponse orderResponse=modelMapper.map(order, OrderResponse.class);
			
			List<OrderItems> orderItems=orderItemRepository.findByOrderId(order.getId());
			
			List<OrderItemResponse> itemResponses= orderItems.stream()
					.map(item->modelMapper.map(item,OrderItemResponse.class))
					.toList();
			
			orderResponse.setItems(itemResponses);
			
			responses.add(orderResponse);
			
		}
		
		return responses;
	}


	@Override
	public ApiResponse deleteOrderById(Long id) {
		
		Orders order= orderRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid id"));
		
		List<OrderItems> itemsList=orderItemRepository.findByOrderId(id);
		for(OrderItems item: itemsList)
		{
			orderItemRepository.delete(item);
		}
		orderRepository.delete(order);
		return new ApiResponse("Order deleted successfully");
	}


//	@Override
//	public ApiResponse updateOrderStatus(OrderUpdateRequest updateOrder) {
//	    // 1. Find the existing order
//	    Optional<Orders> optionalOrder = orderRepository.findById(updateOrder.getId());
//
//	    if (optionalOrder.isEmpty()) {
//	        throw new ResourceNotFoundException("Order not found with ID: " + updateOrder.getId());
//	    }
//
//	    Orders existingOrder = optionalOrder.get();
//
//	    // 2. Update only the required fields
//	    existingOrder.setStatus(updateOrder.getStatus());
//	    existingOrder.setPaymentStatus(updateOrder.getPaymentStatus());
//	    // add more fields if needed
//
//	    // 3. Save the updated order
//	    orderRepository.save(existingOrder);
//
//	    return new ApiResponse("Updated successfully");
//	}
     
	
	@Override
    public boolean updateOrderStatus(long orderId, String status) {
        Optional<Orders> orderOptional = orderRepository.findById(orderId);

        if (orderOptional.isPresent()) {
            Orders order = orderOptional.get();
            order.setStatus(status);
            order.setUpdatedOn(LocalDateTime.now());
            orderRepository.save(order);
            return true;
        }
        return false;
    }


	
	@Override
	public Integer getTotalOrders() {
		Integer totalOrders=(int) orderRepository.count();
		return  totalOrders;
	}


	@Override
	public Double getTotalRevenue() {
	    double totalRevenue=orderRepository.findByPaymentStatus("PAID")
	            .stream()
	            .mapToDouble(Orders::getTotalAmount)
	            .sum();
	    
	    return totalRevenue;
	}


	

}
