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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.premanand.ecommerce.ecommerce_app.entity.Cart;
import com.premanand.ecommerce.ecommerce_app.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/carts")
@CrossOrigin()
@AllArgsConstructor

public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<Cart> addProductToCart(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam int quantity) {
        Cart cart = cartService.addItemToCart(userId, productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<Cart> removeProductFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            cartService.removeItemFromCart(userId, productId);
            Cart cart = cartService.getCartByUserId(userId);

            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            // If there was an issue removing the item, return a 404 Not Found or 400 Bad Request
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // or use BAD_REQUEST if appropriate
        }
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();

        return ResponseEntity.ok(carts);
    }
}
