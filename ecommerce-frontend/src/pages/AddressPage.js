import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { deleteAddress, getAddressByUserId } from '../services/api'; // Import the new function
import './AddressPage.css';

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();


    // Get the user ID from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.id : null; // Get actual user ID


    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getAddressByUserId(userId); // Fetch addresses by user ID
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, [userId]);

    const handleDeleteAddress = async (id) => {
        try {
            await deleteAddress(id);
            setAddresses(addresses.filter(addr => addr.id !== id));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <div className="address-page">
            <Header />
            <div className="content">
                <h1 className="page-title">Manage Addresses</h1>
                <button onClick={() => navigate('/add-address')} className="add-address-button">Add New Address</button>
                <ul className="address-list">
                    {addresses.length === 0 ? (
                        <li className="no-addresses">No addresses available.</li>
                    ) : (
                        addresses.map((address) => (
                            <li key={address.id} className="address-item">
                                <div className="address-details">
                                    <p>{`${address.name}, ${address.phoneNumber}`}</p>
                                    <p>{`${address.street}, ${address.city}, ${address.pincode}`}</p>
                                </div>
                                <div className="address-actions">
                                    <button onClick={() => navigate(`/edit-address/${address.id}`)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDeleteAddress(address.id)} className="delete-button">Delete</button>
                                    
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default AddressPage;
