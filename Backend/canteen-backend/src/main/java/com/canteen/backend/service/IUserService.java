package com.canteen.backend.service;

import java.util.Optional;

import com.canteen.backend.model.User;

public interface IUserService {
    User registerUser(User user);

    Optional<User> findByEmail(String email);

    boolean checkPassword(String rawPassword, String encodedPassword);
}
