import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getOrderById, getProductById } from '../services/api'; // Ensure getProductById is imported
import './OrderDetailsPage.css'; // Import the custom CSS for styling


const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]); // State to hold product details

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await getOrderById(orderId);
        setOrderDetails(orderResponse.data);

        // Fetch product details for each item in the order
        const productRequests = orderResponse.data.items.map(item => getProductById(item.productId));
        const productResponses = await Promise.all(productRequests);

        // Set products state with fetched product details
        setProducts(productResponses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="order-details-page">
      <Header/>
      <h2>Order #{orderDetails.id} Details</h2>
      <p>Total Price: ₹{orderDetails.totalPrice}</p>
      <ul className="order-items">
        {orderDetails.items.map((item) => {
          const product = products.find(p => p.id === item.productId);
          return (
            <li key={item.productId} className="order-item">
              {product ? (
                <>
                  <h4>{product.name}</h4>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{product.price}</p>
                </>
              ) : (
                <p>Product not found for ID: {item.productId}</p>
              )}
            </li>
          );
        })}
      </ul>
      <Footer/>
    </div>
  );
};

export default OrderDetailsPage;
