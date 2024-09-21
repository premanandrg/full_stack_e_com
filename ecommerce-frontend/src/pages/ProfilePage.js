import React, { useState } from 'react';
import { FaMapMarkedAlt, FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; // Import the CSS file for styling

import Footer from '../components/Footer';
import { updateUser } from '../services/api';

const ProfilePage = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Get user info from local storage
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleNavigateToAddresses = () => {
        navigate('/address'); // Navigate to the My Addresses page
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing); // Toggle editing mode
    };

    const handleUpdateProfile = async () => {
        // Update the user data logic (e.g., API call)
        const updatedUser = { ...currentUser, name, email };
        await updateUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Save updated user info
        setIsEditing(false); // Exit editing mode
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
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Update Name"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Update Email"
                            />
                            <button onClick={handleUpdateProfile} className="update-btn">Update</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Email:</strong> {currentUser.email}</p>
                            <button onClick={handleEditToggle} className="edit-btn">Edit</button>
                        </div>
                    )}
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            {/* My Orders ListTile */}
            <div className="list-tile" onClick={handleNavigateToOrders}>
                <FaShoppingCart className="list-icon" />
                <span className="list-text">My Orders</span>
            </div>

            {/* My Addresses ListTile */}
            <div className="list-tile" onClick={handleNavigateToAddresses}>
                <FaMapMarkedAlt className="list-icon" />
                <span className="list-text">My Addresses</span>
            </div>

            <Footer />
        </div>
    );
};

export default ProfilePage;
