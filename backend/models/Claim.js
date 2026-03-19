const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  policy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true,
  },
  claim_amount: {
    type: Number,
    required: true,
  },
  trigger_type: {
    type: String,
    enum: ['rain', 'flood', 'heat', 'pollution', 'curfew', 'manual'],
    required: true,
  },
  trigger_value: {
    type: Number,
    description: 'Actual weather/pollution value that triggered the claim',
  },
  threshold_value: {
    type: Number,
    description: 'Threshold that was breached',
  },
  location: {
    latitude: Number,
    longitude: Number,
    city: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid'],
    default: 'pending',
  },
  fraud_check: {
    fraud_score: Number,
    is_fraudulent: Boolean,
    fraud_reasons: [String],
  },
  notes: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  approved_at: Date,
  paid_at: Date,
});

module.exports = mongoose.model('Claim', claimSchema);
