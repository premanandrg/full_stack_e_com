package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.CategoryDto;
import com.premanand.ecommerce.ecommerce_app.entity.Category;
import com.premanand.ecommerce.ecommerce_app.exception.ResourceNotFundException;
import com.premanand.ecommerce.ecommerce_app.mapper.CategoryMapper;
import com.premanand.ecommerce.ecommerce_app.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryDto addCategory(CategoryDto category) {
        Category addedCategory = categoryRepository.save(CategoryMapper.mapToCategory(category));

        return CategoryMapper.mapToCategoryDto(addedCategory);
    }

    @Override
    public CategoryDto getCategory(Long categoryId) {

        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFundException("Category not found! " + categoryId.toString()));

        return CategoryMapper.mapToCategoryDto(category);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto category) {
        Category updatedCategory = categoryRepository.save(CategoryMapper.mapToCategory(category));

        return CategoryMapper.mapToCategoryDto(updatedCategory);

    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);

    }

    @Override
    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories;
    }

}
