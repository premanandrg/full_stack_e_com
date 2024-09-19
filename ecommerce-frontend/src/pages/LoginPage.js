// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { signInUser } from '../services/api'; // Import the signInUser function
import './Login.css'; // Import the updated CSS file for styling

const LoginPage = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error messages

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await signInUser({ email, password }); // Call your signInUser function
            console.log(response.data);
            
            localStorage.setItem('currentUser', JSON.stringify(response.data)); // Save entire user object
                        // Optionally, you can call onLogin if you have a callback for login state
            navigate('/'); // Redirect to home
        } catch (err) {
            console.log(err);
            setError('Invalid email or password'); // Set error message
        }
    };
    
    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="brand-name">GoCart</h1>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
