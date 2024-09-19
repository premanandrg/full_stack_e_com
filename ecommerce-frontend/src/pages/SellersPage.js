import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Customers.css'; // Import custom styles

import AdminHeader from '../components/AdminHeader';


const SellersPage = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await getSellers();
        setSellers(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchSellers();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Loading spinner
  }

  return (
    <div className="customers-page">


      <div className="customers-container">   
        <AdminHeader />
        <h2>Sellers</h2>


        {sellers.length === 0 ? (
          <p>No Sellers found.</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th> {/* Add actions column */}
              </tr>
            </thead>
            <tbody>
              {sellers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    {/* View Orders button */}
                    <Link to={`/admin/customers/${customer.id}/orders`} className="view-orders-button">
                      View Orders
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer /> {/* Footer */}
    </div>
  );
};

export default SellersPage;
