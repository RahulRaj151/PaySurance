const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  claim_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claim',
  },
  policy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_type: {
    type: String,
    enum: ['claim_payout', 'premium_payment'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  razorpay_payment_id: String,
  razorpay_order_id: String,
  transaction_id: {
    type: String,
    unique: true,
  },
  payment_method: {
    type: String,
    enum: ['wallet', 'upi', 'card', 'netbanking'],
    default: 'wallet',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
