import React from 'react';
import { Link } from 'react-router-dom';
import '../components/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="app-title">MyApp</Link>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>

      <div className="navbar-right">
        <Link to="/profile" className="navbar-link">Profile</Link>
        <Link to="/cart" className="navbar-link">Cart</Link>
        <button className="logout-btn" onClick={() => console.log("Logged out")}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
