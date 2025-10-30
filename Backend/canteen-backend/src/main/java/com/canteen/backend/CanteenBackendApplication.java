package com.canteen.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;

@SpringBootApplication
public class CanteenBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CanteenBackendApplication.class, args);
	}
    
	@Bean
	public ModelMapper modelMapper() {
		System.out.println("creating model mapper");
		return new ModelMapper();
	}
	
}
