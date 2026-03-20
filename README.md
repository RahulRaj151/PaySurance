# Paysurance AI 🛡️

**When Work Stops, Pay Doesn't**

An AI-powered parametric insurance platform protecting gig delivery workers (Swiggy, Zomato, Amazon, Blinkit) from income loss due to external disruptions like heavy rain, floods, extreme heat, and pollution.

**Status**: 🚀 Live & Fully Functional - Demo Accounts Bypass DB (Mongo Connected)

## 📊 Project Overview

Paysurance AI is a full-stack insurance platform designed for gig workers:
- **Automatic income protection** from weather disruptions
- **AI-based risk assessment** for fair premiums
- **Parametric claims** that trigger automatically on real weather events
- **Instant payouts** with fraud detection
- **Real-time dashboards** for workers and admins

## 🎯 Core Features

- ✅ **Automatic Claims**: Parametric triggers based on real weather conditions
- ✅ **AI Risk Scoring**: Intelligent premium calculation using location and income
- ✅ **Fraud Detection**: Advanced anomaly detection to prevent fraudulent claims
- ✅ **Instant Payouts**: Automatic wallet credits upon claim approval
- ✅ **Real-time Analytics**: Comprehensive dashboards for workers and admins
- ✅ **Demo Simulation**: Test weather events and see claims process in real-time
- ✅ **JWT Authentication**: Secure login/registration system
- ✅ **Weekly Pricing**: Flexible weekly insurance plans
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Admin Dashboard**: Full platform management and analytics

## 🏗️ Tech Stack

### Frontend
- React 18 (JavaScript only - no TypeScript)
- Vite (Fast development server & build)
- TailwindCSS (Responsive design)
- Chart.js + react-chartjs-2 (Data visualization)
- React Router (Client-side navigation)
- Axios (HTTP client)

### Backend
- Node.js (Runtime)
- Express.js (REST API framework)
- MongoDB with Mongoose (Database)
- JWT (Authentication & authorization)
- bcryptjs (Password hashing)
- node-cron (Scheduled jobs - parametric triggers)
- Axios (External API calls)
- CORS (Cross-origin support)

### AI Service
- FastAPI (Python web framework)
- Pydantic (Data validation)
- Uvicorn (ASGI server)
- Built-in risk scoring and fraud detection

## 📁 Project Structure

```
PaySurance/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── pages/          # Pages (Login, Register, Dashboard, Policy, Admin)
│   │   ├── components/     # Reusable UI components (Button, Card, Badge, etc.)
│   │   ├── services/       # API client (api.js)
│   │   ├── context/        # Auth context (AuthContext.jsx)
│   │   ├── utils/          # Utilities
│   │   ├── main.jsx        # React Router setup
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                 # Express.js + MongoDB
│   ├── models/            # Mongoose schemas (User, Policy, Claim, Payment)
│   ├── routes/            # API endpoints (auth, policy, claim, weather, admin, wallet)
│   ├── middleware/        # Auth middleware
│   ├── services/          # Business logic
│   ├── server.js          # Express server entry
│   └── package.json
└── ai-service/            # FastAPI
    ├── main.py           # Risk scoring & fraud detection endpoints
    └── requirements.txt
```

## 🚀 Quick Start (Complete Setup)

### Prerequisites
- Node.js 16+ with npm
- Python 3.9+
- MongoDB 5.0+ (local or MongoDB Atlas)

### One-Click Setup (Windows Recommended)

```
.\setup.bat
```

**Auto-installs all Node deps, Python venv (if Python installed).**

### Manual Setup

#### Step 1️⃣: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# .env auto-created with mongodb://localhost:27017/paysurance

# Start backend server
npm run dev
# Backend runs on http://localhost:5000 (`MongoDB connected`)
```

### Step 2️⃣: Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:3000
```

### Step 3️⃣: AI Service Setup

```bash
# In a new terminal, navigate to ai-service
cd ai-service

# Create and activate Python virtual environment
python -m venv venv

# Activate (choose based on your OS)
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
# Or: uvicorn main:app --reload
# AI service runs on http://localhost:8000
```

### Step 4️⃣: MongoDB Setup (if using local)

```bash
# Start MongoDB
mongod

# Or, use MongoDB Atlas and update MONGODB_URI in backend/.env
```

### ✅ All Services Running!

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **AI Service**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Swagger)

## 💻 Demo Credentials

### Worker Account
```
Email: demo@paysurance.com
Password: demo@123
```

### Admin Account
```
Email: admin@paysurance.com
Password: admin@123
```

## 📱 Application Walkthrough

### 1. Homepage
Visit http://localhost:3000 to see the landing page with features and call-to-action.

### 2. Register
Create a new worker account with:
- Name
- Phone Number
- Email
- Password
- Delivery Platform (Swiggy, Zomato, Amazon, Blinkit)
- Weekly Income

### 3. Login
Login with email and password. JWT token stored in localStorage.

### 4. Dashboard
Worker dashboard with:
- **Active Policy**: Shows premium, coverage, and risk explanation
- **Wallet Balance**: Current earnings/credits
- **Claims History**: Table of all claims with status
- **Charts**: Claims by type and balance vs coverage
- **Demo Buttons**: Simulate weather events to test claims

### 5. Create Policy
Click "Create Policy" to:
- Set coverage amount
- See AI-calculated premium
- Understand risk factors
- Create weekly insurance plan

### 6. Simulate Claims
Click demo buttons to:
- 🌧️ **Simulate Heavy Rain** (>30mm) → Auto-claim generated
- 🔥 **Simulate Extreme Heat** (>45°C) → Auto-claim generated
- Watch claim appear in history
- See wallet balance increase

### 7. Admin Dashboard
Login as admin to view:
- **KPIs**: Total users, active policies, claims, payouts
- **Charts**: Claims by type and status breakdown
- **Pending Claims**: Review and approve/reject suspicious claims
- **High-Risk Users**: Monitor users with high risk scores

## 📊 API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new worker
- `POST /api/auth/login` - Login worker
- `GET /api/auth/me` - Get current user (protected)

### Policies
- `POST /api/policy/create` - Create insurance policy (protected)
- `GET /api/policy` - Get active policy (protected)
- `GET /api/policy/history/all` - Get all user policies (protected)

### Claims
- `POST /api/claim/trigger` - Create parametric claim (protected)
- `GET /api/claim` - Get user claims (protected)
- `GET /api/claim/:id` - Get claim details (protected)

### Weather & Data
- `GET /api/weather/check` - Get weather data (mock or real)
- `GET /api/weather/aqi` - Get air quality index (mock or real)

### Wallet Management
- `GET /api/wallet/balance` - Get wallet balance (protected)
- `GET /api/wallet/transactions` - Get transactions (protected)
- `POST /api/wallet/recharge` - Add money to wallet (protected)

### Admin (Admin Auth Required)
- `GET /api/admin/analytics` - Get platform analytics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/claims` - Get all claims with filter
- `POST /api/admin/claims/:id/review` - Approve/reject claims

### AI Service
- `GET /health` - Service health check
- `POST /risk-score` - Calculate premium and risk
- `POST /fraud-check` - Detect fraudulent claims

## 🤖 How Parametric Insurance Works

### 1. Policy Creation
Worker selects coverage amount → Backend calls AI service → Premium calculated based on risk → Policy stored in database

### 2. Automatic Monitoring
Every 10 minutes, the parametric trigger engine:
- Fetches all active policies
- Gets weather data for each location
- Checks against thresholds:
  - **Rain > 30mm** → Claim triggered
  - **Temperature > 45°C** → Claim triggered
  - **AQI > 300** → Claim triggered (extensible)

### 3. Automatic Processing
When trigger conditions met:
- Creates claim in database
- Runs fraud detection AI
- If fraud_score < 50 → Auto-approve
- If fraud_score ≥ 50 → Mark pending for admin review
- Approved claims → Payout to wallet instantly

### 4. Claim Approval Flow
```
Trigger Event → Create Claim → Fraud Check → Approve/Reject → Payout → Update Wallet
```

## 🧠 AI Risk Scoring Example

```
Worker: Raj Kumar, Delhi, ₹5000/week

Risk Factors:
- Location (North India): +30 risk points
- City (Delhi): +15 risk points
- Income (₹5000): +5 risk points
- Seasonal factor: +8 risk points
= 58 total risk score

Premium Calculation:
- Base premium: ₹50
- Risk adjustment: ₹50 × (58/100) = ₹29
- Final: ₹50 + ₹29 = ₹79/week

Explanation: "Base: ₹50 + Risk Adjustment: ₹29 
(High rainfall risk zone, High-risk city: Delhi, Moderate income)"
```

## 🔍 Fraud Detection Example

```
Suspicious Claim:
- User: Kumar with 15 claims in 1 month
- Trigger: Flood (rare event)
- Location: Unusual pattern

Fraud Scoring:
- Excessive claims (>10): +25 points
- Rare trigger type: +8 points
- Unusual location: +10 points
= Fraud score: 43 (Borderline)

Result: Sent to admin for manual review
```

## 🔐 Security Features

- **JWT Tokens**: 7-day expiry, cryptographically signed
- **Password Hashing**: bcrypt (salt rounds: 10)
- **Protected Routes**: All sensitive endpoints require valid JWT
- **Admin Verification**: Role-based access control
- **CORS Protection**: Configured for cross-origin requests
- **Fraud Detection**: AI-based anomaly detection
- **GPS Verification**: Location validation for claims

## 📊 Database Collections

### User
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String (unique),
  email: String (unique),
  password: String (bcrypt hashed),
  delivery_platform: String,
  location: { latitude, longitude, city },
  weekly_income: Number,
  working_hours: Number,
  wallet_balance: Number,
  active_policy_id: ObjectId,
  is_admin: Boolean,
  created_at: Date,
  updated_at: Date
}
```

### Policy
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  premium: Number,
  base_premium: Number,
  risk_score: Number,
  coverage_amount: Number,
  status: String (active|inactive|expired|cancelled),
  start_date: Date,
  end_date: Date,
  risk_factors: { rainfall, temperature, pollution, flood_risk },
  premium_explanation: String,
  created_at: Date,
  updated_at: Date
}
```

### Claim
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  policy_id: ObjectId,
  claim_amount: Number,
  trigger_type: String (rain|heat|flood|pollution),
  trigger_value: Number,
  threshold_value: Number,
  location: { latitude, longitude, city },
  status: String (pending|approved|rejected|paid),
  fraud_check: { fraud_score, is_fraudulent, fraud_reasons },
  created_at: Date,
  approved_at: Date,
  paid_at: Date
}
```

### Payment
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  claim_id: ObjectId,
  policy_id: ObjectId,
  amount: Number,
  payment_type: String (claim_payout|premium_payment),
  status: String (pending|success|failed),
  transaction_id: String (unique),
  created_at: Date,
  updated_at: Date
}
```

## 📈 Frontend Pages

### Public Pages
- **HomePage** (`/`) - Marketing, features, CTAs
- **LoginPage** (`/login`) - Worker/admin login
- **RegisterPage** (`/register`) - New account registration

### Protected Pages (Require Auth)
- **DashboardPage** (`/dashboard`) - Worker main portal with:
  - Policy details card
  - Wallet balance display
  - Claims history table
  - Demo simulation buttons
  - Claims by type and balance charts
  
- **PolicyPage** (`/policy`) - Create new policies
  
- **AdminPage** (`/admin`) - Admin analytics dashboard with:
  - KPI cards (6 metrics)
  - Claims by trigger type chart
  - Claims status breakdown
  - Pending claims review table
  - Manual claim approval modal
  - High-risk users list

## 🎨 UI Components

Reusable components in `frontend/src/components/UI.jsx`:

- **Navbar** - Header with logo and user menu
- **Card** - Container component with shadow
- **Button** - Multiple variants (primary, secondary, success, danger, outline)
- **Badge** - Status indicator badges
- **Input** - Form input field with label
- **Loading** - Animated spinner

All styled with TailwindCSS for responsive design.

## 📊 Charts & Visualization

Using Chart.js with react-chartjs-2:

- **Bar Chart**: Claims by trigger type (rain, heat, flood, etc.)
- **Doughnut Chart**: Wallet balance vs coverage amount
- **Line Chart**: (Extensible for trends over time)

Charts auto-update when new claims are created.

## 🧪 Testing the App

### Quick Test Flow:
1. Open http://localhost:3000
2. Click "Register"
3. Fill form with test data
4. Verify success message and auto-login
5. Create a policy (coverage amount: ₹10000)
6. See premium calculated based on risk
7. Click "Simulate Heavy Rain" button
8. Observe:
   - Claim created in database
   - Fraud check run
   - Auto-approved
   - Wallet credited with ₹7000 (70% of coverage)
   - Claim appears in history table
9. Create multiple policies and test claims
10. Login as admin to see analytics

## 🚨 Common Issues & Fixes

### Backend won't start
```bash
# Error: Cannot find module 'mongoose'
npm install

# Error: MongoDB connection failed
# Option 1: Start local MongoDB
mongod

# Option 2: Use MongoDB Atlas
# Update MONGODB_URI in backend/.env to:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/paysurance

# Error: Port 5000 already in use
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Frontend can't connect to backend
```bash
# Error: CORS error or 404 not found
# Ensure backend is running on :5000
# Check API_BASE_URL in frontend/src/services/api.js

# Debug tips:
# 1. Check backend console for errors
# 2. Open Network tab in DevTools
# 3. Verify .env variables
```

### AI Service not responding
```bash
# Error: AI_SERVICE_URL connection failed
# Ensure FastAPI running on :8000
python main.py

# Backend will fallback to default premiums if AI service unavailable
# You can still test without AI service
```

### MongoDB connection issues
```bash
# Local MongoDB not starting
# Install: brew install mongodb-community (Mac) or apt-get (Linux)
# Start: brew services start mongodb-community

# Atlas issues
# Check connection string has correct credentials
# Add IP to whitelist on MongoDB Atlas console
```

## 🚀 Production Deployment

### Frontend (Vercel recommended)
```bash
cd frontend
npm run build
# Deploy `dist` folder to Vercel/Netlify
```

### Backend (Heroku recommended)
```bash
cd backend
# Create Procfile
echo "web: npm start" > Procfile
git push heroku main
```

### AI Service (Railway recommended)
```bash
cd ai-service
# Push to GitHub
git push origin main
# Deploy from Railway dashboard
```

### Environment Variables (Production)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<strong-random-secret>
OPENWEATHER_API_KEY=<your-key>
AQI_API_KEY=<your-key>
AI_SERVICE_URL=https://ai-api.paysurance.com
RAZORPAY_KEY_ID=rzp_live_key
RAZORPAY_KEY_SECRET=<your-secret>
NODE_ENV=production
```

## 📖 Detailed Documentation

- **[Backend README](./backend/README.md)** - API routes, models, architecture
- **[Frontend README](./frontend/README.md)** - Pages, components, styling
- **[AI Service README](./ai-service/README.md)** - Risk scoring, fraud detection

## 🎯 Features Implemented

✅ Worker registration & login (JWT)
✅ Profile management (phone, platform, income)
✅ Weekly insurance policies with AI pricing
✅ Automatic parametric claim triggers
✅ Weather-based risk assessment
✅ Fraud detection with anomaly scoring
✅ Instant claim payouts
✅ Wallet system with transactions
✅ Real-time dashboards
✅ Admin analytics & claim reviews
✅ Demo simulation features
✅ Responsive mobile design
✅ Full documentation

## 🎓 Learning Outcomes

This project demonstrates:
- **Full-stack development**: Frontend, backend, AI integration
- **Real-time systems**: Parametric triggers and automatic processing
- **Machine learning integration**: Risk scoring and fraud detection
- **Database design**: Normalized schema for insurance platform
- **Authentication**: JWT-based security
- **API design**: RESTful endpoints with proper error handling
- **DevOps**: Environment configuration and deployment
- **UI/UX**: Responsive design with modern tools

## 🤝 Contributing

This is a hackathon project. To contribute:
1. Create a feature branch
2. Make changes
3. Test locally
4. Submit pull request

## 📝 License

MIT License - Feel free to use for learning and projects

## 📞 Support

for issues or questions:
1. Check the Troubleshooting section above
2. Review console logs for errors
3. Check README files in each directory
4. Verify all services are running on correct ports

---

## 🎉 You're Ready!

Everything is set up. Start developing and building amazing features!

**"When Work Stops, Pay Doesn't" - Paysurance AI** 🛡️
