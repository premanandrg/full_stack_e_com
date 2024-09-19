import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Admin from './pages/Admin';
import Cart from './pages/CartPage';
import Home from './pages/HomePage';
// import NotFound from './components/NotFound';
import AddProduct from './pages/AddProduct';
import AdminDashboard from './pages/AdminDashboard';

import LoginPage from './pages/LoginPage';
import Products from './pages/ProductsPage';

import Register from './pages/RegisterPage';



 





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

          
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/products/:categoryId" element={<Products />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* Catch all route for undefined paths */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
