package com.premanand.ecommerce.ecommerce_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.stereotype.Repository;

import com.premanand.ecommerce.ecommerce_app.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
        List<Product> getProductsByCategoryId(Long categoryId);
        List<Product> findByNameContainingIgnoreCase(String name);

}
