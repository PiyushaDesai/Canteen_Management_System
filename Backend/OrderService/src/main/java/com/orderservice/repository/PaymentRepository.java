package com.orderservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.orderservice.model.Payment;

public interface PaymentRepository extends MongoRepository<Payment, Long> {

}
