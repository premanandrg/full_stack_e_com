import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddressById, updateAddress } from '../services/api';

const EditAddressPage = () => {
    const [address, setAddress] = useState({ phoneNumber: '', name: '', street: '', city: '', pincode: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await getAddressById(id);
                setAddress(response.data);
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        fetchAddress();
    }, [id]);

    const handleUpdateAddress = async () => {
        try {
            await updateAddress(address);
            navigate('/address'); // Redirect after updating
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    return (
        <div className="edit-address-page">
            <h1>Edit Address</h1>
            <input
                type="text"
                placeholder="Phone Number"
                value={address.phoneNumber}
                onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
            />
            <input
                type="text"
                placeholder="Name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
            <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />
            <button onClick={handleUpdateAddress}>Update Address</button>
        </div>
    );
};

export default EditAddressPage;
