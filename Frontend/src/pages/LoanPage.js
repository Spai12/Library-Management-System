import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddLoanForm from './AddLoanForm';

const LoanPage = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [loansResponse, usersResponse, booksResponse] = await Promise.all([
        axios.get('/api/loans'),
        axios.get('/api/users'),
        axios.get('/api/books')
      ]);

      console.log('Loans data:', loansResponse.data); // Log the response
      setLoans(loansResponse.data);
      setUsers(usersResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoanAdded = () => {
    fetchInitialData(); // Refetch data after adding loan
  };

  const handleReturn = async (id) => {
    try {
      await axios.put(`/api/loans/return/${id}`);
      fetchInitialData(); // Refetch data after returning loan
    } catch (error) {
      console.error('Error returning loan:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/loans/${id}`);
      fetchInitialData(); // Refetch data after deleting loan
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Render loading indicator while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Render error message if fetching data fails
  }

  // Check and log the loans data before mapping
  console.log('Loans before map:', loans);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Loans</h1>
      <AddLoanForm users={users} books={books} onLoanAdded={handleLoanAdded} />
      <ul className="space-y-4">
        {Array.isArray(loans) && loans.length > 0 ? (
          loans.map((loan) => (
            <li key={loan._id} className="bg-white shadow rounded-lg p-4">
              <div>
                <strong>Book:</strong> {loan.book ? loan.book.title : 'N/A'}
              </div>
              <div>
                <strong>Borrowed by:</strong> {loan.user ? loan.user.name : 'N/A'}
              </div>
              <div>
                <strong>Loan Date:</strong> {new Date(loan.loanDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}
              </div>
              {loan.returned ? (
                <div className="text-green-600">Returned</div>
              ) : (
                <button
                  onClick={() => handleReturn(loan._id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Return
                </button>
              )}
              {loan.fine > 0 && <div className="text-red-600">Fine: ${loan.fine}</div>}
              <button
                onClick={() => handleDelete(loan._id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No loans available.</p>
        )}
      </ul>
    </div>
  );
};

export default LoanPage;
