import React, { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState'; // Import the EmptyState component
import { getProducts, getProductsByCategoryId } from '../services/api';

const ProductsList = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = categoryId ? await getProductsByCategoryId(categoryId) : await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <section className="product-listing container mt-20">
      {products.length === 0 ? (
        <EmptyState />
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p className="price">₹{product.price} <span className="old-price">₹1999</span></p>
          </div>
        ))
      )}
    </section>
  );
};

export default ProductsList;
