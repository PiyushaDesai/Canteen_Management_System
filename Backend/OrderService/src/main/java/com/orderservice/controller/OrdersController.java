package com.orderservice.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orderservice.dto.OrderRequest;
import com.orderservice.dto.OrderUpdateRequest;
import com.orderservice.model.Orders;
import com.orderservice.service.IOrdersService;



@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {
		"http://localhost:5173",
		"https://canteen-management-system-theta.vercel.app"})
public class OrdersController {
	
	@Autowired
	private IOrdersService orderService;
	
	
	@PostMapping("/add")
	public ResponseEntity<?> addOrder(@RequestBody OrderRequest order)
	{
		return ResponseEntity.ok(orderService.placeOrder(order));
	}
	
	@GetMapping
	public ResponseEntity<?> getAllOrders()
	{
		return ResponseEntity.ok(orderService.getAllOrders());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> getAllOrdersByUserId(@PathVariable Long id)
	{
		return ResponseEntity.ok(orderService.getAllOrdersById(id));
	}
	
	@DeleteMapping("{id}")
	
	public ResponseEntity<?> deleteOrderById(@PathVariable Long id)
	{
		
		return ResponseEntity.ok(orderService.deleteOrderById(id));
	}
	
	
//	@PutMapping("{id}")
//	
//	public ResponseEntity<?> updateOrderStatus(@RequestBody OrderUpdateRequest updateOrder)
//	{
//		return ResponseEntity.ok(orderService.updateOrderStatus(updateOrder));
//	}
	
	@PutMapping("/{orderId}/status")
	public ResponseEntity<String> updateOrderStatus(
	        @PathVariable long orderId,
	        @RequestParam String status) {

	    boolean updated = orderService.updateOrderStatus(orderId, status);

	    if (updated) {
	        return ResponseEntity.ok("Order status updated successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                             .body("Order not found");
	    }
	}
	
	
	@GetMapping("/total-orders")
	public ResponseEntity<?> getTotalOrders() {
	    Map<String, Integer> response = new HashMap<>();
	    response.put("totalOrders", orderService.getTotalOrders());
	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("/total-revenue")
	public ResponseEntity<?> getTotalRevenue()
	{
		Map<String,Double> response=new HashMap<>();
		response.put("totalRevenue", orderService.getTotalRevenue());
		return ResponseEntity.ok(response);
	}
}
