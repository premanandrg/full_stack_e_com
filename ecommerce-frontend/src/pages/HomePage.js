import React from 'react';
import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import ProductsList from '../components/ProductList';

import TopDeals from '../components/TopDeals';
import '../pages/HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <Navbar /> {/* Render the Header component */}

      <CategoryList />
      <ProductsList />

      <TopDeals />


      <Footer />
      
    </div>
  );
}

export default HomePage;
