import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
          <h1 className="text-2xl font-bold text-center">Welcome back</h1>
          {error && <div className="text-red-600 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              Continue
            </button>
          </form>
          <div className="text-center text-sm">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  

export default Login;




