import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from './AddBook';
import UpdateBookForm from './UpdateBookForm';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('/api/books');
      console.log('API response:', data); // Log the response to inspect the format
      
      // Check if the response data is an array
      if (Array.isArray(data)) {
        setBooks(data);

        // Extract unique categories from books
        const uniqueCategories = [...new Set(data.map(book => book.category))];
        setCategories(uniqueCategories);
      } else if (typeof data === 'object' && data.books && Array.isArray(data.books)) {
        // Handle case where data is an object with a 'books' array
        setBooks(data.books);

        // Extract unique categories from books
        const uniqueCategories = [...new Set(data.books.map(book => book.category))];
        setCategories(uniqueCategories);
      } else {
        // Handle unexpected response format
        console.error('Unexpected response format: expected an array or an object with a "books" array.');
        setErrorMessage('Unexpected response format: expected an array.');
        setBooks([]);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setErrorMessage('Error fetching books. Please try again later.');
      setBooks([]);
      setCategories([]);
    }
  };

  const handleBookAdded = () => {
    fetchBooks();
  };

  const handleBookUpdated = () => {
    fetchBooks();
    setEditingBook(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      setErrorMessage('Error deleting book. Please try again later.');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory)
    : books;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      {editingBook ? (
        <UpdateBookForm book={editingBook} onBookUpdated={handleBookUpdated} />
      ) : (
        <AddBookForm onBookAdded={handleBookAdded} />
      )}
      <div className="my-4">
        <label htmlFor="category" className="block text-gray-700 mb-2">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <ul className="space-y-4">
        {filteredBooks.map(book => (
          <li key={book._id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">{book.title}</div>
              <div className="text-gray-700">by {book.author}</div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(book)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookPage;
