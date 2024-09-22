import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import { addCategory, addProduct, getAllCategories } from '../services/api';
import './AddProduct.css'; // Import your custom styles

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    title: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setProduct({ ...product, categoryId: e.target.value });
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(product);
      alert('Product added successfully!');
      setProduct({
        name: '',
        description: '',
        price: '',
        image: '',
        categoryId: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.title) return;
    try {
      await addCategory(newCategory);
      alert('Category added successfully!');
      setNewCategory({ title: '', imageUrl: '' });
      // Refresh categories
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="add-product-container">
        <h2 className="add-product-title">Add New Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleProductChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleProductChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleProductChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleProductChange}
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

          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              name="title"
              placeholder="New Category Title"
              value={newCategory.title}
              onChange={handleNewCategoryChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="New Category Image URL (optional)"
              value={newCategory.imageUrl}
              onChange={handleNewCategoryChange}
            />
            <button type="submit">Add Category</button>
          </form>

          <button type="submit" className="submit-button">Add Product</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
