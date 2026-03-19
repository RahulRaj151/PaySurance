# Frontend - Paysurance AI

React + Vite single-page application for Paysurance insurance platform.

## 🎨 Features

- Authentication (Register, Login)
- Worker dashboard with real-time stats
- Policy creation & management
- Claim visualization
- Demo weather simulation
- Admin analytics dashboard
- Wallet management
- Responsive design with TailwindCSS
- Data visualization with Chart.js

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "axios": "^1.3.0",
  "chart.js": "^4.2.0",
  "react-chartjs-2": "^5.2.0",
  "date-fns": "^2.29.0"
}
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens on http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx    # Landing page
│   │   ├── LoginPage.jsx   # Login form
│   │   ├── RegisterPage.jsx # Registration form
│   │   ├── DashboardPage.jsx # Worker dashboard
│   │   ├── PolicyPage.jsx  # Policy creation
│   │   └── AdminPage.jsx   # Admin dashboard
│   ├── components/         # Reusable components
│   │   └── UI.jsx         # Button, Card, Badge, Input, etc.
│   ├── services/          # API integration
│   │   └── api.js         # Axios API client
│   ├── context/           # React Context
│   │   └── AuthContext.jsx # Authentication context
│   ├── utils/             # Utilities
│   ├── main.jsx           # React Router setup
│   └── index.css          # Global styles
├── tailwind.config.js     # TailwindCSS configuration
├── vite.config.js         # Vite configuration
└── index.html             # HTML entry point
```

## 🎯 Pages

### HomePage
- Feature showcase
- Coverage information
- Call-to-action buttons
- Marketing content

### LoginPage
- Email/password login
- Form validation
- Error handling
- Link to register page

### RegisterPage
- Full registration form
- Delivery platform selection
- Weekly income input
- Password confirmation

### DashboardPage (Protected)
- Active policy details
- Wallet balance
- Claims history
- Claims by trigger type chart
- Balance vs coverage doughnut chart
- Demo simulation buttons:
  - 🌧️ Simulate Heavy Rain
  - 🔥 Simulate Extreme Heat

### PolicyPage (Protected)
- Coverage amount input
- Premium calculator
- Policy creation form
- Success confirmation

### AdminPage (Protected)
- Analytics KPIs (6 metrics)
- Claims by trigger type chart
- Claim status breakdown
- Pending claims table
- Claim review modal
- High-risk users list

## 🧩 UI Components

All components in `src/components/UI.jsx`:

### Navbar
```jsx
<Navbar user={user} onLogout={logout} />
```
- Logo and tagline
- User name display
- Logout button

### Card
```jsx
<Card className="...">
  Content here
</Card>
```
- Rounded container with shadow
- Consistent padding

### Button
```jsx
<Button 
  variant="primary|secondary|success|danger|outline"
  onClick={handleClick}
  disabled={false}
>
  Click me
</Button>
```

### Badge
```jsx
<Badge variant="primary|success|warning|danger">
  Status text
</Badge>
```

### Input
```jsx
<Input
  label="Label"
  placeholder="..."
  type="text|email|password|number"
  value={value}
  onChange={handleChange}
/>
```

### Loading
```jsx
<Loading />
```
- Animated spinner

## 🔐 Authentication Flow

1. **Register Page**
   - User enters details
   - POST to `/api/auth/register`
   - Receive JWT token
   - Store in localStorage
   - Redirect to dashboard

2. **Login Page**
   - User enters email/password
   - POST to `/api/auth/login`
   - Receive JWT token
   - Store in localStorage
   - Redirect to dashboard

3. **Protected Routes**
   - Check for token in AuthContext
   - Redirect to login if missing
   - Include token in API headers

## 📡 API Integration

API client in `src/services/api.js`:

```javascript
// All API calls go through this file
import api from '../services/api';

// Example usage
const response = await api.login(email, password);
const policy = await api.getActivePolicy(token);
const claims = await api.getClaims(token);
```

### API Methods

**Auth**
- `register(data)` - User registration
- `login(email, password)` - User login
- `getCurrentUser(token)` - Fetch user profile

**Policy**
- `createPolicy(data, token)` - Create new policy
- `getActivePolicy(token)` - Get current policy
- `getPolicies(token)` - Get all policies

**Claims**
- `triggerClaim(data, token)` - Create/trigger claim
- `getClaims(token)` - Get user's claims

**Weather**
- `getWeather(lat, lon, city)` - Get weather data
- `getAQI(lat, lon, city)` - Get air quality

**Wallet**
- `getWalletBalance(token)` - Check balance
- `getTransactions(token)` - Get transaction history
- `rechargeWallet(amount, token)` - Add to wallet

**Admin**
- `getAnalytics(token)` - Get platform analytics
- `getUsers(token)` - Get all users
- `getAllClaims(token, status)` - Get claims by status
- `reviewClaim(claimId, status, notes, token)` - Review claim

## 🎨 Styling

Uses **TailwindCSS** utility classes:

```jsx
<div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card className="bg-white rounded-lg shadow-md p-6">
    <p className="text-gray-600 text-sm">Label</p>
    <p className="text-3xl font-bold text-blue-600">₹5000</p>
  </Card>
</div>
```

**Responsive Breakpoints:**
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

## 📊 Charts

Using Chart.js with react-chartjs-2:

```jsx
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ... } from 'chart.js';

// Register components
ChartJS.register(...);

// Use in component
<Bar data={chartData} />
<Doughnut data={chartData} />
<Line data={chartData} />
```

## 🎭 Demo Simulation

Buttons on dashboard to test claim flow:

```jsx
<Button onClick={handleSimulateRain}>
  🌧️ Simulate Heavy Rain
</Button>
```

**Flow:**
1. Click button
2. Backend creates claim with trigger_type
3. AI checks fraud score
4. Auto-approves if clean
5. Wallet credited instantly
6. UI updates in real-time
7. Toast notification shows amount

## 🔒 Protected Routes

Using React Router and AuthContext:

```jsx
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## 🚀 Environment Variables

Create `.env` file (optional):

```
VITE_API_URL=http://localhost:5000/api
```

Or use default:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## 🧪 Testing

### Test User Flow
1. Register new account
2. See registration success
3. Auto-login
4. View dashboard
5. Create policy
6. Simulate rain event
7. Check claim in history
8. Verify wallet increased

### Test Admin Flow
1. Login as admin (is_admin: true)
2. Navigate to /admin
3. View analytics
4. See pending claims table
5. Review claims
6. Approve/reject claims

## 📱 Mobile Responsive

All pages are mobile-friendly:
- Touch-friendly buttons (min 44px)
- Single column layout on mobile
- Responsive navigation
- Mobile-optimized forms

```jsx
// Example responsive grid
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* 1 col on mobile, 4 cols on desktop */}
</div>
```

## 🎨 Theming

TailwindCSS with custom colors:

```javascript
// tailwind.config.js
colors: {
  primary: '#2563eb',
  secondary: '#1e40af',
  success: '#10b981',
  danger: '#ef4444',
}
```

## 🛠️ Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR for fast development:
- Edit component → Instant update
- No full page reload

### Console Debugging
```javascript
// API debugging
console.log('Response:', response);

// Component state
console.log('User:', user);
```

### Browser DevTools
- React DevTools extension
- Network tab for API calls
- Application tab for localStorage

## 🚀 Production Build

```bash
# Build optimized bundle
npm run build

# Creates dist/ folder
# Files ready for deployment

# Test the build
npm run preview
```

## 📦 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir dist
```

### Manual
```bash
# Build
npm run build

# Upload dist/ to your server
# Configure 404.html → index.html for SPA routing
```

## ⚡ Performance Optimization

- Code splitting via React Router
- Lazy loading components
- Optimized images
- Vite's tree-shaking
- CSS minification
- JS bundling

## 🐛 Troubleshooting

**Backend not responding**
```javascript
// Check VITE_API_URL
// Ensure backend runs on :5000
// Check CORS is enabled
```

**Charts not rendering**
```javascript
// Import ChartJS components
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ... } from 'chart.js';

// Register before using
ChartJS.register(...);
```

**localStorage not persisting**
```javascript
// Check browser privacy settings
// Use AuthContext for state management
// Data persists across page reloads
```

## 📖 Related Files

- **Backend**: `/backend/`
- **AI Service**: `/ai-service/`
- **Main README**: `/README.md`

---

"When Work Stops, Pay Doesn't" - Paysurance AI
