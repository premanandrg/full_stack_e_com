package com.premanand.ecommerce.ecommerce_app.mapper;

import com.premanand.ecommerce.ecommerce_app.dto.CategoryDto;
import com.premanand.ecommerce.ecommerce_app.entity.Category;

public class CategoryMapper {

    public static CategoryDto mapToCategoryDto(Category category) {
        return new CategoryDto(
                category.getCategoryId(),
                category.getTitle(),
                category.getImageUrl()
        );
    }

    public static Category mapToCategory(CategoryDto categoryDto) {
        return new Category(
                categoryDto.getCategoryId(),
                categoryDto.getTitle(),
                categoryDto.getImageUrl()
        );
    }
}
