import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Card, Input, Button, Navbar } from '../components/UI';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.login(email, password);
      if (response.token) {
        login(response.user, response.token);
        navigate('/dashboard');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">🛡️ Paysurance AI</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">When Work Stops, Pay Doesn't</p>

        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            variant="primary"
            onClick={handleLogin}
            disabled={loading}
            className="w-full mb-4"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </button>
        </p>

        <div className="mt-6 p-4 bg-blue-50 rounded text-xs text-gray-600">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Email: demo@paysurance.com</p>
          <p>Password: demo123</p>
        </div>
      </Card>
    </div>
  );
};
