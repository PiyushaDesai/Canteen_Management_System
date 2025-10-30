package com.canteen.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "otp_verifications")
public class OtpVerification {

    @Id
    private String id; // can use UUID or ObjectId
    
    private String email; // user email
    private String otp;

    @Indexed(expireAfterSeconds = 0)
    private LocalDateTime expiryTime;
}
