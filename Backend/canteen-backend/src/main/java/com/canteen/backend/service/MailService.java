package com.canteen.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;

import com.canteen.backend.model.User;

@Service
public class MailService {

	 @Autowired
	    private JavaMailSender mailSender;

	    public void sendRegistrationEmail(User user) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(user.getEmail());
	        message.setSubject("Registration Successful - Canteen Portal");
	        message.setText("Hello " + user.getFullName() + ",\n\n" +
	                "Congratulations! You have successfully registered.\n\n" +
	                "Email: " + user.getEmail() + "\n" +
	                "Password: " + user.getPassword() + "\n\n" +
	                "Thank you for joining us!\n\n" +
	                "Best regards,\nCanteen Management System");

	        mailSender.send(message);
	    }
	    
	    public void sendOTPEmail(String to, String otp) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(to);
	        message.setSubject("Your OTP Code");
	        message.setText("Your OTP is: " + otp + "\nPlease do not share it with anyone.");
	        mailSender.send(message);
	    }

}
