const Loan = require('../models/loan');
const User = require('../models/user');
const Book = require('../models/book');

// Get all loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('book user');
    const loansWithFine = loans.map(loan => ({
      ...loan.toObject(),
      fine: loan.calculateFine(),
    }));
    res.json(loansWithFine);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans' });
  }
};

// Add a new loan
exports.addLoan = async (req, res) => {
  try {
    const { userId, bookId, dueDate,loanDate } = req.body;
    console.log(req.body)
    const userData = await User.findById(userId);
    const bookData = await Book.findById(bookId);
    console.log(bookData)
    console.log(userData)
    const newLoan = new Loan({ 
      user: userId,
      book: bookId,
      loanDate,
      dueDate, });
    console.log(newLoan)
    await newLoan.save();

    // Add loan to user's borrowing history
    console.log(userData)
    userData.borrowingHistory.push(newLoan._id);
    await userData.save();

    // Decrease book stock
    console.log(bookData)
    bookData.stock -= 1;
    await bookData.save();

    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error adding loan' });
  }
};

// Return a loan
exports.returnLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLoan = await Loan.findByIdAndUpdate(id, { returned: true, returnDate: Date.now() }, { new: true }).populate('book');
    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Increase book stock
    const bookData = await Book.findById(updatedLoan.book._id);
    bookData.stock += 1;
    await bookData.save();

    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error returning loan' });
  }
};
exports.deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the loan by ID and populate related user and book information
    const loan = await Loan.findById(id).populate('user book');
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Update the user's borrowing history by removing the loan reference
    const user = await User.findById(loan.user._id);
    if (user) {
      user.borrowingHistory = user.borrowingHistory.filter(loanId => loanId.toString() !== id);
      await user.save();
    } else {
      console.error(`User not found for loan: ${id}`);
    }

    // Increase the book stock if the loan hasn't already been returned
    const book = await Book.findById(loan.book._id);
    if (book && !loan.returned) {
      book.stock += 1;
      await book.save();
    } else if (!book) {
      console.error(`Book not found for loan: ${id}`);
    }

    // Delete the loan
    await Loan.findByIdAndDelete(id);

    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error(`Error deleting loan: ${error.message}`);
    res.status(500).json({ message: 'Error deleting loan', error });
  }
};
