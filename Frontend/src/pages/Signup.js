// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.msg || 'Signup failed');
        }
    };

    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-2xl font-bold text-center">Create your account</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium">Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100" 
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium">Email address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100" 
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Signup
            </button>
          </form>
          <div className="text-center text-sm">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  
export default Signup;
