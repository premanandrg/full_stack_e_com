import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api'; // Import the necessary API endpoint

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderData, addressId } = location.state || {}; // Extract orderData and addressId from state
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const totalPrice = orderData?.totalPrice || 500; // Default to 500 if totalPrice is unavailable
    const orderId = `ORDER-${new Date().getTime()}`; // Generate a unique order ID

    const handlePaymentSuccess = useCallback(async (paymentData) => {
        try {
            // Call createOrder API after successful payment verification
            await createOrder({
                ...orderData,
                addressId, // Include the selected addressId in the order
            });

            // Navigate to the OrderPlaced page after successful order creation
            navigate('/order-placed', { state: { orderId } });

        } catch (error) {
            console.error('Error during payment verification or order creation:', error);
        }
    }, [orderData, addressId, navigate, orderId]); // Include orderId in the dependency array

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                const options = {
                    key: "rzp_test_HhGd0PIvUltUfj", // Razorpay key
                    amount: totalPrice * 100, // Convert to smallest currency unit (paise)
                    currency: 'INR',
                    name: "Your Store",
                    description: "Order Payment",
                    handler: async (response) => {
                        const paymentData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        };

                        // Handle successful payment
                        await handlePaymentSuccess(paymentData);
                    },
                    prefill: {
                        name: currentUser.name,
                        email: currentUser.email,
                        contact: currentUser.phone,
                    },
                    theme: {
                        color: "#F37254", // Customize Razorpay checkout theme color
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error("Error initiating payment:", error);
            }
        };

        initiatePayment();
    }, [totalPrice, currentUser, handlePaymentSuccess, addressId, orderData, orderId]); // Include orderId in the dependency array

    return (
        <div>
            <h2>Processing Payment...</h2>
        </div>
    );
};

export default PaymentPage;
