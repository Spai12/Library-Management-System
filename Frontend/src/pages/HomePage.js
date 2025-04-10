// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Library Management System</h1>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
          <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
