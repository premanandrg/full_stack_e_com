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
public class CategoryDto {

    private Long categoryId;
    private String title;
    private String imageUrl;

}
