import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import '../pages/AdminOrdersPage.js'; // Import your custom CSS
import { deleteOrder, getAllOrders } from '../services/api'; // Adjust the import based on your service functions

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(); // Fetch all orders
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId); // Call your delete order function
      setOrders(orders.filter(order => order.id !== orderId)); // Update the state to remove the deleted order
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-orders-page">
        <h2>Admin Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Order #{order.id}</h3>
                <p>Total Price: ₹{order.totalPrice}</p>
                <button className="delete-button" onClick={() => handleDeleteOrder(order.id)}>
                  Delete Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminOrdersPage;
