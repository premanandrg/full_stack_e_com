import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsList from '../components/ProductList';
import { getCategoryById } from '../services/api';
import '../styles.css';
import './ProductsPage.js';

import Footer from '../components/Footer';
import Header from '../components/Header';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId) {
        try {
          const response = await getCategoryById(categoryId);
          setCategory(response.data);
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div className="products-page">
      <Header/>

      <section className="products-section container mt-20">
        {category ? (
          <div className="category-header">
            <img src={category.imageUrl} alt={category.title} className="category-heading-image" />
            <div className="category-title">
              <h1>{category.title}</h1>
            </div>
          </div>
        ) : (
          <div className="all-products-header">
            <h1>All Products</h1>
            <p>Explore a wide range of products across various categories.</p>
          </div>
        )}
        <ProductsList categoryId={categoryId} />
      </section>

       <Footer/>
    </div>
  );
};

export default ProductsPage;
