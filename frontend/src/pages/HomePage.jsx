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
    <div className="min-h-screen bg-gradient-futuristic dark:bg-gradient-futuristic text-text-light dark:text-text-dark">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16 text-white dark:text-text-dark">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent">
          🛡️ Paysurance AI
        </h1>
        <p className="text-2xl font-semibold mb-6 text-primary-500 dark:text-primary-400">When Work Stops, Pay Doesn't</p>
        <p className="text-lg mb-8 opacity-90 dark:opacity-75">
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
          <Card className="text-left bg-primary-100/10 dark:bg-primary-800/20 border border-primary-500/20">
            <h3 className="text-lg font-bold mb-2 text-primary-400 dark:text-primary-300">🌧️ Auto-Claims</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automatic claims trigger when weather disruptions occur. No paperwork needed.
            </p>
          </Card>

          <Card className="text-left bg-primary-100/10 dark:bg-primary-800/20 border border-primary-500/20">
            <h3 className="text-lg font-bold mb-2 text-primary-400 dark:text-primary-300">🤖 AI Risk Scoring</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Intelligent premium calculation based on location, weather, and pollution levels.
            </p>
          </Card>

          <Card className="text-left bg-primary-100/10 dark:bg-primary-800/20 border border-primary-500/20">
            <h3 className="text-lg font-bold mb-2 text-primary-400 dark:text-primary-300">💰 Instant Payouts</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get paid directly to your wallet when claims are approved.
            </p>
          </Card>

          <Card className="text-left bg-primary-100/10 dark:bg-primary-800/20 border border-primary-500/20">
            <h3 className="text-lg font-bold mb-2 text-primary-400 dark:text-primary-300">📍 Location Smart</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Coverage based on your actual delivery zones and risk factors.
            </p>
          </Card>

          <Card className="text-left bg-primary-100/10 dark:bg-primary-800/20 border border-primary-500/20">
            <h3 className="text-lg font-bold mb-2 text-primary-400 dark:text-primary-300">🔐 Fraud Detection</h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI-based fraud detection keeps the system trust and sustainable.
            </p>
          </Card>

          <Card className="text-left bg-primary-100/10 dark:bg-primary-800/20 border border-primary-500/20">
            <h3 className="text-lg font-bold mb-2 text-primary-400 dark:text-primary-300">📊 Real Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your claims, payouts, and earnings in real-time.
            </p>
          </Card>
        </div>

        {/* Insurance Plans */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-neon bg-clip-text text-transparent">Choose Your Protection Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-2 border-primary-500/30 dark:border-primary-400/30 hover:border-primary-400 dark:hover:border-primary-300 transition-all duration-300 bg-primary-50/5 dark:bg-primary-800/10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-primary-500 dark:text-primary-400 mb-2">Basic Plan</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹50/week</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Coverage: ₹5,000</p>
              </div>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                <li>✓ Weekly income protection</li>
                <li>✓ Weather disruption coverage</li>
                <li>✓ Basic fraud protection</li>
                <li>✓ Mobile app access</li>
              </ul>
              <Button
                variant="outline"
                onClick={() => navigate('/register')}
                className="w-full border-primary-500 text-primary-500 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
              >
                Get Started
              </Button>
            </Card>

            <Card className="text-center border-2 border-secondary-500 bg-secondary-50/10 dark:bg-secondary-900/20 relative shadow-lg shadow-secondary-500/20">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-neon text-primary-900 dark:text-primary-100 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-secondary-500 dark:text-secondary-400 mb-2">Standard Plan</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹75/week</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Coverage: ₹10,000</p>
              </div>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                <li>✓ Everything in Basic</li>
                <li>✓ Higher coverage amount</li>
                <li>✓ Priority claim processing</li>
                <li>✓ Real-time weather alerts</li>
                <li>✓ Advanced analytics</li>
              </ul>
              <Button
                variant="primary"
                onClick={() => navigate('/register')}
                className="w-full bg-secondary-500 hover:bg-secondary-600"
              >
                Get Started
              </Button>
            </Card>

            <Card className="text-center border-2 border-primary-500/30 dark:border-primary-400/30 hover:border-primary-400 dark:hover:border-primary-300 transition-all duration-300 bg-primary-50/5 dark:bg-primary-800/10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-primary-500 dark:text-primary-400 mb-2">Premium Plan</h3>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹100/week</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Coverage: ₹15,000</p>
              </div>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                <li>✓ Everything in Standard</li>
                <li>✓ Maximum coverage</li>
                <li>✓ Instant payout processing</li>
                <li>✓ 24/7 priority support</li>
                <li>✓ Custom risk assessment</li>
              </ul>
              <Button
                variant="outline"
                onClick={() => navigate('/register')}
                className="w-full border-primary-500 text-primary-500 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20"
              >
                Get Started
              </Button>
            </Card>
          </div>
        </div>

        {/* Coverage */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-neon bg-clip-text text-transparent">What We Cover</h2>
          <Card className="bg-primary-50/5 dark:bg-primary-800/10 border border-primary-500/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-3xl mb-2">🌧️</p>
                <p className="font-bold text-primary-600 dark:text-primary-400">Heavy Rain</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">When delivery volumes drop</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🔥</p>
                <p className="font-bold text-primary-600 dark:text-primary-400">Extreme Heat</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Above 45°C temperature</p>
              </div>
              <div>
                <p className="text-3xl mb-2">💨</p>
                <p className="font-bold text-primary-600 dark:text-primary-400">High Pollution</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">AQI above safe limits</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🌊</p>
                <p className="font-bold text-primary-600 dark:text-primary-400">Flood Alerts</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">When areas become inaccessible</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
