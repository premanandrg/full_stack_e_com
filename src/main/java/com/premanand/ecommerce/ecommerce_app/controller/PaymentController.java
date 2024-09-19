package com.premanand.ecommerce.ecommerce_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.premanand.ecommerce.ecommerce_app.dto.PaymentRequestDto;
import com.premanand.ecommerce.ecommerce_app.dto.PaymentVerificationRequestDto;
import com.premanand.ecommerce.ecommerce_app.service.PaymentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/payment")
@CrossOrigin()
@AllArgsConstructor
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Endpoint to create an order with Razorpay
    @PostMapping("/order")
    public ResponseEntity<String> createOrder(@RequestBody PaymentRequestDto paymentRequest) {
        try {
            // Create order using paymentService
            String orderId = paymentService.createOrder(paymentRequest.getAmount());
            return ResponseEntity.ok(orderId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order: " + e.getMessage());
        }
    }

    // Endpoint to verify payment
    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody PaymentVerificationRequestDto request) {
        try {
            // Verify payment using paymentService
            paymentService.verifyPayment(request);
            return ResponseEntity.ok("Payment verified successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment verification failed: " + e.getMessage());
        }
    }
}
