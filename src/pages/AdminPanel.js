import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <Topbar />
        <div className="admin-main">
          <h2>Welcome to the Admin Panel</h2>
          <p>Select an option from the sidebar to manage Users, Orders, or Products.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
