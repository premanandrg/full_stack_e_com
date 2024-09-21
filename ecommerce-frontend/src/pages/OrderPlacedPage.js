import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import an icon from react-icons
import { useLocation } from 'react-router-dom';
import './OrderPlacedPage.css'; // Import your CSS for styling

const OrderPlacedPage = () => {
  const location = useLocation();
  const { orderId } = location.state;

  return (
    <div className="order-placed-page">
      <div className="icon-container">
        <FaCheckCircle className="success-icon" />
      </div>
      <h2 className="success-message">Order Placed Successfully!</h2>
      <p className="order-id">Your order ID is: <strong>{orderId}</strong></p>
      <a href="/orders" className="view-orders-link">View Orders</a>
    </div>
  );
};

export default OrderPlacedPage;
