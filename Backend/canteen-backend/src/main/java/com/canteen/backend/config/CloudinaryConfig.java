package com.canteen.backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "drakrqngp");
        config.put("api_key", "287263347149353");
        config.put("api_secret", "FUZ0X3BOlVF27f6Bn33ijCulEEI");
        return new Cloudinary(config);
    }
}
