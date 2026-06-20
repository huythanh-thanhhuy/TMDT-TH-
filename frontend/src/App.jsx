import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CategoryManagement from './components/CategoryManagement';
import ProductManagement from './components/ProductManagement';
import './App.css';

export default function App() {
    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <div className="nav-container">
                        <h1 className="nav-brand">E-Commerce Admin</h1>
                        <ul className="nav-menu">
                            <li>
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                >
                                    Quản lý Danh mục
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/products" 
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                >
                                    Quản lý Sản phẩm
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<CategoryManagement />} />
                        <Route path="/products" element={<ProductManagement />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
