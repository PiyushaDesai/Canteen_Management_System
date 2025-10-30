package com.canteen.backend.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canteen.backend.model.OtpVerification;
import com.canteen.backend.repository.OtpVerificationRepository;

@Service
public class OtpService {

    @Autowired
    private OtpVerificationRepository otpRepo;

    public void createOrUpdateOtp(String email, String otp, LocalDateTime expiry) {
        Optional<OtpVerification> existing = otpRepo.findByEmail(email);

        OtpVerification entity = existing.orElse(new OtpVerification());
        entity.setEmail(email);
        entity.setOtp(otp);
        entity.setExpiryTime(expiry);

        otpRepo.save(entity);
    }


    public boolean isValidOtp(String email, String inputOtp) {
        Optional<OtpVerification> optional = otpRepo.findByEmail(email);
        if (optional.isEmpty()) return false;

        OtpVerification otp = optional.get();

        return otp.getOtp().equals(inputOtp) && otp.getExpiryTime().isAfter(LocalDateTime.now());
    }

    public void deleteOtp(String email) {
        otpRepo.findByEmail(email).ifPresent(otpRepo::delete);
    }
}
