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

import com.premanand.ecommerce.ecommerce_app.dto.CategoryDto;
import com.premanand.ecommerce.ecommerce_app.dto.ProductDto;
import com.premanand.ecommerce.ecommerce_app.entity.Category;
import com.premanand.ecommerce.ecommerce_app.service.CategoryService;
import com.premanand.ecommerce.ecommerce_app.service.ProductService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/category")
@CrossOrigin()
@AllArgsConstructor
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private ProductService productService;

    //Build REST api to Add new category
    @PostMapping()
    public ResponseEntity<CategoryDto> addCategory(@RequestBody CategoryDto categoryDto) {
     
        CategoryDto addedCategory = categoryService.addCategory(categoryDto);

       

        return new ResponseEntity<>(addedCategory, HttpStatus.CREATED);
    }

    //Build REST api to GET category by id
    @GetMapping("{categoryId}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable("categoryId") Long categoryId) {
        CategoryDto category = categoryService.getCategory(categoryId);

        return ResponseEntity.ok(category);

    }


    //Build REST api to get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> categories = categoryService.getAllCategories();

        return  ResponseEntity.ok(categories);
    }



      //Build REST api to update category
    @PutMapping()
    public ResponseEntity<CategoryDto> updateProduct(@RequestBody CategoryDto categoryDto) {
        CategoryDto updatedCategory = categoryService.updateCategory(categoryDto);
        return ResponseEntity.ok(updatedCategory);
    }

    //Build REST api to delete the Category by id
    @DeleteMapping("{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") Long categoryId) {

        //Check for category existance
        CategoryDto category;
        try {
            category = categoryService.getCategory(categoryId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Category not found!");
        }

        if (category == null) {
            return ResponseEntity.badRequest().body("Category not found!");
        }

        //Delete the category only if it has no products
        List<ProductDto> categoryProducts = productService.getProductsByCategory(categoryId);

        //If products exist with the category
        if (!categoryProducts.isEmpty()) {
            return ResponseEntity.badRequest().body("Products exist with this category");
        }

        return ResponseEntity.ok("category deleted" + category.getTitle());

    }
}
