package com.canteen.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.canteen.backend.model.User;
import com.canteen.backend.repository.UserRepository;

import com.canteen.backend.service.*;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserService implements IUserService {

    
    private UserRepository userRepository;
    @Autowired
    private SequenceGeneratorService sequenceGenerator;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

//    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {
        Optional<User> existingUserOpt = userRepository.findByEmail(user.getEmail());

        if (existingUserOpt.isPresent()) {
            // Update existing user
            User existingUser = existingUserOpt.get();
            existingUser.setFullName(user.getFullName());
            existingUser.setPassword(passwordEncoder.encode(user.getPassword())); // ✅ encode here
            existingUser.setRole(user.getRole());
            existingUser.setVerified(user.isVerified());
            return userRepository.save(existingUser);
        } else {
            // Register new user
            user.setId(sequenceGenerator.generateSequence(User.SEQUENCE_NAME));
            //user.setPassword(passwordEncoder.encode(user.getPassword())); // ✅ encode here
            return userRepository.save(user);
        }
    }





    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean checkPassword(String rawPassword, String encodedPassword) {
    	System.out.println(rawPassword);
    	
    	System.out.println(encodedPassword);
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }


}
