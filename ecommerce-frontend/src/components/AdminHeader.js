// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css';

const AdminHeader = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">GoCart</Link> {/* Add a class to style the link */}
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for products, brands and more" />
        {/* <button>Search</button> */}
      </div>
 
     
    </header>
  );
};

export default AdminHeader;
