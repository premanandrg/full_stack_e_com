import React from 'react';
import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import Header from '../components/Header';

import ProductsList from '../components/ProductList';

import TopDeals from '../components/TopDeals';

function HomePage() {
  return (
    <div className="homepage">
      <Header /> {/* Render the Header component */}
      <CategoryList />
      <ProductsList />
      <TopDeals />
      <Footer />
    </div>
  );
}

export default HomePage;
