const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Payment = require('../models/Payment');

const router = express.Router();

// Get wallet balance
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    res.json({
      balance: user.wallet_balance,
      currency: 'INR',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get wallet transactions
router.get('/transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await Payment.find({ user_id: req.user_id })
      .sort({ created_at: -1 })
      .limit(50);

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mock wallet recharge
router.post('/recharge', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount <= 0 || amount > 50000) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const user = await User.findById(req.user_id);
    user.wallet_balance += amount;
    await user.save();

    const payment = new Payment({
      user_id: req.user_id,
      amount,
      payment_type: 'premium_payment',
      status: 'success',
      transaction_id: `RECHARGE-${Date.now()}`,
    });

    await payment.save();

    res.json({
      message: 'Wallet recharged',
      balance: user.wallet_balance,
      transaction: payment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
