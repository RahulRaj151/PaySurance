import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Card, Button, Input, Navbar, Badge } from '../components/UI';

export const PolicyPage = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [policy, setPolicy] = useState(null);
  const [coverageAmount, setCoverageAmount] = useState('10000');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreatePolicy = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.createPolicy(
        { coverage_amount: parseFloat(coverageAmount) },
        token
      );

      setPolicy(response.policy);
      alert('✅ Policy created successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      alert('Error creating policy: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />

      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <h2 className="text-3xl font-bold mb-6">Create Insurance Policy</h2>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">How It Works</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Weekly income protection plan</li>
              <li>✓ Automatic claims on weather disruptions</li>
              <li>✓ Rain, heat, flood, pollution covered</li>
              <li>✓ AI-based risk scoring</li>
            </ul>
          </div>

          <form onSubmit={handleCreatePolicy}>
            <Input
              label="Weekly Coverage Amount (₹)"
              placeholder="10000"
              type="number"
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(e.target.value)}
            />

            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-2">Coverage Breakdown:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Claim Amount (70% of coverage):</span>
                  <span className="font-bold">
                    ₹{Math.round(parseFloat(coverageAmount) * 0.7).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Premium (AI-calculated):</span>
                  <span className="font-bold">₹50-120/week</span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 rounded">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> Premium is calculated based on your location's weather
                risk, pollution levels, and flood potential. Higher risk = higher premium.
              </p>
            </div>

            <Button
              variant="primary"
              onClick={handleCreatePolicy}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating Policy...' : 'Create Policy'}
            </Button>
          </form>

          {policy && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-300">
              <h3 className="font-bold text-green-800 mb-2">✅ Policy Created!</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>Premium: ₹{policy.premium}/week</p>
                <p>Coverage: ₹{policy.coverage_amount}</p>
                <p>Status: <Badge variant="success">{policy.status}</Badge></p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
