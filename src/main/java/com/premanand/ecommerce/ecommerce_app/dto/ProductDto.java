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
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String image;

    private Long categoryId;
}
