package com.orderservice.custom_exception;

public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String msg)
	{
		super(msg);
	}


}
