// src/main/java/com/example/demo/service/ProductService.java
package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.ProductDto;

@Service
public interface ProductService {

    public ProductDto saveProduct(ProductDto productDto);

    public List<ProductDto> getAllProduct();

    public ProductDto getProductById(Long productId);

    public ProductDto updateProduct(ProductDto productDto);

    public void deleteProduct(Long productId);

    public List<ProductDto> getProductsByCategory(Long categoryId);

}
