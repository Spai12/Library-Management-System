const express = require('express');
const { getLoans, addLoan, returnLoan, deleteLoan } = require('../controllers/loancontroller');
const router = express.Router();

router.get('/', getLoans);
router.post('/', addLoan);
router.put('/return/:id', returnLoan);
router.delete('/:id', deleteLoan);

module.exports = router;
