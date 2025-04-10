import React, { useState } from 'react';
import axios from 'axios';

const AddLoanForm = ({ users = [], books = [], onLoanAdded }) => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Log the props to debug the issue
  console.log('AddLoanForm users:', users);
  console.log('AddLoanForm books:', books);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/loans', { userId, bookId, loanDate, dueDate });
      onLoanAdded();
      setUserId('');
      setBookId('');
      setLoanDate('');
      setDueDate('');
    } catch (error) {
      setError('Error adding loan. Please try again.');
      console.error('Error adding loan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Add Loan</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700">User</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select User</option>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))
          ) : (
            <option disabled>No users available</option>
          )}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Book</label>
        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select Book</option>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <option key={book._id} value={book._id}>{book.title}</option>
            ))
          ) : (
            <option disabled>No books available</option>
          )}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Loan Date</label>
        <input
          type="date"
          value={loanDate}
          onChange={(e) => setLoanDate(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Loan
      </button>
    </form>
  );
};

export default AddLoanForm;
