import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Card, Button, Badge, Loading, Navbar } from '../components/UI';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

export const DashboardPage = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [policy, setPolicy] = useState(null);
  const [claims, setClaims] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [loading, setLoading] = useState(true);
  const [simulationLoading, setSimulationLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const policyData = await api.getActivePolicy(token);
        setPolicy(policyData.policy);

        const claimsData = await api.getClaims(token);
        setClaims(claimsData);

        const walletData = await api.getWalletBalance(token);
        setWallet(walletData.balance);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const handleSimulateRain = async () => {
    setSimulationLoading(true);
    try {
      const response = await api.triggerClaim(
        {
          trigger_type: 'rain',
          trigger_value: 45,
          threshold_value: 30,
        },
        token
      );

      setClaims(prev => [response.claim, ...prev]);
      setWallet(prev => prev + response.claim.claim_amount);

      alert('🌧️ Heavy rain triggered! Auto-claim created and approved.');
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setSimulationLoading(false);
    }
  };

  const handleSimulateHeat = async () => {
    setSimulationLoading(true);
    try {
      const response = await api.triggerClaim(
        {
          trigger_type: 'heat',
          trigger_value: 48,
          threshold_value: 45,
        },
        token
      );

      setClaims(prev => [response.claim, ...prev]);
      setWallet(prev => prev + response.claim.claim_amount);

      alert('🔥 Extreme heat triggered! Auto-claim created and approved.');
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setSimulationLoading(false);
    }
  };

  if (loading) return <Loading />;

  const approvedClaims = claims.filter(c => c.status === 'approved' || c.status === 'paid').length;
  const pendingClaims = claims.filter(c => c.status === 'pending').length;
  const totalCoverage = policy ? policy.coverage_amount : 0;

  const claimsByType = claims.reduce((acc, claim) => {
    acc[claim.trigger_type] = (acc[claim.trigger_type] || 0) + 1;
    return acc;
  }, {});

  const claimsChartData = {
    labels: Object.keys(claimsByType),
    datasets: [
      {
        label: 'Claims by Type',
        data: Object.values(claimsByType),
        backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981'],
      },
    ],
  };

  const walletChartData = {
    labels: ['Balance', 'Coverage'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [wallet, totalCoverage],
        backgroundColor: ['#10b981', '#6b7280'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Worker Dashboard</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <p className="text-gray-600 text-sm">Active Policy</p>
            <p className="text-3xl font-bold text-blue-600">
              {policy ? '✓' : '✗'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {policy ? `Premium: ₹${policy.premium}/week` : 'No active policy'}
            </p>
          </Card>

          <Card>
            <p className="text-gray-600 text-sm">Wallet Balance</p>
            <p className="text-3xl font-bold text-green-600">₹{wallet}</p>
            <p className="text-xs text-gray-500 mt-2">Available for withdrawal</p>
          </Card>

          <Card>
            <p className="text-gray-600 text-sm">Coverage</p>
            <p className="text-3xl font-bold text-blue-600">
              ₹{totalCoverage.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">Per week</p>
          </Card>

          <Card>
            <p className="text-gray-600 text-sm">Claims Approved</p>
            <p className="text-3xl font-bold text-green-600">{approvedClaims}</p>
            <p className="text-xs text-gray-500 mt-2">{pendingClaims} pending</p>
          </Card>
        </div>

        {/* Policy Details */}
        {policy && (
          <Card className="mb-6">
            <h3 className="text-lg font-bold mb-4">Active Policy</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Premium</p>
                <p className="text-2xl font-bold">₹{policy.premium}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Coverage</p>
                <p className="text-2xl font-bold">₹{policy.coverage_amount}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <Badge variant="success">{policy.status}</Badge>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Explanation</p>
                <p className="text-sm font-medium">{policy.premium_explanation}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Demo Simulation */}
        <Card className="mb-6 bg-yellow-50 border-2 border-yellow-300">
          <h3 className="text-lg font-bold mb-4">🎯 Demo Simulation</h3>
          <p className="text-sm text-gray-700 mb-4">
            Trigger weather events to test automatic claim generation and payouts:
          </p>
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={handleSimulateRain}
              disabled={simulationLoading || !policy}
            >
              🌧️ Simulate Heavy Rain
            </Button>
            <Button
              variant="danger"
              onClick={handleSimulateHeat}
              disabled={simulationLoading || !policy}
            >
              🔥 Simulate Extreme Heat
            </Button>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <h3 className="text-lg font-bold mb-4">Claims by Type</h3>
            {Object.keys(claimsByType).length > 0 ? (
              <Bar data={claimsChartData} />
            ) : (
              <p className="text-gray-500 text-center py-8">No claims yet</p>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-4">Balance vs Coverage</h3>
            <Doughnut data={walletChartData} />
          </Card>
        </div>

        {/* Recent Claims */}
        <Card>
          <h3 className="text-lg font-bold mb-4">Recent Claims</h3>
          {claims.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No claims yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.slice(0, 5).map(claim => (
                    <tr key={claim._id} className="border-t">
                      <td className="px-4 py-2">
                        {new Date(claim.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 capitalize">{claim.trigger_type}</td>
                      <td className="px-4 py-2 font-bold">₹{claim.claim_amount}</td>
                      <td className="px-4 py-2">
                        <Badge
                          variant={
                            claim.status === 'paid'
                              ? 'success'
                              : claim.status === 'pending'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {claim.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
