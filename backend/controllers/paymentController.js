// controllers/paymentController.js
const { Web3 } = require('web3'); // Import Web3 correctly
const Transaction = require('../models/Transaction');
const { sendFraudAlert } = require('../utils/sendAlert');
const axios = require('axios');

// Initialize Web3
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_KEY'); // Or use a different provider

// Process payment
const processPayment = async (req, res) => {
  try {
    const { userId, amount, cardDetails } = req.body;

    // Create transaction record
    const transaction = new Transaction({
      userId,
      amount,
      cardNumber: cardDetails.cardNumber.slice(-4), // Store only last 4 digits
      transactionId: web3.utils.sha3(Date.now().toString()).slice(0, 10),
      status: 'pending'
    });

    await transaction.save();

    // Call fraud detection API
    const fraudResponse = await axios.post('http://localhost:5001/predict', {
      amount: amount,
      time_elapsed: Math.floor(Math.random() * 300), // Simulated time elapsed
      is_international: cardDetails.isInternational ? 1 : 0
    });

    // Update transaction with fraud score
    transaction.fraudScore = fraudResponse.data.fraud_score;
    transaction.riskLevel = fraudResponse.data.risk_level;
    
    // Determine if transaction should be approved
    if (fraudResponse.data.risk_level === 'high') {
      transaction.status = 'rejected';
      await transaction.save();
      
      // Send fraud alert
      await sendFraudAlert(transaction);
      
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction flagged as potentially fraudulent and has been rejected' 
      });
    }

    // Process the payment (in a real app, you'd integrate with a payment processor)
    transaction.status = 'completed';
    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      transactionId: transaction.transactionId,
      fraudScore: transaction.fraudScore,
      riskLevel: transaction.riskLevel
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ success: false, message: 'Error processing payment' });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ timestamp: -1 });
    
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ success: false, message: 'Error fetching transaction history' });
  }
};

module.exports = {
  processPayment,
  getTransactionHistory
};