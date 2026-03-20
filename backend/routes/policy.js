const express = require('express');
const authMiddleware = require('../middleware/auth');
const Policy = require('../models/Policy');
const User = require('../models/User');
const axios = require('axios');

const router = express.Router();

// Create policy
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { coverage_amount } = req.body;
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Call AI service for risk score
    let riskScore = 0;
    let premium = 50; // base premium
    let explanation = 'Base premium: ₹50';

    try {
      const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/risk-score`, {
        latitude: user.location?.latitude || 0,
        longitude: user.location?.longitude || 0,
        city: user.location?.city || 'Unknown',
        weekly_income: user.weekly_income,
      });

      riskScore = aiResponse.data.risk_score || 0;
      const riskAdjustment = aiResponse.data.premium_adjustment || 0;
      premium += riskAdjustment;
      explanation = aiResponse.data.explanation || explanation;
    } catch (aiError) {
      console.log('AI service not available, using defaults');
    }

    const today = new Date();
    const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const policy = new Policy({
      user_id: req.user_id,
      premium: Math.round(premium),
      base_premium: 50,
      risk_score: riskScore,
      coverage_amount: coverage_amount || user.weekly_income * 1.5,
      status: 'active',
      start_date: today,
      end_date: endDate,
      premium_explanation: explanation,
    });

    await policy.save();

    // Update user's active policy
    await User.findByIdAndUpdate(req.user_id, {
      active_policy_id: policy._id,
    });

    res.status(201).json({
      message: 'Policy created successfully',
      policy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's policy
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Mock for demo
    if (req.user_id === 'demo_user') {
      const mockPolicy = {
        _id: 'demo_policy',
        user_id: 'demo_user',
        premium: 79,
        base_premium: 50,
        risk_score: 58,
        coverage_amount: 10000,
        status: 'active',
        start_date: new Date(Date.now() - 3*24*60*60*1000),
        end_date: new Date(Date.now() + 4*24*60*60*1000),
        premium_explanation: 'Base: ₹50 + Risk: ₹29 (Delhi high rainfall risk)'
      };
      return res.json(mockPolicy);
    }

    const policy = await Policy.findOne({
      user_id: req.user_id,
      status: 'active',
    }).sort({ created_at: -1 });

    if (!policy) {
      return res.json({ message: 'No active policy', policy: null });
    }

    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all policies for user
router.get('/history/all', authMiddleware, async (req, res) => {
  try {
    const policies = await Policy.find({ user_id: req.user_id }).sort({
      created_at: -1,
    });

    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
