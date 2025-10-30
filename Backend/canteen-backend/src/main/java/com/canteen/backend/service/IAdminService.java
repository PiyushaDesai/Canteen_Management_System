package com.canteen.backend.service;

import java.util.List;

import com.canteen.backend.dto.ApiResponse;
import com.canteen.backend.dto.UserDetailsDto;
import com.canteen.backend.dto.UserUpdateDto;

public interface IAdminService {
	Integer getNoOfUsers();

	

	List<UserDetailsDto> getAllUsers();

	ApiResponse deleteUserById(Long id);

	ApiResponse updateUser(Long id,UserUpdateDto updateUserData);

}
