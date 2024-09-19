// src/pages/AddProduct.js
import axios from 'axios';
import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle image upload and get the image URL (this is a placeholder, implement your own image upload logic)
      const imageUrl = await uploadImage(image);

      // Add the image URL to the product object
      const productWithImage = { ...product, imageUrl };

      // Send the product data to the server
      await axios.post('/api/products/add', productWithImage);
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const uploadImage = async (file) => {
    // Implement your image upload logic here
    // For example, upload the image to a cloud storage and return the URL
    return 'https://example.com/image.jpg'; // Placeholder URL
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
