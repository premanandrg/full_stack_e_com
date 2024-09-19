package com.premanand.ecommerce.ecommerce_app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.entity.Order;
import com.premanand.ecommerce.ecommerce_app.entity.OrderItem;
import com.premanand.ecommerce.ecommerce_app.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Fetch orders by user ID
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // Fetch a specific order by ID
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Create a new order
    public Order createOrder(Order order) {
        // Generate a unique order ID using the current timestamp
        order.setId(System.currentTimeMillis()); // Set order ID using current time in milliseconds

        // Ensure all OrderItems are linked to the Order
        for (OrderItem item : order.getItems()) {
            item.setOrderId(order.getId()); // Set the order reference in each OrderItem
        }

        // Save the order (which also saves the items because of cascade)
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId); // Delete the order from the repository
    }

    public void updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);  // Assuming you have a `setStatus` method in the `Order` entity
        orderRepository.save(order);  // Save the updated order back to the repository

    }
}
