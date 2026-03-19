const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  delivery_platform: {
    type: String,
    enum: ['swiggy', 'zomato', 'amazon', 'blinkit', 'other'],
    default: 'swiggy',
  },
  location: {
    latitude: Number,
    longitude: Number,
    city: String,
  },
  weekly_income: {
    type: Number,
    default: 0,
  },
  working_hours: {
    type: Number,
    default: 0,
  },
  wallet_balance: {
    type: Number,
    default: 0,
  },
  active_policy_id: mongoose.Schema.Types.ObjectId,
  is_admin: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model('User', userSchema);
