const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Claim = require('../models/Claim');
const Policy = require('../models/Policy');

const router = express.Router();

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Get dashboard analytics
router.get('/analytics', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activePolicies = await Policy.countDocuments({ status: 'active' });
    const totalClaims = await Claim.countDocuments();
    const approvedClaims = await Claim.countDocuments({ status: 'approved' });
    const rejectedClaims = await Claim.countDocuments({ status: 'rejected' });
    const pendingClaims = await Claim.countDocuments({ status: 'pending' });

    // Claims by trigger type
    const claimsByType = await Claim.aggregate([
      {
        $group: {
          _id: '$trigger_type',
          count: { $sum: 1 },
        },
      },
    ]);

    // Total payout
    const totalPayoutData = await Claim.aggregate([
      { $match: { status: 'paid' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$claim_amount' },
        },
      },
    ]);

    const totalPayout = totalPayoutData[0]?.total || 0;

    // High-risk users
    const highRiskUsers = await Policy.find({ risk_score: { $gt: 70 } })
      .populate('user_id')
      .limit(10);

    res.json({
      totalUsers,
      activePolicies,
      totalClaims: {
        total: totalClaims,
        approved: approvedClaims,
        rejected: rejectedClaims,
        pending: pendingClaims,
      },
      claimsByType,
      totalPayout,
      highRiskUsers,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ created_at: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all claims for review
router.get('/claims', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const claims = await Claim.find(query)
      .populate('user_id')
      .populate('policy_id')
      .sort({ created_at: -1 });

    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve/Reject claim manually
router.post('/claims/:id/review', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        approved_at: status === 'approved' ? new Date() : null,
      },
      { new: true }
    );

    res.json({
      message: `Claim ${status}`,
      claim,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
