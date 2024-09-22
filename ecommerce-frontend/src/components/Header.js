import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Importing the cart icon
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import { Link, useNavigate } from 'react-router-dom';
import { getCartByUserId } from '../services/api'; // Import the API service
import './Header.css';

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get user info from local storage
  const userId = currentUser ? currentUser.id : null; // Get userId from local storage
  const userRole = currentUser ? currentUser.role : null; // Get user role from local storage

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (!userId) return; // If not logged in, skip fetching

      try {
        const cartResponse = await getCartByUserId(userId);
        const cartData = cartResponse.data;

        // Count the total number of items in the cart
        const totalCount = cartData.items.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(totalCount);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartItemCount();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Clear user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">GoCart</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for products, brands and more" />
      </div>
      <div className="nav-links">
        {currentUser ? (
          <>
            {userRole === 'seller' ? (
              <Link to="/sellerPanel" className="profile-link">
                <FaUserCircle className="profile-icon" /> Seller Panel</Link>
            ) : (
              <Link to="/profile" className="profile-link">
                <FaUserCircle className="profile-icon" /> Profile</Link>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/cart" className="cart-link">
          <div className="cart-icon-container">
            <AiOutlineShoppingCart className="cart-icon" />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </div>
          <span className="cart-text">Cart</span>
        </Link>
        {userRole === 'admin' && <Link to="/admin">Admin</Link>} {/* Only show Admin link if user is an admin */}
      </div>
    </header>
  );
};

export default Header;
