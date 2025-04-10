import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopularBooksPage = () => {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    try {
      const { data } = await axios.get('/api/inventory/popular');
      setPopularBooks(data);
    } catch (error) {
      console.error('Error fetching popular books:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Books</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularBooks.map(book => (
          <li key={book._id} className="bg-white shadow rounded-lg p-4">
            <div className="font-bold text-lg">{book.title}</div>
            <div className="text-gray-700">{book.author}</div>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBooksPage;
