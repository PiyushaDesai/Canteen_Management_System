
package com.canteen.backend.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Document(collection = "users")
public class User {
   
	@Transient
	public static final String SEQUENCE_NAME = "users_sequence";
	
	    
	    @Id
	    private Long id;  // MongoDB uses String ObjectId by default
	    private String fullName;
	    private String email;
	    private String role;
	    private String password;
	    private boolean verified = false;
    
    @JsonIgnore
    @DBRef(lazy=true)
    private List<Orders>orderList=new ArrayList<>();
    
    
	}
