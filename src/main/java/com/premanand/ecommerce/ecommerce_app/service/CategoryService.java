package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.CategoryDto;
import com.premanand.ecommerce.ecommerce_app.entity.Category;

@Service
public interface CategoryService {

    public CategoryDto addCategory(CategoryDto category);

    public CategoryDto getCategory(Long categoryId);

    public CategoryDto updateCategory(CategoryDto category);

    public void deleteCategory(Long categoryId);

    public List<Category> getAllCategories();

}
