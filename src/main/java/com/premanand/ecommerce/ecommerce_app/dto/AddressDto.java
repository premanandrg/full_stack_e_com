package com.premanand.ecommerce.ecommerce_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {

    private Long id;
    private String email;
    private String name;
    private String street;
    private String city;
    private String pincode;

}
