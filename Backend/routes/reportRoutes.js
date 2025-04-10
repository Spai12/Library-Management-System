const express =require('express');
const Loan = require('../models/loan.js');
const User = require('../models/user.js');
const Book = require('../models/book.js');

const router = express.Router();

router.get('/usage', async (req, res) => {
  try {
    const loanCount = await Loan.countDocuments();
    const userCount = await User.countDocuments();
    const bookCount = await Book.countDocuments();
    const overdueLoans = await Loan.find({ dueDate: { $lt: new Date() }, returned: false }).countDocuments();

    res.json({
      loanCount,
      userCount,
      bookCount,
      overdueLoans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
});

module.exports = router;
