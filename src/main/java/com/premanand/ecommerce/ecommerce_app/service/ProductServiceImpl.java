package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.ProductDto;
import com.premanand.ecommerce.ecommerce_app.entity.Product;
import com.premanand.ecommerce.ecommerce_app.exception.ResourceNotFundException;
import com.premanand.ecommerce.ecommerce_app.mapper.ProductMapper;
import com.premanand.ecommerce.ecommerce_app.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductDto saveProduct(ProductDto productDto) {

        Product product = ProductMapper.mapToProduct(productDto);

        Product savedProduct = productRepository.save(product);

        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Override
    public List<ProductDto> getAllProduct() {
        List<Product> products = productRepository.findAll();

        return products.stream().map((product) -> ProductMapper.mapToProductDto(product)).collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFundException("Product not exist with given id " + productId));

        return ProductMapper.mapToProductDto(product);

    }

    @Override
    public ProductDto updateProduct(ProductDto productDto) {
        Product product = ProductMapper.mapToProduct(productDto);
        Product updatedProduct = productRepository.save(product);

        return ProductMapper.mapToProductDto(updatedProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);

    }

    @Override
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        List<Product> categoryProducts = productRepository.getProductsByCategoryId(categoryId);

        return categoryProducts.stream().map((product) -> ProductMapper.mapToProductDto(product)).collect(Collectors.toList());

    }

}
