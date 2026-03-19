# Backend - Paysurance AI

Express.js REST API for the Paysurance insurance platform.

## 🎯 Features

- Worker authentication (JWT-based)
- Policy creation with AI risk scoring
- Parametric claim triggering
- Fraud detection integration
- Wallet system
- Admin analytics dashboard
- Automatic claim processing

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "dotenv": "^16.0.3",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "axios": "^1.3.0",
  "node-cron": "^3.0.2"
}
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update MongoDB URI and secrets
# MONGODB_URI=mongodb://localhost:27017/paysurance

# Start development server
npm run dev

# Start production server
npm start
```

## 📁 Project Structure

```
backend/
├── models/           # MongoDB schemas
│   ├── User.js      # Worker/admin profile
│   ├── Policy.js    # Insurance policies
│   ├── Claim.js     # Insurance claims
│   └── Payment.js   # Payment transactions
├── routes/          # API endpoints
│   ├── auth.js      # Auth routes (register, login)
│   ├── policy.js    # Policy routes
│   ├── claim.js     # Claim routes
│   ├── weather.js   # Weather data routes
│   ├── admin.js     # Admin routes
│   └── wallet.js    # Wallet routes
├── middleware/      # Express middleware
│   └── auth.js      # JWT verification
├── services/        # Business logic
│   └── claimService.js # Parametric trigger engine
└── server.js        # Application entry point
```

## 📚 API Routes

### Authentication (`POST`)

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Raj Kumar",
  "phone": "+91 9876543210",
  "email": "raj@paysurance.com",
  "password": "password123",
  "delivery_platform": "swiggy",
  "weekly_income": 5000
}

Response: { token, user }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "raj@paysurance.com",
  "password": "password123"
}

Response: { token, user }
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: { user object }
```

### Policy Routes

#### Create Policy
```
POST /api/policy/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "coverage_amount": 10000
}

Response: { policy, message }
```

#### Get Active Policy
```
GET /api/policy
Authorization: Bearer <token>

Response: { policy }
```

#### Get All Policies
```
GET /api/policy/history/all
Authorization: Bearer <token>

Response: [policies]
```

### Claims Routes

#### Trigger Claim
```
POST /api/claim/trigger
Authorization: Bearer <token>
Content-Type: application/json

{
  "trigger_type": "rain|heat|flood|pollution",
  "trigger_value": 45,
  "threshold_value": 30
}

Response: { claim, message }
```

#### Get User Claims
```
GET /api/claim
Authorization: Bearer <token>

Response: [claims]
```

### Wallet Routes

#### Get Balance
```
GET /api/wallet/balance
Authorization: Bearer <token>

Response: { balance, currency }
```

#### Get Transactions
```
GET /api/wallet/transactions
Authorization: Bearer <token>

Response: [transactions]
```

#### Recharge Wallet
```
POST /api/wallet/recharge
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 1000
}

Response: { balance, transaction }
```

### Admin Routes

#### Get Analytics
```
GET /api/admin/analytics
Authorization: Bearer <admin-token>

Response: {
  totalUsers,
  activePolicies,
  totalClaims,
  claimsByType,
  totalPayout,
  highRiskUsers
}
```

#### Get All Claims (with filter)
```
GET /api/admin/claims?status=pending
Authorization: Bearer <admin-token>

Response: [claims]
```

#### Review Claim
```
POST /api/admin/claims/:id/review
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "approved|rejected",
  "notes": "Review notes"
}

Response: { claim, message }
```

## 🔄 Parametric Trigger Engine

Runs every 10 minutes (configured with `node-cron`):

```javascript
cron.schedule('*/10 * * * *', async () => {
  const { triggerParametricClaims } = require('./services/claimService');
  await triggerParametricClaims();
});
```

**Flow:**
1. Fetch all active policies
2. Get weather data for each policy's location
3. Check against trigger thresholds:
   - Rain > 30mm → Trigger "rain" claim
   - Temperature > 45°C → Trigger "heat" claim
4. Run fraud detection on trigger
5. Auto-approve if fraud_score < 50
6. Process payout to user wallet

## 🤖 AI Service Integration

Calls FastAPI service for:

### Risk Scoring
```bash
POST http://localhost:8000/risk-score

Request: {
  latitude: 28.6139,
  longitude: 77.2090,
  city: "Delhi",
  weekly_income: 5000
}

Response: {
  risk_score: 45,
  premium_adjustment: 25,
  explanation: "..."
}
```

### Fraud Detection
```bash
POST http://localhost:8000/fraud-check

Request: {
  user_id: "...",
  latitude: 28.6139,
  longitude: 77.2090,
  trigger_type: "rain",
  claim_history: 2
}

Response: {
  fraud_score: 30,
  is_fraudulent: false,
  fraud_reasons: []
}
```

## 💾 Database Models

### User
- name, phone (unique), email (unique)
- password (bcrypt hashed)
- delivery_platform
- location (geopoint)
- weekly_income
- working_hours
- wallet_balance
- active_policy_id
- is_admin
- timestamps

### Policy
- user_id (FK)
- premium, base_premium
- risk_score
- coverage_amount
- status (active/inactive/expired/cancelled)
- start_date, end_date
- risk_factors (rainfall, temperature, pollution)
- premium_explanation
- timestamps

### Claim
- user_id (FK), policy_id (FK)
- claim_amount
- trigger_type (rain|heat|flood|pollution|curfew|manual)
- trigger_value, threshold_value
- location
- status (pending|approved|rejected|paid)
- fraud_check (score, is_fraudulent, reasons)
- timestamps

### Payment
- user_id (FK)
- claim_id (FK), policy_id (FK)
- amount
- payment_type (claim_payout|premium_payment)
- status (pending|success|failed)
- transaction_id (unique)
- timestamps

## 🔐 Authentication

Uses JWT with signature verification:

```javascript
// Token generation
const token = jwt.sign(
  { user_id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Token verification (middleware)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user_id = decoded.user_id;
```

**Header Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...
```

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+91 9999999999",
    "email": "test@paysurance.com",
    "password": "password123",
    "delivery_platform": "swiggy",
    "weekly_income": 5000
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@paysurance.com",
    "password": "password123"
  }'
```

### Create Policy
```bash
curl -X POST http://localhost:5000/api/policy/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"coverage_amount": 10000}'
```

## 🚨 Error Handling

All endpoints follow consistent error response format:

```javascript
// Success
{ message: "...", data: {...} }

// Error
{ error: "Error message" }
```

HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 📝 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paysurance
JWT_SECRET=your_secret_key_change_in_production
OPENWEATHER_API_KEY=your_openweather_key
AQI_API_KEY=your_aqi_key
AI_SERVICE_URL=http://localhost:8000
RAZORPAY_KEY_ID=rzp_test_key
RAZORPAY_KEY_SECRET=rzp_test_secret
NODE_ENV=development
```

## 🚀 Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Use production MongoDB URI
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure proper CORS origins
- [ ] Add request rate limiting
- [ ] Enable logging
- [ ] Set up error tracking (Sentry)
- [ ] Configure environment-specific settings
- [ ] Test all authentication flows

## 📖 Related Files

- **AI Service**: `/ai-service/main.py`
- **Frontend**: `/frontend/`
- **Main README**: `/README.md`

---

"When Work Stops, Pay Doesn't" - Paysurance AI
