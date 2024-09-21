import React, { useEffect, useState } from 'react';
import { deleteAddress, getAllAddresses } from '../services/api'; // Adjust the path as needed

const AddressList = ({ onEdit }) => { // Accept onEdit as a prop
    const [addresses, setAddresses] = useState([]);
 
    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        const response = await getAllAddresses();
        setAddresses(response.data);
    };

    const handleDelete = async (id) => {
        await deleteAddress(id);
        fetchAddresses(); // Refresh the list
    };

    const handleEdit = (id) => {
        onEdit(id); // Use the onEdit prop to navigate to edit address
    };

    return (
        <div>
            <h2>Your Addresses</h2>
            <ul>
                {addresses.map((address) => (
                    <li key={address.id}>
                        <p>Name: {address.name}</p>
                        <p>Email: {address.email}</p>
                        <p>Street: {address.street}</p>
                        <p>City: {address.city}</p>
                        <p>Pincode: {address.pincode}</p>
                        <button onClick={() => handleDelete(address.id)}>Delete</button>
                        <button onClick={() => handleEdit(address.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddressList;
