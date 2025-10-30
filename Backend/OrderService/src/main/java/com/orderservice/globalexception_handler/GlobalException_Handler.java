package com.orderservice.globalexception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.orderservice.custom_exception.ResourceNotFoundException;
import com.orderservice.dto.ErrorResponse;



@RestControllerAdvice
public class GlobalException_Handler {
  
	
	@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> resourceNotFound(ResourceNotFoundException e) {
        ErrorResponse error = new ErrorResponse("Resource Not Found", e.getMessage(),HttpStatus.NOT_FOUND.value());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> runTimeNotFound(RuntimeException e)
    {
    	
    	 ErrorResponse error = new ErrorResponse("Resource Not Found", e.getMessage(),HttpStatus.NOT_FOUND.value());
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
