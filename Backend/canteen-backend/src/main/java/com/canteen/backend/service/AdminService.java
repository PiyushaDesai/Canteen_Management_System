package com.canteen.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.canteen.backend.custom_exception.ResourceNotFoundException;
import com.canteen.backend.dto.ApiResponse;
import com.canteen.backend.dto.UserDetailsDto;
import com.canteen.backend.dto.UserUpdateDto;
import com.canteen.backend.model.User;
import com.canteen.backend.repository.AdminRepository;

import com.canteen.backend.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminService implements IAdminService{

	 private AdminRepository adminRepository;
	
      private UserRepository userRepository;
      
     
      
      private ModelMapper modelMapper;
	
	
	@Override
	public Integer getNoOfUsers() {
		long totalUsers=userRepository.count();
		return (int) totalUsers;
	}


	


	@Override
	public List<UserDetailsDto> getAllUsers() {
		List<User> list=userRepository.findAll();
		
		
	   return list.stream().map(user->modelMapper.map(user,UserDetailsDto.class))
			   .collect(Collectors.toList());
	}


	@Override
	public ApiResponse deleteUserById(Long id) {
		User user=userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid id"));
		if(user != null)
		{
			userRepository.delete(user);
			
		}
		return new ApiResponse("user deleted successfully");
	}


	@Override
	public ApiResponse updateUser(Long id,UserUpdateDto updateUserData) {
		User user=userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid id"));
		if(user != null)
		{
			User tempUser= modelMapper.map(updateUserData,User.class);
			tempUser.setId(id);
			userRepository.save(tempUser);
			
		}
		return new ApiResponse("user updated successfully");
	}

}
