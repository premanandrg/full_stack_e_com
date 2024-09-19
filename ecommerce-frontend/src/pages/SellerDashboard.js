import React from 'react';
import { FiBox, FiPackage, FiShoppingBag } from 'react-icons/fi'; // Added FiUserCheck for Sellers icon
import { Link, Route, Routes } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AddProduct from './AddProduct';
import './AdminPanel.css';
import AdminProducts from './AdminProducts';
import EditProduct from './EditProduct';
import OrdersPage from './OrdersPage';

const SellerPanel = () => {
  return (
    <div>
      <AdminHeader/>
      <div className="admin-panel">
        <nav className="admin-nav">
          <h2 className="admin-title">Seller Panel</h2>
          <ul className="nav-list">
            
            <li>
              <Link to="/admin/orders">
                <FiShoppingBag className="icon" /> Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/add-product">
                <FiPackage className="icon" /> Add Product
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <FiBox className="icon" /> Products
              </Link>
            </li>
            
          </ul>
        </nav>

        <div className="admin-content">
          <Routes>
         
            <Route path="orders" element={<OrdersPage />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="edit-product/:productId" element={<EditProduct />} />
          
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SellerPanel;
