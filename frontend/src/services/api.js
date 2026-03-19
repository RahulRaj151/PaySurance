// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = {
  // Auth
  register: (data) =>
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  login: (email, password) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(r => r.json()),

  getCurrentUser: (token) =>
    fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  // Policy
  createPolicy: (data, token) =>
    fetch(`${API_BASE_URL}/policy/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  getActivePolicy: (token) =>
    fetch(`${API_BASE_URL}/policy`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  getPolicies: (token) =>
    fetch(`${API_BASE_URL}/policy/history/all`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  // Claims
  triggerClaim: (data, token) =>
    fetch(`${API_BASE_URL}/claim/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  getClaims: (token) =>
    fetch(`${API_BASE_URL}/claim`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  // Weather
  getWeather: (lat, lon, city) =>
    fetch(`${API_BASE_URL}/weather/check?latitude=${lat}&longitude=${lon}&city=${city}`)
      .then(r => r.json()),

  getAQI: (lat, lon, city) =>
    fetch(`${API_BASE_URL}/weather/aqi?latitude=${lat}&longitude=${lon}&city=${city}`)
      .then(r => r.json()),

  // Wallet
  getWalletBalance: (token) =>
    fetch(`${API_BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  getTransactions: (token) =>
    fetch(`${API_BASE_URL}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  rechargeWallet: (amount, token) =>
    fetch(`${API_BASE_URL}/wallet/recharge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    }).then(r => r.json()),

  // Admin
  getAnalytics: (token) =>
    fetch(`${API_BASE_URL}/admin/analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  getUsers: (token) =>
    fetch(`${API_BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  getAllClaims: (token, status) =>
    fetch(`${API_BASE_URL}/admin/claims${status ? `?status=${status}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json()),

  reviewClaim: (claimId, status, notes, token) =>
    fetch(`${API_BASE_URL}/admin/claims/${claimId}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, notes }),
    }).then(r => r.json()),
};

export default api;
