package com.premanand.ecommerce.ecommerce_app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premanand.ecommerce.ecommerce_app.dto.ProductDto;
import com.premanand.ecommerce.ecommerce_app.service.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/products")
@CrossOrigin()
@AllArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;

    //Build add product 
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        ProductDto savedProduct = productService.saveProduct(productDto);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);

    }

    //Build : Get product by product id
    @GetMapping("{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Long productId) {
        ProductDto productDto = productService.getProductById(productId);
        return ResponseEntity.ok(productDto);
    }

    //Build REST api to get all products
    @GetMapping()
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> productDtos = productService.getAllProduct();

        return ResponseEntity.ok(productDtos);

    }

    //Build REST api to get all products
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDto>> getProductsByCategoryId(@PathVariable("categoryId") Long categoryId) {
        List<ProductDto> productDtos = productService.getProductsByCategory(categoryId);

        return ResponseEntity.ok(productDtos);

    }

    //Build REST api to update product
    @PutMapping()
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProduct(productDto);
        return ResponseEntity.ok(updatedProduct);
    }

    //Build REST api to delete the product by product id 
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) {

        ProductDto product;
        try {
            product = productService.getProductById(productId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Product not found!");
        }

        if (product == null) {
            return ResponseEntity.badRequest().body("Product not found!");
        }
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted: " + product.getName());
    }
}
