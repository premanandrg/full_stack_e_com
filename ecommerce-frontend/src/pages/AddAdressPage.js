import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { addAddress } from '../services/api';
import './AddAddressPage.css'; // Importing the CSS for styling

const AddAddressPage = () => {
    const [newAddress, setNewAddress] = useState({
        phoneNumber: '',
        name: '',
        street: '',
        city: '',
        pincode: '',
        userId: null, // Initialize userId as null
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Get the user ID from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.id : null; // Get actual user ID

    // Update the newAddress state with userId
    useState(() => {
        if (userId) {
            setNewAddress((prevAddress) => ({ ...prevAddress, userId }));
        }
    }, [userId]);

    const validateForm = () => {
        const { phoneNumber, name, street, city, pincode } = newAddress;

        if (!phoneNumber || !name || !street || !city || !pincode) {
            setError('All fields are required');
            return false;
        }
        if (!/^\d+$/.test(phoneNumber)) {
            setError('Phone Number must be numeric');
            return false;
        }
        if (!/^\d{6}$/.test(pincode)) {
            setError('Pincode must be a 6-digit number');
            return false;
        }

        setError('');
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    };

    const handleAddAddress = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!validateForm()) return;

        try {
            await addAddress(newAddress); // Now includes userId in the newAddress object
            navigate('/address'); // Redirect to AddressPage after adding
        } catch (error) {
            console.error('Error adding address:', error);
            setError('Failed to add address. Please try again.'); // Optional error handling
        }
    };

    return (
        <div className="add-address-page">
            <Header />
            <h1 className="page-title">Add New Address</h1>
            <div className="form-container">
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleAddAddress}>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={newAddress.phoneNumber}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newAddress.name}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={newAddress.street}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <button type="submit" className="add-address-button">Add Address</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddAddressPage;
