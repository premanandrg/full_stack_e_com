import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import './MainPage.css'; // Add your styles here

const MainPage = () => {
  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}
      <CategoryList />
      <header className="hero-section">
        <h1>Welcome to MyApp!</h1>
        <p>Discover amazing products and deals.</p>
        <Link to="/shop" className="shop-now-btn">Shop Now</Link>
      </header>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {/* Example of featured products */}
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 1" />
            <h3>Product 1</h3>
            <p className="price">$99.99</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 2" />
            <h3>Product 2</h3>
            <p className="price">$79.99</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>

          {/* Add more products as needed */}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
