const express = require('express');
const {
  getBooks,
  checkLowStock,
  addNewAcquisition,
  getPopularBooks,
} = require('../controllers/inventorycontroller');
const router = express.Router();

router.get('/', getBooks);
router.get('/low-stock', checkLowStock);
router.post('/new', addNewAcquisition);
router.get('/popular', getPopularBooks);

module.exports = router;
