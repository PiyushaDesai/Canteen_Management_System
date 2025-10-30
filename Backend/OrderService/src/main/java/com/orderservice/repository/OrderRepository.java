package com.orderservice.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.orderservice.dto.OrderItemRequest;
import com.orderservice.model.Orders;



public interface OrderRepository extends MongoRepository<Orders, Long>{

	List<Orders> findByUserId(Long id);

	List<Orders> findByPaymentStatus(String paymentStatus);


}
