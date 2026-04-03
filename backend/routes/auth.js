const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, delivery_platform, weekly_income } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      delivery_platform,
      weekly_income: parseFloat(weekly_income) || 0,
    });

    await user.save();

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
const { email, password } = req.body;

    // Demo bypass
    if (email === 'demo@paysurance.com' && password === 'demo@123') {
      const mockUser = {
        _id: 'demo_user',
        name: 'Demo Worker',
        email,
        phone: '+919876543210',
        delivery_platform: 'swiggy',
        weekly_income: 5000,
        is_admin: false
      };
      const token = jwt.sign({ user_id: mockUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Logged in successfully',
        token,
        user: mockUser
      });
    }

    if (email === 'admin@paysurance.com' && password === 'admin@123') {
      const mockUser = {
        _id: 'admin_user',
        name: 'Admin',
        email,
        phone: '+919876543210',
        is_admin: true
      };
      const token = jwt.sign({ user_id: mockUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Logged in successfully',
        token,
        user: mockUser
      });
    }

    // Normal DB login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        is_admin: user.is_admin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    // Mock demo users
    if (req.user_id === 'demo_user') {
      return res.json({
        _id: 'demo_user',
        name: 'Demo Worker',
        email: 'demo@paysurance.com',
        phone: '+919876543210',
        delivery_platform: 'swiggy',
        weekly_income: 5000,
        is_admin: false,
        wallet_balance: 0,
        active_policy_id: null
      });
    }
    if (req.user_id === 'admin_user') {
      return res.json({
        _id: 'admin_user',
        name: 'Admin',
        email: 'admin@paysurance.com',
        phone: '+919876543210',
        is_admin: true,
        wallet_balance: 0,
        active_policy_id: null
      });
    }
    // Normal DB lookup
    const user = await User.findById(req.user_id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
