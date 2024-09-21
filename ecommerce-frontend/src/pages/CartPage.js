import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductToCart, getCartByUserId, getProductById, removeProductFromCart } from '../services/api';
import './CartPage.css'; // Import the custom CSS

import Footer from '../components/Footer';
import Header from '../components/Header';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser ? currentUser.id : null; // Get userId from local storage

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        return; // If not logged in, skip fetching cart
      }
      
      try {
        const cartResponse = await getCartByUserId(userId);
        const cartData = cartResponse.data;

        // Fetch product details for each item in the cart
        const productRequests = cartData.items.map(item => getProductById(item.productId));
        const productResponses = await Promise.all(productRequests);

        // Combine cart items with product details
        const combinedItems = cartData.items.map((cartItem, index) => ({
          ...cartItem,
          product: productResponses[index].data,
        }));

        setCartItems(combinedItems);
        calculateTotalPrice(combinedItems);
      } catch (error) {
        console.error('Error fetching cart or product details:', error);
      }
    };

    fetchCart();
  }, [userId]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleRemove = async (productId) => {
    try {
      await removeProductFromCart(userId, productId);
      const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent setting quantity to less than 1
    try {
      await addProductToCart(userId, productId, newQuantity);
      const updatedCartItems = cartItems.map(item => 
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = () => {
    // Pass the cart data and totalPrice to the address selection page
    const orderData = {
      userId,
      totalPrice,
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };
    navigate('/selectAddress', { state: { orderData } });
  };

  if (!currentUser) {
    return (
      <div className="cart-page">
        <Header />
        <h2 className="cart-title">Shopping Cart</h2>
        <p>Please <a href="/login">log in</a> to use the cart.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <h2 className="cart-title">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <a href="/">Start shopping</a></p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.product.name}</h3>
                  <p className="cart-item-price">₹{item.product.price}</p>

                  <div className="quantity-selector">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                    />
                  </div>

                  <button className="remove-button" onClick={() => handleRemove(item.product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Price Details</h3>
            <div className="price-details">
              <p>Total Price: ₹{totalPrice}</p>
              <p>Discount: ₹100</p> {/* Example discount */}
              <p>Delivery Charges: ₹50</p>
              <h4>Total Amount: ₹{totalPrice - 100 + 50}</h4>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CartPage;
