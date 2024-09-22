import React, { useEffect, useState } from 'react';
import Footer from '../components/AdminFooter';
import AdminHeader from '../components/AdminHeader';
import { deleteUserById, getSellers, updateUser } from '../services/api'; // Import deleteUserById
import './Customers.css'; // Import custom styles

const SellersPage = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await getSellers();
        setSellers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sellers:', error);
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleStatusToggle = async (seller) => {
    const updatedSeller = { ...seller, enabled: !seller.enabled };

    try {
      await updateUser(updatedSeller); // Send updated seller to the backend
      setSellers((prevSellers) =>
        prevSellers.map((s) =>
          s.id === updatedSeller.id ? updatedSeller : s
        )
      ); // Update the local state to reflect the changes
    } catch (error) {
      console.error('Error updating seller status:', error);
    }
  };

  const handleDeleteSeller = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this seller?');
    if (!confirmDelete) return;

    try {
      await deleteUserById(id); // Call the delete user API
      setSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id)); // Remove seller from state
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Loading spinner
  }

  return (
    <div className="customers-page">
      <AdminHeader />
      <div className="customers-container">
        <h2 className="page-title">Sellers</h2>

        {sellers.length === 0 ? (
          <p className="no-sellers">No sellers found.</p>
        ) : (
          <div className="table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th> {/* Add actions column */}
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller.id} className="customer-row">
                    <td>{seller.id}</td>
                    <td>{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={seller.enabled}
                          onChange={() => handleStatusToggle(seller)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteSeller(seller.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer /> {/* Footer */}
    </div>
  );
};

export default SellersPage;
