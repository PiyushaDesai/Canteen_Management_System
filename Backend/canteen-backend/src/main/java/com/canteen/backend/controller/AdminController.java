package com.canteen.backend.controller;



import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.canteen.backend.dto.UserUpdateDto;
import com.canteen.backend.service.IAdminService;

@RestController
@RequestMapping("/admin")

@CrossOrigin(
	    origins = "*")


public class AdminController {
	
	
	@Autowired
	private IAdminService adminService;
	
	
	@GetMapping("/users")
	public ResponseEntity<?> getTotalUsers() {
	    Map<String, Integer> response = new HashMap<>();
	    response.put("totalUsers", adminService.getNoOfUsers());
	    return ResponseEntity.ok(response);
	}
    
	@GetMapping("/users-list")
	public ResponseEntity<?> getAllUsers()
	{
	  return ResponseEntity.ok(adminService.getAllUsers());
	}
	
	
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable Long id)
	{
	   return ResponseEntity.ok(adminService.deleteUserById(id));	
	}
      
	
	@PutMapping("/users/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserUpdateDto updateUserData )
	{
		return ResponseEntity.ok(adminService.updateUser(id,updateUserData));
	}
	
	

	

}
