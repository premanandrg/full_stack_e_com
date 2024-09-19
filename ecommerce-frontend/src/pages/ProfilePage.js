import React from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // Importing the profile and cart icons
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; // Import the CSS file for styling

import Footer from '../components/Footer';

const ProfilePage = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get user info from local storage

    const handleLogout = () => {
        localStorage.removeItem('currentUser'); // Remove user info from local storage
        navigate('/login'); // Redirect to login page
    };

    if (!currentUser) {
        return <p>Please log in to view your profile.</p>; // Handle case where user is not logged in
    }

    const handleNavigateToOrders = () => {
        navigate('/orders'); // Navigate to the My Orders page
    };

    return (
        <div className="profile-page">
            <header className="page-header">
                <h1>Welcome, {currentUser.name}!</h1> {/* Display user name */}
            </header>
            <div className="profile-container">
                <div className="profile-header">
                    <FaUserCircle className="profile-icon" />
                </div>
                <div className="profile-info">
                    <h2 className="profile-title">{currentUser.name}</h2> {/* Display user name */}
                    <p><strong>Email:</strong> {currentUser.email}</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            {/* My Orders ListTile */}
            <div className="my-orders-tile" onClick={handleNavigateToOrders}>
                <FaShoppingCart className="my-orders-icon" />
                <span className="my-orders-text">My Orders</span>
            </div>

            <Footer/>
        </div>
    );
};

export default ProfilePage;
