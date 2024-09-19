import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState'; // Import the EmptyState component
import { getProducts, getProductsByCategoryId } from '../services/api';



const ProductsList = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


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


  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="product-listing container mt-20">
      {products.length === 0 ? (
        <EmptyState />
      ) : (
        products.map((product) => (
          <div
          key={product.id}
          className="product-item"
          onClick={() => handleProductClick(product.id)} // Add onClick event
        >
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p className="price">
            ₹{product.price} <span className="old-price">₹{product.price + 29}</span>
          </p>
        </div>
        ))
      )}
    </section>
  );
};

export default ProductsList;
