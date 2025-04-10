import React, { useState } from 'react';
import axios from 'axios';

const UpdateBookForm = ({ book, onBookUpdated }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [stock, setStock] = useState(book.stock);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/books/${book._id}`, { title, author, category, stock });
      onBookUpdated();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">stock</label>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update Book
      </button>
    </form>
  );
};

export default UpdateBookForm;
