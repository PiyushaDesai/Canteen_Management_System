package com.canteen.backend.dto;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@ToString
public class UserDetailsDto {

    private Long id;  
    private String fullName;
    private String email;
    private String role;
}
