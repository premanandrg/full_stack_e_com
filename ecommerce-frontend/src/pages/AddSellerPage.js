import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../services/api'; // Import the correct API service
import './AddSellerPage.css'; // Adjust path as needed

const AddSellerPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Prepare seller data as a JSON object including role
    const sellerData = {
      name,
      email,
      password,
      role: 'seller' // Set role to 'seller'
    };

    try {
      // Send data as JSON to the API endpoint for creating a seller
      await saveUser(sellerData);
      navigate('/admin/sellers'); // Redirect to the sellers page
    } catch (err) {
      setError('Failed to add seller. Please try again.');
    }
  };

  return (
    <div className="add-seller-container">
      <div className="brand-name">
        <h1>GoCart Admin</h1>
      </div>
      <form onSubmit={handleSubmit} className="add-seller-form">
        <h2>Add New Seller</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="add-seller-button">Add Seller</button>
      </form>
    </div>
  );
};

export default AddSellerPage;
