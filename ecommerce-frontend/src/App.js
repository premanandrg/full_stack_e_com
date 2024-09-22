import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AccountDisabled from './pages/AccountDisabled';
import AddAddressPage from './pages/AddAdressPage';
import AddProduct from './pages/AddProduct';
import AddressPage from './pages/AddressPage';

import AddSellerPage from './pages/AddSellerPage';
import AdminOrders from './pages/AdminOrdersPage';
import AdminDashboard from './pages/AdminPanel';
import AdminProducts from './pages/AdminProducts'; // Assuming this is your products page
import Cart from './pages/CartPage';
import CustomerOrders from './pages/CustomerOrders'; // Import CustomerOrders component
import Customers from './pages/Customers';
import EditAddress from './pages/EditAddress';
import EditProduct from './pages/EditProduct';
import LoginPage from './pages/LoginPage';
import Home from './pages/MainPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderPlacedPage from './pages/OrderPlacedPage'; // Import OrderPlacedPage component
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage'; // Import PaymentPage component
import ProductDetails from './pages/ProductDetailsPage';
import Products from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SelectAddressPage from './pages/SelectAddressPage'; // Import OrderPlacedPage component
import SellerPanel from './pages/SellerPanel';
import SellersPage from './pages/SellersPage';





function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Address routes */}
          <Route path="/address" element={<AddressPage />} />
          <Route path="/edit-address/:id" element={<EditAddress />} />
          <Route path="/add-address" element={<AddAddressPage />} />
          <Route path="/selectAddress" element={<SelectAddressPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers/:customerId/orders" element={<CustomerOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:productId" element={<EditProduct />} />
          <Route path="/admin/sellers" element={<SellersPage />} />
          <Route path="/admin/add-seller" element={<AddSellerPage />} />

          <Route path="/products/category/:categoryId" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/sellerPanel" element={<SellerPanel />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account-disabled" element={<AccountDisabled />} />

          {/* Payment and Order Placed routes */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-placed" element={<OrderPlacedPage />} />

          {/* Catch-all route for undefined paths */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
