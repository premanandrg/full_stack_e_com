package com.premanand.ecommerce.ecommerce_app.mapper;

import com.premanand.ecommerce.ecommerce_app.dto.ProductDto;
import com.premanand.ecommerce.ecommerce_app.entity.Product;

public class ProductMapper {

    public static ProductDto mapToProductDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImage(), 
                product.getCategoryId()
        );
    }

    public static Product mapToProduct(ProductDto productDto) {
        return new Product(
                productDto.getId(),
                productDto.getName(),
                productDto.getDescription(),
                productDto.getPrice(),
                productDto.getImage(), 
                productDto.getCategoryId()
        );
    }
}
