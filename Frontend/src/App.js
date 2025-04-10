import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import BookPage from './pages/BookPage.js';
import UserPage from './pages/UserPage.js';
import LoanPage from './pages/LoanPage.js';
import InventoryPage from './pages/InventoryPage.js';
import PopularBooksPage from './pages/PopulerBooksPage.js';
import ExportData from './pages/ExportData.js';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/books" element={<BookPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/loans" element={<LoanPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/popular-books" element={<PopularBooksPage />} />
                <Route path="/export" element={<ExportData />} />


            </Routes>
        </Router>
    );
}

export default App;