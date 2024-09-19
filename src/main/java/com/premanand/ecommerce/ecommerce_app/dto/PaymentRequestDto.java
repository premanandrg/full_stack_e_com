package com.premanand.ecommerce.ecommerce_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentRequestDto {
    private int amount;  
    private String currency;
}
