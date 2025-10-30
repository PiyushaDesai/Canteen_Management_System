package com.canteen.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class ApiResponse {
  
	 private String message;
	   

	    public ApiResponse() {}

	    public ApiResponse(String message) {
	        this.message = message;
	       
	    }
}
