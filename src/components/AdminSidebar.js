import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
