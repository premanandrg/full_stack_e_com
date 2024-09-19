import React, { useState } from 'react';
import { addProduct } from '../services/api';
import './AdminDashboard.css';






const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Customers');
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();



        try {
            console.log(newProduct);

            console.log(newProduct);

            const response = await addProduct(newProduct);
    
            console.log('Product added successfully:', response.data);
    
            setProducts([...products, newProduct]);
            setNewProduct({ name: '', price: '', image: '' });
    


        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="tabs">
                <button onClick={() => handleTabChange('Customers')} className={activeTab === 'Customers' ? 'active' : ''}>Customers</button>
                <button onClick={() => handleTabChange('Products')} className={activeTab === 'Products' ? 'active' : ''}>Products</button>
                <button onClick={() => handleTabChange('Orders')} className={activeTab === 'Orders' ? 'active' : ''}>Orders</button>
            </div>

            <div className="tab-content">
                {activeTab === 'Customers' && (
                    <div className="card">
                        <h3>Customers</h3>
                        <p>Manage all customers here.</p>
                    </div>
                )}

                {activeTab === 'Products' && (
                    <div className="card">
                        <h3>Products</h3>
                        <ul>
                            {products.map((product, index) => (
                                <li key={index}>
                                    {product.name} - ${product.price}
                                    <img src={product.image} alt={product.name} width="100" />
                                </li>
                            ))}
                        </ul>

                        <h4>Add New Product</h4>
                        <form onSubmit={handleAddProduct}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Product Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Product Image URL"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">Add Product</button>
                        </form>
                    </div>
                )}

                {activeTab === 'Orders' && (
                    <div className="card">
                        <h3>Orders</h3>
                        <p>Manage all orders here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
