package com.canteen.backend.controller;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.canteen.backend.dto.OTPRequest;
import com.canteen.backend.model.User;
import com.canteen.backend.service.IUserService;
import com.canteen.backend.service.JwtService;
import com.canteen.backend.service.MailService;
import com.canteen.backend.service.OtpService;

@RestController
@RequestMapping("/")

@CrossOrigin(origins = {

        "http://localhost:5173",
        "https://canteen-management-system-theta.vercel.app"
})


//@CrossOrigin(origins = "*")

public class AuthController {

    @Autowired
    private IUserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private OtpService otpService;
    
    @Autowired
    private JwtService jwtService;

    private final SecureRandom secureRandom = new SecureRandom();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        String email = user.getEmail();

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email is required"));
        }

        if (userService.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email already exists"));
        }

        try {
            // ✅ Generate OTP only once
            String otp = String.format("%06d", secureRandom.nextInt(1_000_000));
            LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);

            // Save user with verified=false
            user.setVerified(false);
            userService.registerUser(user);

            // ✅ Save OTP in DB
            otpService.createOrUpdateOtp(email, otp, expiry);

            // ✅ Send exact same OTP in email
            mailService.sendOTPEmail(email, otp);

            return ResponseEntity.ok(Map.of("message", "OTP sent to email"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to send OTP", "error", e.getMessage()));
        }
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OTPRequest payload) {
        String email = payload.getEmail();
        String otp = payload.getOtp();

        if (!otpService.isValidOtp(email, otp)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid or expired OTP"));
        }

        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "User not found"));
        }

        User user = optionalUser.get();
        user.setVerified(true);
        userService.registerUser(user); // update user

        otpService.deleteOtp(email); // cleanup

        mailService.sendRegistrationEmail(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    // ✅ Merged admin + user login logic into one method
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // ✅ Admin login hardcoded
        if ("admin@gmail.com".equalsIgnoreCase(email) && "admin123".equals(password)) {
        	String token = jwtService.generateToken(email);
            Map<String, Object> adminResponse = new HashMap<>();
            adminResponse.put("fullName", "Admin");
            adminResponse.put("email", "admin@gmail.com");
            adminResponse.put("role", "ADMIN");
            adminResponse.put("token", token);
            adminResponse.put("message", "Admin login successful");
            return ResponseEntity.ok(adminResponse);
        }

        // ✅ Normal user login
        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isEmpty() ||
            !userService.checkPassword(password, optionalUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        User user = optionalUser.get();

        if (!user.isVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Please verify your email before logging in."));
        }
        String token = jwtService.generateToken(email);

        Map<String, Object> response = new HashMap<>();
        response.put("id",user.getId());
        response.put("fullName", user.getFullName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("token",token );
        response.put("message", "Login successful");
        

        return ResponseEntity.ok(response);
    }
}
