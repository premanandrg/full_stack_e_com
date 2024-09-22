import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getCartByUserId, searchProducts } from '../services/api'; // Import the searchProducts API method
import './NavBar.css';

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser ? currentUser.id : null;
  const userRole = currentUser ? currentUser.role : null;

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (!userId) return;

      try {
        const cartResponse = await getCartByUserId(userId);
        const cartData = cartResponse.data;
        const totalCount = cartData.items.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(totalCount);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartItemCount();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`); // Navigate to search results page
      setSearchQuery(''); // Clear the search input after navigating
    }
  };

  const handleSearchInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await searchProducts(query); // Fetch search results
        setSearchResults(response.data); // Update search results
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]); // Clear results if the input is empty
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery(''); // Clear search query
    setSearchResults([]); // Clear results after navigating
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="app-title">GoCart</Link>
      </div>

      <div className="navbar-center">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for products, brands, and more"
            aria-label="Search products"
            value={searchQuery}
            onChange={handleSearchInputChange} // Updated event handler
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleProductClick(product.id)} // Handle product click
                >
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
  
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="navbar-right">
        {currentUser ? (
          <>
            {userRole === 'seller' ? (
              <Link to="/sellerPanel" className="profile-link">
                <FaUserCircle className="profile-icon" />
                <span className="profile-text">Seller Panel</span>
              </Link>
            ) : (
              <Link to="/profile" className="profile-link">
                <FaUserCircle className="profile-icon" />
                <span className="profile-text">Profile</span>
              </Link>
            )}
            <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-logout-btn">Login</Link>
        )}
        <Link to="/cart" className="cart-link">
          <div className="cart-icon-container">
            <AiOutlineShoppingCart className="cart-icon" />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </div>
          <span className="cart-text">Cart</span>
        </Link>
        {userRole === 'admin' && <Link to="/admin" className="admin-link">Admin</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
