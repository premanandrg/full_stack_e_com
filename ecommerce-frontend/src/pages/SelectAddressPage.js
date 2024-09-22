import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { getAddressByUserId } from '../services/api';
import './SelectAddressPage.css'; // Import your CSS for styling

const SelectAddressPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        try {
          const response = await getAddressByUserId(currentUser.id);
          setAddresses(response.data);
          setSelectedAddressId(response.data[0]?.id || null); // Select first address by default
        } catch (error) {
          console.error('Error fetching addresses:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelection = () => {
    if (selectedAddressId) {
      navigate('/payment', { state: { orderData, addressId: selectedAddressId } });
    }
  };

  const handleAddAddress = () => {
    navigate('/add-address');
  };

  if (loading) {
    return <div className="loading-message">Loading addresses...</div>;
  }

  return (
    <div className="select-address-page">
      <Header />
      <PageTitle title="Select Address" />

      {addresses.length === 0 ? (
        <div className="no-address-container">
          <p>No addresses found. Please add an address first.</p>
          <button className="add-address-button" onClick={handleAddAddress}>
            Add Address
          </button>
        </div>
      ) : (
        <form className="address-list">
          {addresses.map((address) => (
            <div key={address.id} className="address-item">
              <label className="address-details">
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={selectedAddressId === address.id}
                  onChange={() => setSelectedAddressId(address.id)}
                />
                <div>
                  <strong>{address.name}</strong>
                  <p>{address.street}, {address.city}, {address.pincode}</p>
                  <p>Phone: {address.phoneNumber}</p>
                </div>
              </label>
            </div>
          ))}
          <button 
            type="button" 
            className="select-address-button" 
            onClick={handleAddressSelection}
          >
            Proceed with Selected Address
          </button>
        </form>
      )}
      <Footer />
    </div>
  );
};

export default SelectAddressPage;
