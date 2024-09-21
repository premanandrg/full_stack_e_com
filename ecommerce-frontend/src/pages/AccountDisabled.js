import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './AccountDisabled.css'; // Import custom styles

const AccountDisabled = () => {
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/login'); // Navigate back to the login page
    };

    return (
        <div className="account-disabled-container">
            <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" />
            <h1>Account Disabled</h1>
            <p>Your account has been disabled. Please contact support for assistance.</p>
            <button onClick={handleBackToLogin} className="back-to-login-btn">
                Back to Login
            </button>
        </div>
    );
};

export default AccountDisabled;
