import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [report, setReport] = useState({
    loanCount: 0,
    userCount: 0,
    bookCount: 0,
    overdueLoans: 0,
  });
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchReport = async () => {
    try {
      const { data, status } = await axios.get('/api/reports/usage');
      if (status === 200) {
        console.log('Report data:', data);
        setReport(data);
      } else {
        console.error('Unexpected response status:', status);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error in setting up request:', error.message);
      }
    } finally {
        setLoading(false);
      }
  };

  fetchReport();
}, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <a href='/loans' className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div>
              <p className="text-gray-600 text-xl">Total Loans</p>
              <p className="text-blue-600 text-3xl font-bold">{report.loanCount}</p>
            </div>
          </a>
          <a href='/users' className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div>
              <p className="text-gray-600 text-xl">Total Users</p>
              <p className="text-green-600 text-3xl font-bold">{report.userCount}</p>
            </div>
          </a>
          <a href='/books' className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div>
              <p className="text-gray-600 text-xl">Total Books</p>
              <p className="text-red-600 text-3xl font-bold">{report.bookCount}</p>
            </div>
          </a>
          <a href='/loans' className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div>
              <p className="text-gray-600 text-xl">Overdue Loans</p>
              <p className="text-yellow-600 text-3xl font-bold">{report.overdueLoans}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
