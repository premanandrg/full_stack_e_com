import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../services/api'; // API call to save user
import './RegisterPage.css'; // Import the CSS file for styling

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userData = {
      name,
      email,
      password,
    };

    try {
      await saveUser(userData); // Save the user via API call
      navigate('/login'); // Redirect to the login page after registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page if the user clicks login
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="brand-name">GoCart</h1>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus // Added autoFocus here
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
        
        <p className="register-login-link">
          Already have an account?{' '}
          <button onClick={handleLoginClick} className="register-login-btn">Login here</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
