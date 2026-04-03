const express = require('express');
const authMiddleware = require('../middleware/auth');
const Claim = require('../models/Claim');
const Policy = require('../models/Policy');
const User = require('../models/User');
const Payment = require('../models/Payment');
const axios = require('axios');

const router = express.Router();

// Trigger parametric claim (auto-generate on weather conditions)
router.post('/trigger', authMiddleware, async (req, res) => {
  try {
    const { trigger_type, trigger_value, threshold_value } = req.body;

    const user = await User.findById(req.user_id);
    const policy = await Policy.findOne({
      user_id: req.user_id,
      status: 'active',
    });

    if (!policy) {
      return res.status(400).json({ error: 'No active policy found' });
    }

    // Calculate claim amount (70% of coverage)
    const claimAmount = Math.round(policy.coverage_amount * 0.7);

    // Run fraud check
    let fraudCheck = {
      fraud_score: 0,
      is_fraudulent: false,
      fraud_reasons: [],
    };

    try {
      const fraudResponse = await axios.post(
        `${process.env.AI_SERVICE_URL}/fraud-check`,
        {
          user_id: req.user_id,
          latitude: user.location?.latitude || 0,
          longitude: user.location?.longitude || 0,
          trigger_type,
          claim_history: await Claim.countDocuments({
            user_id: req.user_id,
          }),
        }
      );

      fraudCheck = fraudResponse.data;
    } catch (aiError) {
      console.log('Fraud check service unavailable');
    }

    const claim = new Claim({
      user_id: req.user_id,
      policy_id: policy._id,
      claim_amount: claimAmount,
      trigger_type,
      trigger_value,
      threshold_value,
      location: user.location,
      fraud_check: fraudCheck,
      status: fraudCheck.is_fraudulent ? 'rejected' : 'pending',
    });

    await claim.save();

    // Auto-approve if not fraudulent
    if (!fraudCheck.is_fraudulent) {
      claim.status = 'approved';
      claim.approved_at = new Date();
      await claim.save();

      // Auto-payout
      user.wallet_balance += claimAmount;
      await user.save();

      const payment = new Payment({
        user_id: req.user_id,
        claim_id: claim._id,
        policy_id: policy._id,
        amount: claimAmount,
        payment_type: 'claim_payout',
        status: 'success',
        transaction_id: `TXN-${Date.now()}`,
      });

      await payment.save();

      claim.status = 'paid';
      claim.paid_at = new Date();
      await claim.save();
    }

    res.status(201).json({
      message: 'Claim processed',
      claim,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's claims
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Mock for demo
    if (req.user_id === 'demo_user') {
      return res.json([
        {
          _id: 'claim1',
          trigger_type: 'rain',
          claim_amount: 7000,
          status: 'paid',
          created_at: new Date(Date.now() - 2*24*60*60*1000)
        },
        {
          _id: 'claim2',
          trigger_type: 'heat',
          claim_amount: 7000,
          status: 'approved',
          created_at: new Date(Date.now() - 1*24*60*60*1000)
        }
      ]);
    }

    const claims = await Claim.find({ user_id: req.user_id })
      .sort({ created_at: -1 })
      .populate('policy_id');

    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get claim details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id).populate('policy_id');

    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }

    if (claim.user_id.toString() !== req.user_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
