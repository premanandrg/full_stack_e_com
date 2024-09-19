import axios from 'axios';

const PaymentButton = ({ amount }) => {
  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/payment/order', { amount });
      const { orderId } = response.data;

      const options = {
        key: 'rzp_live_S3cVVxoZ4jU4ju', // replace with your Razorpay key
        amount: amount * 100, // amount in paise
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        image: 'https://your-logo-url.com/logo.png',
        order_id: orderId, // Order ID from backend
        handler: async (response) => {
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          await axios.post('http://localhost:8080/payment/verify', paymentData);
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error: ', error);
    }
  };

  return <button onClick={handlePayment}>Pay with Razorpay</button>;
};

export default PaymentButton;
