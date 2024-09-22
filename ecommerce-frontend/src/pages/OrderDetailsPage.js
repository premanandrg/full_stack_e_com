import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { getOrderById, getProductById } from '../services/api';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await getOrderById(orderId);
        setOrderDetails(orderResponse.data);

        const productRequests = orderResponse.data.items.map(item => getProductById(item.productId));
        const productResponses = await Promise.all(productRequests);
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
      <Header />
      <PageTitle title="Order Details" />
      <div className="order-summary">
        <h2>Order #{orderDetails.id}</h2>
        <p className="total-price">Total Price: ₹{orderDetails.totalPrice}</p>
      </div>
      <ul className="order-items">
        {orderDetails.items.map((item) => {
          const product = products.find(p => p.id === item.productId);
          return (
            <li key={item.productId} className="order-item">
              {product ? (
                <>
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  <div className="order-item-details">
                    <h4 className="product-name">{product.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p className="product-price">Price: ₹{product.price}</p>
                  </div>
                </>
              ) : (
                <p>Product not found for ID: {item.productId}</p>
              )}
            </li>
          );
        })}
      </ul>
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
