import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/admin/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h3>Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order ID: {order.id} - Total: ${order.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
