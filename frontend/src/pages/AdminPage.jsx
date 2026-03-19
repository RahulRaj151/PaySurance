import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Card, Button, Badge, Loading, Navbar } from '../components/UI';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export const AdminPage = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await api.getAnalytics(token);
        setAnalytics(analyticsData);

        const claimsData = await api.getAllClaims(token, 'pending');
        setClaims(claimsData);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token && user?.is_admin) fetchData();
  }, [token, user?.is_admin]);

  const handleClaimReview = async (status) => {
    if (!selectedClaim) return;

    try {
      await api.reviewClaim(selectedClaim._id, status, reviewNotes, token);
      setClaims(prev => prev.filter(c => c._id !== selectedClaim._id));
      setSelectedClaim(null);
      setReviewNotes('');
      alert(`Claim ${status}!`);
    } catch (err) {
      alert('Error reviewing claim');
    }
  };

  if (!user?.is_admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </Card>
      </div>
    );
  }

  if (loading) return <Loading />;

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <p>No data available</p>
        </Card>
      </div>
    );
  }

  const claimsChartData = {
    labels: analytics.claimsByType.map(c => c._id),
    datasets: [
      {
        label: 'Claims Count',
        data: analytics.claimsByType.map(c => c.count),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{analytics.totalUsers}</p>
          </Card>

          <Card>
            <p className="text-gray-600 text-sm">Active Policies</p>
            <p className="text-3xl font-bold text-green-600">{analytics.activePolicies}</p>
          </Card>

          <Card>
            <p className="text-gray-600 text-sm">Total Claims</p>
            <p className="text-3xl font-bold text-orange-600">{analytics.totalClaims.total}</p>
          </Card>

          <Card>
            <p className="text-gray-600 text-sm">Approved</p>
            <p className="text-3xl font-bold text-green-500">{analytics.totalClaims.approved}</p>
          </Card>

          <Card>
            <p className="text-gray-600 text-sm">Total Payout</p>
            <p className="text-3xl font-bold text-purple-600">₹{analytics.totalPayout.toLocaleString()}</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <h3 className="text-lg font-bold mb-4">Claims by Trigger Type</h3>
            {analytics.claimsByType.length > 0 ? (
              <Bar data={claimsChartData} />
            ) : (
              <p className="text-gray-500 text-center py-8">No claims data</p>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-4">Claim Status Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Approved:</span>
                <Badge variant="success">{analytics.totalClaims.approved}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <Badge variant="warning">{analytics.totalClaims.pending}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Rejected:</span>
                <Badge variant="danger">{analytics.totalClaims.rejected}</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Pending Claims Review */}
        <Card className="mb-6">
          <h3 className="text-lg font-bold mb-4">Pending Claims Review ({claims.length})</h3>

          {claims.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending claims</p>
          ) : (
            <>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">User</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Fraud Score</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map(claim => (
                      <tr key={claim._id} className="border-t">
                        <td className="px-4 py-2">{claim.user_id?.name}</td>
                        <td className="px-4 py-2 capitalize">{claim.trigger_type}</td>
                        <td className="px-4 py-2 font-bold">₹{claim.claim_amount}</td>
                        <td className="px-4 py-2">
                          {claim.fraud_check?.fraud_score}%
                        </td>
                        <td className="px-4 py-2">
                          <Button
                            variant="secondary"
                            onClick={() => setSelectedClaim(claim)}
                            className="text-xs"
                          >
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedClaim && (
                <Card className="bg-blue-50">
                  <h4 className="font-bold mb-4">Review Claim</h4>
                  <div className="space-y-3 mb-4">
                    <p>
                      <strong>User:</strong> {selectedClaim.user_id?.name}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedClaim.trigger_type}
                    </p>
                    <p>
                      <strong>Amount:</strong> ₹{selectedClaim.claim_amount}
                    </p>
                    <p>
                      <strong>Fraud Score:</strong> {selectedClaim.fraud_check?.fraud_score}%
                    </p>
                    <p>
                      <strong>Fraud Reasons:</strong> {selectedClaim.fraud_check?.fraud_reasons?.join(', ') || 'None'}
                    </p>
                  </div>

                  <textarea
                    placeholder="Add review notes"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                    rows="3"
                  />

                  <div className="flex gap-4">
                    <Button
                      variant="success"
                      onClick={() => handleClaimReview('approved')}
                    >
                      ✓ Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleClaimReview('rejected')}
                    >
                      ✗ Reject
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedClaim(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}
            </>
          )}
        </Card>

        {/* High Risk Users */}
        <Card>
          <h3 className="text-lg font-bold mb-4">High-Risk Users</h3>
          {analytics.highRiskUsers.length === 0 ? (
            <p className="text-gray-500">No high-risk users</p>
          ) : (
            <div className="space-y-3">
              {analytics.highRiskUsers.map(policy => (
                <div key={policy._id} className="p-3 bg-red-50 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{policy.user_id?.name}</p>
                      <p className="text-xs text-gray-600">
                        {policy.user_id?.location?.city}
                      </p>
                    </div>
                    <Badge variant="danger">
                      Risk: {policy.risk_score}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
