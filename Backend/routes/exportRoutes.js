const express = require('express');
const Loan = require('../models/loan.js');
const User = require('../models/user.js');
const Book = require('../models/book.js');
const { Parser } = require('json2csv');

const router = express.Router();

router.get('/loans', async (req, res) => {
  try {
    // Fetch loans with populated user and book fields
    const loans = await Loan.find().populate('user book');

    // Transform loans to a format suitable for CSV export
    const flattenedLoans = loans.map(loan => ({
      _id: loan._id,
      'user.name': loan.user ? loan.user.name : 'N/A',
      'book.title': loan.book ? loan.book.title : 'N/A',
      loanDate: loan.loanDate,
      dueDate: loan.dueDate,
      returned: loan.returned
    }));

    // Define the fields for CSV
    const fields = ['_id', 'user.name', 'book.title', 'loanDate', 'dueDate', 'returned'];

    // Create the CSV parser
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(flattenedLoans);

    // Set the response headers and send the CSV file
    res.header('Content-Type', 'text/csv');
    res.attachment('loans.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting data', error });
  }
});

module.exports = router;
