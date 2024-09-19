import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Use params to get customer ID from the URL
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getOrdersByUserId } from '../services/api'; // Import your API service for orders
import './CustomerOrders.css'; // Import custom styles

const CustomerOrders = () => {
  const { customerId } = useParams(); // Get customerId from the URL params
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await getOrdersByUserId(customerId); // Fetch orders by customer ID
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchCustomerOrders();
  }, [customerId]);

  if (loading) {
    return <div className="loading-spinner">Loading orders...</div>;
  }

  return (
    <div className="customer-orders-page">
      <Header />

      <div className="customer-orders-container">
        <h2>Orders for Customer ID: {customerId}</h2>

        {orders.length === 0 ? (
          <p>No orders found for this customer.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CustomerOrders;
