import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Card, Input, Button, Navbar } from '../components/UI';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    delivery_platform: 'swiggy',
    weekly_income: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.register(formData);
      if (response.token) {
        login(response.user, response.token);
        navigate('/dashboard');
      } else {
        setError(response.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <Navbar />
      <div className="max-w-md mx-auto mt-10">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <form onSubmit={handleRegister}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            <Input
              label="Phone Number"
              placeholder="+91 90000 00000"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
            />
            <Input
              label="Email"
              placeholder="your@email.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            <Input
              label="Password"
              placeholder="Strong password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Delivery Platform
              </label>
              <select
                name="delivery_platform"
                value={formData.delivery_platform}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="swiggy">Swiggy</option>
                <option value="zomato">Zomato</option>
                <option value="amazon">Amazon</option>
                <option value="blinkit">Blinkit</option>
                <option value="other">Other</option>
              </select>
            </div>

            <Input
              label="Weekly Income (₹)"
              placeholder="5000"
              type="number"
              value={formData.weekly_income}
              onChange={handleChange}
              name="weekly_income"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <Button
              variant="primary"
              onClick={handleRegister}
              disabled={loading}
              className="w-full mb-4"
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};
