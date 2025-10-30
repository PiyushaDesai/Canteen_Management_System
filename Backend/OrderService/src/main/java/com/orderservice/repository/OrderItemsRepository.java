package com.orderservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.orderservice.model.OrderItems;



public interface OrderItemsRepository extends MongoRepository<OrderItems, Long>{

	List<OrderItems> findByOrderId(Long id);

}
