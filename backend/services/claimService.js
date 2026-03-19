const Claim = require('../models/Claim');
const Policy = require('../models/Policy');
const User = require('../models/User');
const Payment = require('../models/Payment');
const axios = require('axios');

// Parametric trigger engine
const triggerParametricClaims = async () => {
  try {
    console.log('Running parametric trigger check...');

    const activePolicies = await Policy.find({ status: 'active' }).populate(
      'user_id'
    );

    for (const policy of activePolicies) {
      const user = policy.user_id;

      if (!user.location?.latitude || !user.location?.longitude) {
        continue;
      }

      try {
        // Get weather data
        const weatherResponse = await axios.get(
          `http://localhost:5000/api/weather/check?latitude=${user.location.latitude}&longitude=${user.location.longitude}&city=${user.location.city}`
        );

        const weather = weatherResponse.data;

        // Check triggers
        let shouldTrigger = false;
        let triggerType = null;
        let triggerValue = 0;
        let thresholdValue = 0;

        // Rain trigger (> 30mm)
        if (weather.rainfall > 30) {
          shouldTrigger = true;
          triggerType = 'rain';
          triggerValue = weather.rainfall;
          thresholdValue = 30;
        }

        // Heat trigger (> 45°C)
        if (weather.temperature > 45) {
          shouldTrigger = true;
          triggerType = 'heat';
          triggerValue = weather.temperature;
          thresholdValue = 45;
        }

        // If trigger condition met
        if (shouldTrigger) {
          // Check if claim already exists for this policy and trigger today
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const existingClaim = await Claim.findOne({
            policy_id: policy._id,
            trigger_type: triggerType,
            created_at: { $gte: today },
          });

          if (!existingClaim) {
            // Create auto claim
            const claimAmount = Math.round(policy.coverage_amount * 0.7);

            const claim = new Claim({
              user_id: user._id,
              policy_id: policy._id,
              claim_amount: claimAmount,
              trigger_type: triggerType,
              trigger_value: triggerValue,
              threshold_value: thresholdValue,
              location: user.location,
              status: 'pending',
            });

            await claim.save();

            // Auto-approve and payout (for demo)
            claim.status = 'approved';
            claim.approved_at = new Date();
            await claim.save();

            user.wallet_balance += claimAmount;
            await user.save();

            const payment = new Payment({
              user_id: user._id,
              claim_id: claim._id,
              policy_id: policy._id,
              amount: claimAmount,
              payment_type: 'claim_payout',
              status: 'success',
              transaction_id: `AUTO-${Date.now()}`,
            });

            await payment.save();

            claim.status = 'paid';
            claim.paid_at = new Date();
            await claim.save();

            console.log(`Auto-claim created and paid for user ${user._id}`);
          }
        }
      } catch (err) {
        console.error(`Error processing policy ${policy._id}:`, err.message);
      }
    }
  } catch (err) {
    console.error('Parametric trigger error:', err);
  }
};

module.exports = {
  triggerParametricClaims,
};
