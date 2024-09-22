import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductToCart, getCartByUserId, getProductById, removeProductFromCart } from '../services/api';
import './CartPage.css'; // Import the custom CSS

import { AiOutlineShoppingCart } from 'react-icons/ai'; // Importing an icon
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import PageTitle from '../components/PageTitle';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser ? currentUser.id : null;

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const cartResponse = await getCartByUserId(userId);
        const cartData = cartResponse.data;

        const productRequests = cartData.items.map(item => getProductById(item.productId));
        const productResponses = await Promise.all(productRequests);

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
    if (newQuantity < 1) return;
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
    <div>
      <Header />
      <div className="cart-page">
        <PageTitle title="Shopping Cart" />
        
        {cartItems.length === 0 ? (
           <div className="empty-cart">
           <AiOutlineShoppingCart size={100} className="empty-cart-icon" />
           <p>Your cart is empty. <a href="/">Start shopping</a></p>
         </div>
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
                        className="quantity-input"
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
    <div className="price-item">
      <span>Subtotal ({cartItems.length} items):</span>
      <span>₹{totalPrice}</span>
    </div>
    <div className="price-item">
      <span>Shipping:</span>
      <span>Free</span>
    </div>
    <div className="price-item total">
      <span>Total Price:</span>
      <span>₹{totalPrice}</span>
    </div>
  </div>
  <button className="checkout-button" onClick={handleCheckout}>
    Proceed to Checkout
  </button>
</div>

          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
