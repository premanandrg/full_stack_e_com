import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Login.css'; // Import the updated CSS file for styling

import axios from 'axios';
 

const LoginPage = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('/users/login', { email, password });
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } catch (err) {
          console.log('Invalid email or password');
        }
      };
    
      const handleRegisterClick = () => {
        navigate('/register');
      };
    
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="brand-name">GoCart</h1> {/* Add the brand name here */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="register-link">
                    Don't have an account?{' '}
                    <button onClick={handleRegisterClick} className="register-btn">Register here</button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
