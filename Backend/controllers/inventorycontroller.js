const Book = require('../models/book');

// Get all books with inventory details
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  } 
};

// Alert for low stock
exports.checkLowStock = async (req, res) => {
  try {
    const lowStockBooks = await Book.find({ stock: { $lt: 5 } });
    res.json(lowStockBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error checking low stock' });
  }
};

// Add new acquisition
exports.addNewAcquisition = async (req, res) => {
  try {
    const { title, author, category, stock } = req.body;
    const newBook = new Book({ title, author, category, stock });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new book' });
  }
};

// Report on popular books
exports.getPopularBooks = async (req, res) => {
  try {
    const popularBooks = await Book.find().sort({ loansCount: -1 }).limit(10);
    res.json(popularBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular books' });
  }
};
