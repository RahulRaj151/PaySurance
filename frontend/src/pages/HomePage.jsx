import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Card, Button } from '../components/UI';

export const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate(user.is_admin ? '/admin' : '/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">🛡️ Paysurance AI</h1>
        <p className="text-2xl font-semibold mb-6">When Work Stops, Pay Doesn't</p>
        <p className="text-lg mb-8 opacity-90">
          AI-powered parametric insurance protecting gig delivery workers from income loss
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant="success"
            onClick={() => navigate('/login')}
            className="px-8 py-3 text-lg"
          >
            Login
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/register')}
            className="px-8 py-3 text-lg border-white text-white"
          >
            Register
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="text-left">
            <h3 className="text-lg font-bold mb-2 text-blue-600">🌧️ Auto-Claims</h3>
            <p className="text-gray-600">
              Automatic claims trigger when weather disruptions occur. No paperwork needed.
            </p>
          </Card>

          <Card className="text-left">
            <h3 className="text-lg font-bold mb-2 text-blue-600">🤖 AI Risk Scoring</h3>
            <p className="text-gray-600">
              Intelligent premium calculation based on location, weather, and pollution levels.
            </p>
          </Card>

          <Card className="text-left">
            <h3 className="text-lg font-bold mb-2 text-blue-600">💰 Instant Payouts</h3>
            <p className="text-gray-600">
              Get paid directly to your wallet when claims are approved.
            </p>
          </Card>

          <Card className="text-left">
            <h3 className="text-lg font-bold mb-2 text-blue-600">📍 Location Smart</h3>
            <p className="text-gray-600">
              Coverage based on your actual delivery zones and risk factors.
            </p>
          </Card>

          <Card className="text-left">
            <h3 className="text-lg font-bold mb-2 text-blue-600">🔐 Fraud Detection</h3>
            <p className="text-gray-600">
              AI-based fraud detection keeps the system trust and sustainable.
            </p>
          </Card>

          <Card className="text-left">
            <h3 className="text-lg font-bold mb-2 text-blue-600">📊 Real Analytics</h3>
            <p className="text-gray-600">
              Track your claims, payouts, and earnings in real-time.
            </p>
          </Card>
        </div>

        {/* Coverage */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">What We Cover</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-3xl mb-2">🌧️</p>
                <p className="font-bold">Heavy Rain</p>
                <p className="text-sm text-gray-600">When delivery volumes drop</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🔥</p>
                <p className="font-bold">Extreme Heat</p>
                <p className="text-sm text-gray-600">Above 45°C temperature</p>
              </div>
              <div>
                <p className="text-3xl mb-2">💨</p>
                <p className="font-bold">High Pollution</p>
                <p className="text-sm text-gray-600">AQI above safe limits</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🌊</p>
                <p className="font-bold">Flood Alerts</p>
                <p className="text-sm text-gray-600">When areas become inaccessible</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
