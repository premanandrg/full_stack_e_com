import React, { useEffect, useState } from 'react';
import Footer from '../components/AdminFooter';
import Header from '../components/AdminHeader';
import PageTitle from '../components/PageTitle';
import '../pages/AdminOrdersPage.css';
import { deleteOrder, getAllOrders, getProductById } from '../services/api';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(); // Fetch all orders
        const fetchedOrders = response.data;

        const ordersWithProductDetails = await Promise.all(
          fetchedOrders.map(async (order) => {
            const productDetails = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const productResponse = await getProductById(item.productId);
                  return productResponse.data;
                } catch (error) {
                  console.error(`Error fetching product ${item.productId}:`, error);
                  return {
                    id: item.productId,
                    name: 'Product not found',
                    image: 'path/to/default-image.jpg', // Path to your default image
                  };
                }
              })
            );

            return {
              ...order,
              products: productDetails,
            };
          })
        );

        setOrders(ordersWithProductDetails);
      } catch (error) {
        console.error('Error fetching orders or product details:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId)); // Update state to remove the deleted order
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
        <PageTitle title="All Orders" />

        {orders.length === 0 ? (
          <p className="no-orders-message">No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Order #{order.id}</h3>
                <p className="order-price">Total Price: ₹{order.totalPrice}</p>
                <div className="product-details">
                  {order.products.map((product) => (
                    <div key={product.id} className="product-info">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        style={{ width: '75px', height: '75px', marginRight: '15px' }}
                      />
                      <div className="order-item-details">
                        <h4>{product.name}</h4>
                        <p>Quantity: {order.items.find(item => item.productId === product.id).quantity}</p>
                        <p>Price: ₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
