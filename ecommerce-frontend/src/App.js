import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import AdminOrders from './pages/AdminOrdersPage';
import AdminDashboard from './pages/AdminPanel';
import AdminProducts from './pages/AdminProducts'; // Assuming this is your products page

import CustomerOrders from './pages/CustomerOrders'; // Import CustomerOrders component


import Cart from './pages/CartPage';
import Customers from './pages/Customers';
import EditProduct from './pages/EditProduct';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrdersPage from './pages/OrdersPage';

import ProductDetails from './pages/ProductDetailsPage';
import Products from './pages/ProductsPage';
import Register from './pages/RegisterPage';


import ProfilePage from './pages/ProfilePage';

import SellersPage from './pages/SellersPage';






function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/customers" element={<Customers />} /> {/* Add Customers component */}
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="admin/customers/:customerId/orders" element={<CustomerOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} /> {/* Add AdminProducts component */}
          <Route path="/admin/edit-product/:productId" element={<EditProduct />} /> {/* Edit Product */}
          <Route path="/admin/sellers" element={<SellersPage />} />

          
          <Route path="/products/category/:categoryId" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} /> {/* Dynamic orderId */}




          <Route path="/profile" element={<ProfilePage />} />



          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* Catch all route for undefined paths */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
