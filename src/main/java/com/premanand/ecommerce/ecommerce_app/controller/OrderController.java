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

import com.premanand.ecommerce.ecommerce_app.entity.Order;
import com.premanand.ecommerce.ecommerce_app.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/orders")
@CrossOrigin()
@AllArgsConstructor
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Get all orders for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    // Get order details by order ID
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    // Create a new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.ok(createdOrder);
    }

    // Get all orders for admin
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders(); // Make sure to implement this method in OrderService
        return ResponseEntity.ok(orders);
    }

    // Delete an order by order ID
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId); // Make sure to implement this method in OrderService
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestBody String status) {
        try {
            // Logic to update the order status
            orderService.updateOrderStatus(orderId, status);

            // Return a success message
            return ResponseEntity.ok("Order status updated to: " + status);

        } catch (RuntimeException e) {
            // Handle the case when the order is not found or other exceptions occur
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found or could not update status.");
        }
    }

}
