package com.premanand.ecommerce.ecommerce_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {

    private Long id;
    private String email;
    private String password;
    private String name;
    private String role; // user, seller, admin

}
