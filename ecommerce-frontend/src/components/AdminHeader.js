import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/api';
import './AdminHeader.css';

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser ? currentUser.id : null;
  const userRole = currentUser ? currentUser.role : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleSearchInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await searchProducts(query);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <header className={`admin-header ${userRole === 'seller' ? 'blue-header' : 'red-header'}`}>
      <div className="navbar-left">
        <Link to={userRole === 'seller' ? "/sellerPanel" : "/admin"} className="app-title">
          GoCart {userRole === 'seller' ? 'Seller' : 'Admin'}
        </Link>
      </div>

      <div className="navbar-center">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for products, brands, and more"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => handleProductClick(product.id)}
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
            {userId && (
              <div>
                <button onClick={handleHome} className="nav-logout-btn">Home</button>
                <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
              </div>
            )}
          </>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
