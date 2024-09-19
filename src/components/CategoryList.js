import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


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

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  return (
    <section className="category-section container mt-20">
      {categories.map((category) => (
        <div
          key={category.categoryId}
          className="category-item"
          onClick={() => handleCategoryClick(category.categoryId)}
        >
          <img src={category.imageUrl} alt={category.title} />
          <p>{category.title}</p>
        </div>
      ))}
    </section>
  );
};

export default CategoryList;
