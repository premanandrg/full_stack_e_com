import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:8080';

// Products endpoints
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);
export const addProduct = (product) => axios.post(`${API_URL}/products`, product);
export const updateProduct = (product) => axios.put(`${API_URL}/products`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
export const getProductsByCategoryId = (categoryId) => axios.get(`${API_URL}/products/category/${categoryId}`);

// Address endpoints
export const addAddress = (address) => axios.post(`${API_URL}/address`, address);
export const getAllAddresses = () => axios.get(`${API_URL}/address`);
export const getAddressById = (id) => axios.get(`${API_URL}/address/${id}`);
export const getAddressByEmail = (email) => axios.get(`${API_URL}/address/email/${email}`);
export const updateAddress = (address) => axios.put(`${API_URL}/address`, address);
export const deleteAddress = (id) => axios.delete(`${API_URL}/address/${id}`);

// Cart endpoints
export const getCartByUserId = (userId) => axios.get(`${API_URL}/carts/user/${userId}`);
export const addProductToCart = (userId, productId, quantity) => axios.post(`${API_URL}/carts/user/${userId}/product/${productId}`, null, { params: { quantity } });
export const removeProductFromCart = (userId, productId) => axios.delete(`${API_URL}/carts/user/${userId}/product/${productId}`);
export const getAllCarts = () => axios.get(`${API_URL}/carts`);

// Category endpoints
export const addCategory = (category) => axios.post(`${API_URL}/category`, category);
export const getCategoryById = (categoryId) => axios.get(`${API_URL}/category/${categoryId}`);
export const getAllCategories = () => axios.get(`${API_URL}/category`);
export const updateCategory = (category) => axios.put(`${API_URL}/category`, category);
export const deleteCategory = (categoryId) => axios.delete(`${API_URL}/category/${categoryId}`);

// User endpoints
export const saveUser = (user) => axios.post(`${API_URL}/users`, user, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export const updateUser = (user) => axios.put(`${API_URL}/users`, user);
export const getUserByEmail = (email) => axios.get(`${API_URL}/users/${email}`);
export const getAllUsers = () => axios.get(`${API_URL}/users`);
export const signInUser = (userDto) => axios.post(`${API_URL}/users/signin`, userDto);
export const deleteUserById = (id) => axios.delete(`${API_URL}/users/${id}`);

// Payment endpoints
export const verifyPayment = (paymentDetails) => axios.post(`${API_URL}/payment/verify`, paymentDetails);

// Order endpoints
export const createOrder = (orderData) => axios.post(`${API_URL}/orders`, orderData);
export const getOrdersByUserId = (userId) => axios.get(`${API_URL}/orders/user/${userId}`);
export const getOrderById = (orderId) => axios.get(`${API_URL}/orders/${orderId}`);
export const getAllOrders = () => axios.get(`${API_URL}/orders`);
export const deleteOrder = (orderId) => axios.delete(`${API_URL}/orders/${orderId}`); // New endpoint for deleting an order
export const updateOrderStatus = (orderId, status) => axios.put(`${API_URL}/orders/${orderId}`, { status });


//Sellers
export const getSellers = () => axios.get(`${API_URL}/users/sellers`);
