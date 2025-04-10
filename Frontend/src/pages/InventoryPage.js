import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from './AddBook';

const InventoryPage = () => {
  const [books, setBooks] = useState([]);
  const [lowStockBooks, setLowStockBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchLowStockBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('/api/inventory');
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchLowStockBooks = async () => {
    try {
      const { data } = await axios.get('/api/inventory/low-stock');
      setLowStockBooks(data);
    } catch (error) {
      console.error('Error fetching low stock books:', error);
    }
  };

  const handleBookAdded = () => {
    fetchBooks();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <AddBookForm onBookAdded={handleBookAdded} />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">All Books</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map(book => (
            <li key={book._id} className="bg-white shadow rounded-lg p-4">
              <div className="font-bold text-lg">{book.title}</div>
              <div className="text-gray-700">Author: {book.author}</div>
              <div className="text-gray-500">Stock: {book.stock}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Low Stock Books</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lowStockBooks.map(book => (
            <li key={book._id} className="bg-white shadow rounded-lg p-4">
              <div className="font-bold text-lg">{book.title}</div>
              <div className="text-gray-700">Author: {book.author}</div>
              <div className="text-gray-500">Stock: {book.stock}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryPage;
