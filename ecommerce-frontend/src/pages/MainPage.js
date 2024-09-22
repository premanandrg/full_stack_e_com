import React from 'react';
import CategoryList from '../components/CategoryList';
import ProductsList from '../components/ProductList';
import TopDeals from '../components/TopDeals';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import './MainPage.css'; // Add your styles here

const MainPage = () => {
  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}
     
    
      <CategoryList />
      <header className="hero-section">
        <h1>Welcome to GoCart!</h1>
        <p>Discover amazing products and deals.</p>
      </header> 
      <ProductsList />
     
        <TopDeals/>


        <Footer/>
 
    </div>
  );
};

export default MainPage;
