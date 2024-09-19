package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.entity.Cart;
import com.premanand.ecommerce.ecommerce_app.entity.CartItem;
import com.premanand.ecommerce.ecommerce_app.repository.CartItemRepository;
import com.premanand.ecommerce.ecommerce_app.repository.CartRepository;
import com.premanand.ecommerce.ecommerce_app.repository.ProductRepository;
import com.premanand.ecommerce.ecommerce_app.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // Get Cart by User ID
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public Cart addItemToCart(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            cart = new Cart();
            cart.setUserId(userId);
            cart = cartRepository.save(cart);
        }

        // Check if the item already exists in the cart
        CartItem existingCartItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingCartItem != null) {
            // Update the quantity of the existing item
            existingCartItem.setQuantity(quantity);
            cartItemRepository.save(existingCartItem);
        } else {
            // Add a new item to the cart
            CartItem newCartItem = new CartItem();
            newCartItem.setCartId(cart.getId());
            newCartItem.setProductId(productId);
            newCartItem.setQuantity(quantity);
            cartItemRepository.save(newCartItem);
            cart.getItems().add(newCartItem);
        }

        return cartRepository.save(cart);
    }

    public void removeItemFromCart(Long userId, Long productId) {
        // Fetch the cart by user ID
        Cart cart = cartRepository.findByUserId(userId);

        if (cart != null) {
            // Find the CartItem in the cart's list of items by productId
            CartItem cartItemToRemove = cart.getItems().stream()
                    .filter(item -> item.getProductId().equals(productId))
                    .findFirst()
                    .orElse(null);

            // Debugging: print the CartItem details
            System.out.println("CartItem to remove: " + cartItemToRemove);

            if (cartItemToRemove != null) {
                // Remove the CartItem from the database
                cartItemRepository.deleteById(cartItemToRemove.getId());
                System.out.println("Deleted CartItem ID: " + cartItemToRemove.getId());

                // Remove the CartItem from the cart's list of items
                cart.getItems().remove(cartItemToRemove);

                // Save the updated cart without the removed item
                cartRepository.save(cart);

                System.out.println("Item removed from cart and cart updated.");
            } else {
                System.out.println("CartItem not found for productId: " + productId);
            }
        } else {
            System.out.println("Cart not found for userId: " + userId);
        }
    }

    // Clear Cart
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            cart.getItems().clear();
            cartRepository.save(cart);
        }
    }

    // Get All Cart Items by user id
    public List<CartItem> getAllItems(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        return cart != null ? cart.getItems() : List.of();
    }

    // Get All Cart Items
    public List<Cart> getAllCarts() {
        List<Cart> cartList = cartRepository.findAll();
        return cartList;
    }
}
