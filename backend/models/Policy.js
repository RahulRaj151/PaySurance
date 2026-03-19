const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  premium: {
    type: Number,
    required: true,
  },
  base_premium: {
    type: Number,
    default: 50,
  },
  risk_score: {
    type: Number,
    default: 0,
  },
  coverage_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired', 'cancelled'],
    default: 'active',
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  risk_factors: {
    rainfall: Number,
    temperature: Number,
    pollution: Number,
    flood_risk: Number,
  },
  premium_explanation: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Policy', policySchema);
