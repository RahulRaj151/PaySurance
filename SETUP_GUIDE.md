# SETUP_GUIDE.md - Complete Setup Instructions

# Paysurance AI Setup Guide

## 🎯 Objective
This guide walks you through setting up the complete Paysurance AI application with all three services running.

## 📋 Prerequisites

Before starting, ensure you have:

### 1. Node.js & npm
```bash
# Check version (should be 16+)
node --version
npm --version

# Download from: https://nodejs.org/
```

### 2. Python
```bash
# Check version (should be 3.9+)
python --version
# or
python3 --version

# Download from: https://www.python.org/
```

### 3. MongoDB
Choose one option:

**Option A: Local MongoDB**
```bash
# macOS (using Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu/Debian)
sudo apt-get install mongodb

# Windows
# Download from: https://www.mongodb.com/try/download/community
```

**Option B: MongoDB Atlas Cloud (Recommended for production)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update MONGODB_URI in backend/.env

## 🚀 Automatic Setup (Easy)

### Linux/Mac
```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh

# Then follow the instructions
```

### Windows
```bash
# Double-click setup.bat
# Or run in Command Prompt:
setup.bat
```

The script will:
- ✅ Check prerequisites
- ✅ Install all npm dependencies
- ✅ Create Python virtual environment
- ✅ Install Python packages

## 🔧 Manual Setup (Step-by-Step)

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# .env file is already pre-configured
# Edit if needed (change MONGODB_URI, JWT_SECRET)

# Start backend
npm run dev
```

**Backend should print:**
```
MongoDB connected
Server running on port 5000
```

### Step 2: Frontend Setup

Open NEW terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

**Frontend should print:**
```
VITE v4.x.x  ready in 500ms
Local:   http://localhost:3000/
```

### Step 3: AI Service Setup

Open ANOTHER NEW terminal window:
```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate.bat

# Install dependencies
pip install -r requirements.txt

# Start AI service
python main.py
# or
uvicorn main:app --reload
```

**AI Service should print:**
```
Uvicorn running on http://0.0.0.0:8000
```

### Step 4: Verify All Services

Open browser:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/health
- **AI Swagger Docs**: http://localhost:8000/docs

Each should return success response.

## 🎮 First Test

### Register a New Account

1. Open http://localhost:3000
2. Click "Register"
3. Fill in the form:
   ```
   Name: Test User
   Phone: +91 9876543210
   Email: test@paysurance.com
   Password: test@123
   Delivery Platform: Swiggy
   Weekly Income: 5000
   ```
4. Click "Register"
5. You should be logged in and see the dashboard

### Create a Policy

1. Click "Create Policy" in left menu (or go to /policy)
2. Set coverage amount: 10000
3. Click "Create Policy"
4. See AI-calculated premium displayed
5. Policy should be created successfully

### Simulate a Weather Event

1. On Dashboard, click "🌧️ Simulate Heavy Rain"
2. Watch the magic:
   - Claim created in database
   - Fraud detection runs
   - Auto-approved if clean
   - Wallet credited
   - Appears in claims list
3. Repeat with "🔥 Simulate Extreme Heat"

### Check as Admin

1. Logout
2. Login as admin:
   ```
   Email: admin@paysurance.com
   Password: admin@123
   ```
3. Go to http://localhost:3000/admin
4. See all analytics, users, claims
5. Review pending claims

## 🗄️ Database Setup

### Using Local MongoDB

MongoDB should auto-create database on first connection.

**Verify:**
```bash
# Connect to MongoDB
mongosh

# List databases
show databases

# Switch to paysurance
use paysurance

# Show collections
show collections

# View users
db.users.find().pretty()
```

### Using MongoDB Atlas

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/paysurance?retryWrites=true&w=majority
   ```
4. Update in `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/paysurance
   ```
5. Restart backend server

## 📝 Environment Variables

### Backend (.env already created)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paysurance
JWT_SECRET=your_secret_key_change_in_production
OPENWEATHER_API_KEY=optional_key
AQI_API_KEY=optional_key
AI_SERVICE_URL=http://localhost:8000
RAZORPAY_KEY_ID=rzp_test_key
RAZORPAY_KEY_SECRET=rzp_test_secret
NODE_ENV=development
```

### Frontend (Optional, uses defaults)
```env
VITE_API_URL=http://localhost:5000/api
```

### AI Service (No .env needed, works out of box)

## 🧪 Testing APIs with cURL

### Register a user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+91 9999999999",
    "email": "test@test.com",
    "password": "test@123",
    "delivery_platform": "swiggy",
    "weekly_income": 5000
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test@123"
  }'
```

### Get user profile (replace TOKEN)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test AI Risk Scoring
```bash
curl -X POST http://localhost:8000/risk-score \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 28.6139,
    "longitude": 77.2090,
    "city": "Delhi",
    "weekly_income": 5000
  }'
```

## 🆘 Troubleshooting

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Fix:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### Cannot Connect to MongoDB

**Error:** `MongooseError: Cannot connect to MongoDB`

**Fix:**
1. Start MongoDB:
   ```bash
   mongod
   ```
2. Or switch to MongoDB Atlas:
   - Update MONGODB_URI in backend/.env
   - Use connection string from Atlas console

### Python Virtual Environment Issues

**Error:** `pip: command not found`

**Fix:**
```bash
# Recreate venv
rm -rf venv
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate.bat  # Windows

pip install -r requirements.txt
```

### Frontend Can't reach Backend

**Error:** `Error: Cannot POST /api/auth/login` (in console)

**Fix:**
1. Check backend is running: http://localhost:5000/health
2. Check VITE_API_URL in frontend/.env or api.js
3. Check CORS is enabled in backend

### AI Service Not Responding

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:8000`

**Fix:**
1. Check AI service is running: http://localhost:8000/health
2. Start AI service in new terminal:
   ```bash
   cd ai-service
   source venv/bin/activate
   python main.py
   ```
3. Backend will fall back to defaults if AI unavailable

## 📱 Using the Application

### Worker Flow
1. Register account
2. Create insurance policy
3. See premium based on AI risk score
4. Simulate weather events (demo buttons)
5. View auto-generated claims
6. Check wallet balance

### Admin Flow
1. Login with admin credentials
2. View analytics dashboard
3. See high-risk users
4. Review pending claims
5. Approve/reject suspicious claims

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to strong random string
- [ ] Update MongoDB URI to production database
- [ ] Set NODE_ENV=production
- [ ] Get real API keys:
  - [ ] OpenWeather API key
  - [ ] AQI API key
  - [ ] Razorpay production keys
- [ ] Enable HTTPS
- [ ] Configure CORS properly (restrict origins)
- [ ] Set up error logging (Sentry, etc.)
- [ ] Configure email service for notifications
- [ ] Test all authentication flows
- [ ] Load test the application
- [ ] Set up monitoring and alerts

## 📞 Getting Help

1. Check error messages in terminal
2. Review browser console (F12)
3. Check Network tab for API errors
4. Review README files in each folder
5. Check for typos in URLs and env variables

## 🎉 Success!

Once all three services are running and you can:
- ✅ Register and login
- ✅ Create a policy
- ✅ Simulate claims
- ✅ See data on dashboard
- ✅ Access admin panel

**You're ready to build amazing features!**

---

## Next Steps

1. **Customize the UI**
   - Change colors in tailwind.config.js
   - Update component designs

2. **Add Real APIs**
   - Connect to OpenWeather API
   - Connect to Razorpay payment gateway
   - Add real email notifications

3. **Extend Features**
   - Add more trigger types
   - Improve fraud detection model
   - Add mobile app (React Native)
   - Add email notifications

4. **Deploy**
   - Deploy frontend to Vercel
   - Deploy backend to Heroku/Railway
   - Deploy AI service to Railway/Render

---

**"When Work Stops, Pay Doesn't" - Paysurance AI** 🛡️
