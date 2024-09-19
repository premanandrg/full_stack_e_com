package com.premanand.ecommerce.ecommerce_app.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.premanand.ecommerce.ecommerce_app.dto.PaymentVerificationRequestDto;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;

@Service
public class PaymentService {

    private RazorpayClient razorpayClient;

    public PaymentService() throws Exception {
        razorpayClient = new RazorpayClient("YOUR_RAZORPAY_KEY_ID", "YOUR_RAZORPAY_SECRET");
    }

    public String createOrder(int amount) throws Exception {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_rcptid_11");

        Order order = razorpayClient.Orders.create(orderRequest);
        return order.get("id");
    }

    public void verifyPayment(PaymentVerificationRequestDto request) throws Exception {
        try {
            // Fetch the payment details from Razorpay
            Payment payment = razorpayClient.Payments.fetch(request.getRazorpayPaymentId());

            // Check if the payment signature matches
            boolean isSignatureValid = payment.get("signature").equals(request.getRazorpaySignature());

            if (!isSignatureValid) {
                throw new Exception("Invalid signature");
            }

            // You might want to update the payment status in your database here
            // or perform additional checks based on your application's requirements
        } catch (Exception e) {
            throw new Exception("Error verifying payment", e);
        }
    }

}
