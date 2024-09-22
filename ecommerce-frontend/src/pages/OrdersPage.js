import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { getOrdersByUserId, getProductById } from '../services/api';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
   
  // Get the user ID from local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser ? currentUser.id : null; // Get actual user ID

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.error('User ID is not available. Redirecting to login.');
        navigate('/login'); // Redirect to login if user ID is not found
        return;
      }

      try {
        const response = await getOrdersByUserId(userId);
        console.log('Fetched Orders:', response.data); // Debugging log

        const fetchedOrders = response.data;

        if (!Array.isArray(fetchedOrders)) {
          console.error('Fetched orders is not an array:', fetchedOrders);
          return;
        }

        const ordersWithProductDetails = await Promise.all(
          fetchedOrders.map(async (order) => {
            const productDetails = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const productResponse = await getProductById(item.productId);
                  console.log('Fetched Product:', productResponse.data); // Debugging log
                  return productResponse.data;
                } catch (error) {
                  console.error(`Error fetching product ${item.productId}:`, error);
                  // Return a default product representation
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
  }, [userId, navigate]);

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`); // Navigate to OrderDetailsPage
  };

  return (
    <> {/* Removed unnecessary div */}
      <Header />
      <div className="orders-page">
      <PageTitle title="My Orders"/>

        {orders.length === 0 ? (
          <p className="no-orders-message">You have no orders yet.</p>
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
                <button className="view-details-button" onClick={() => handleViewDetails(order.id)}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;