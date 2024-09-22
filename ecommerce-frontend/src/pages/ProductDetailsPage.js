import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductToCart, getProductById } from '../services/api';
import './ProductDetails.css'; // Import the custom CSS

import Footer from '../components/Footer';
import Header from '../components/Header';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.id : null; // Get userId from local storage

    if (!userId) {
      navigate('/login'); // Redirect to login if userId is null
      return;
    }

    try {
      await addProductToCart(userId, product.id, 1);
      setCartMessage('Product added to cart!');
    } catch (error) {
      setCartMessage('Failed to add product to cart.');
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.id : null; // Get userId from local storage

    if (!userId) {
      navigate('/login'); // Redirect to login if userId is null
      return;
    }

    // Prepare order data
    const orderData = {
      userId,
      totalPrice: product.price,
      items: [{
        productId: product.id,
        quantity: 1,
        price: product.price,
      }],
    };

    // Navigate to the checkout page with order data
    navigate('/selectAddress', { state: { orderData } });
  };

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <Header />
      <div className="product-details-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>

          <div className="product-price-section">
            <p className="product-price">₹{product.price}</p>
            <p className="old-price">₹{product.price + 100}</p>
            <p className="discount">(₹100 OFF)</p>
          </div>

          <div className="delivery-options">
            <p>Delivery by <strong>Tomorrow</strong></p>
            <p>Free delivery for orders above ₹500</p>
          </div>

          <div className="button-group">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {cartMessage && <p className="cart-message">{cartMessage}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
