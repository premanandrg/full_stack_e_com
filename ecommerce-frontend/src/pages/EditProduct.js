import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import { getAllCategories, getProductById, updateProduct } from '../services/api';
import './AddProduct.css'; // Reuse styles

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProductDetails();
    fetchCategories();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setProduct({ ...product, categoryId: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product);
      alert('Product updated successfully!');
      navigate('/admin/products'); // Redirect to products page or another route
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="add-product-container">
        <h2 className="add-product-title">Edit Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            required
          />

          <select name="categoryId" value={product.categoryId} onChange={handleCategoryChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.title}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-button">Update Product</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
