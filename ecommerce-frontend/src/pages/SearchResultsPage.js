import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState'; // Import the EmptyState component
import PageTitle from '../components/PageTitle'; // Import the PageTitle component
import { searchProducts } from '../services/api'; // API method to fetch products

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('query');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await searchProducts(query); // Fetch products based on query
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="product-listing container mt-20">
      <div>
        <PageTitle title={`Search results for "${query}"`} /> {/* Corrected template literal */}
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
                ₹{product.price} <span className="old-price">₹{(product.price + 29).toFixed(2)}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
