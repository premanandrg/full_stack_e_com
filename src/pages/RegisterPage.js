import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../services/api';
import { saveUser } from './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Prepare user data as a JSON object
    const userData = {
      name,
      email,
      password
    };
  
    try {
      // Send data as JSON
     await saveUser(userData);
  
      
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };
  
  return (
    <div className="register-container">
      <div className="brand-name">
        <h1>GoCart</h1>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
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

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
