// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { processPayment, getTransactionHistory } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Process payment route
router.post('/process', protect, processPayment);

// Get transaction history route
router.get('/history', protect, getTransactionHistory);

module.exports = router;