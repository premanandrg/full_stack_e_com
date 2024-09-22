import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/AdminFooter';
import AdminHeader from '../components/AdminHeader';
import { deleteUserById, getAllUsers, updateUser } from '../services/api'; // Import deleteUserById
import './Customers.css'; // Import custom styles

import PageTitle from '../components/PageTitle';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllUsers();
        setCustomers(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCustomers();
  }, []);

  const handleStatusToggle = async (customer) => {
    const updatedCustomer = { ...customer, enabled: !customer.enabled };

    try {
      await updateUser(updatedCustomer); // Reusing the updateUser function for updating customer status
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) =>
          c.id === updatedCustomer.id ? updatedCustomer : c
        )
      ); // Update the local state to reflect the changes
    } catch (error) {
      console.error('Error updating customer status:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (!confirmDelete) return;

    try {
      await deleteUserById(id); // Call the delete user API
      setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id)); // Remove customer from state
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Loading spinner
  }

  return (
    <div className="customers-page">
      <AdminHeader />
      <div className="customers-container">
       
        <PageTitle title='Customers'/>

        {customers.length === 0 ? (
          <p className="no-customers">No customers found.</p>
        ) : (
          <div className="table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th> {/* New column for status */}
                  <th>Actions</th> {/* Add actions column */}
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="customer-row">
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={customer.enabled}
                          onChange={() => handleStatusToggle(customer)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <Link
                        to={`/admin/customers/${customer.id}/orders`}
                        className="view-orders-button"
                      >
                        View Orders
                      </Link>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
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

export default Customers;
