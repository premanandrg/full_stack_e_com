import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsList from '../components/ProductList';
import { getCategoryById } from '../services/api';
import '../styles.css';

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
      <header className="header">
        <div className="logo">GoCart</div>
        <div className="search-bar">
          <input type="text" placeholder="Search for products, brands, and more" />
        </div>
        <div className="nav-links">
          <a href="/login">Login</a>
          <a href="/cart">Cart</a>
          <a href="/admin">Admin</a>
        </div>
      </header>

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

      <footer className="footer">
        <p>© 2024 GoCart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductsPage;
