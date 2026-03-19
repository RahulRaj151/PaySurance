# API_TEST_GUIDE.md - Test All Endpoints

# Paysurance AI - API Testing Guide

Complete guide to test all API endpoints using cURL, Postman, or insomnia.

## 🔧 Setup

### Base URLs
```
Backend API:  http://localhost:5000
AI Service:   http://localhost:8000
```

### Headers (for protected endpoints)
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔐 Authentication Endpoints

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Worker",
    "phone": "+91 9876543210",
    "email": "test@paysurance.com",
    "password": "test@123",
    "delivery_platform": "swiggy",
    "weekly_income": 5000
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Test Worker",
    "email": "test@paysurance.com",
    "phone": "+91 9876543210"
  }
}
```

**Save the token** for subsequent API calls.

---

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@paysurance.com",
    "password": "demo@123"
  }'
```

**Response:**
```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Demo User",
    "email": "demo@paysurance.com",
    "is_admin": false
  }
}
```

---

### 3. Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Test Worker",
  "email": "test@paysurance.com",
  "phone": "+91 9876543210",
  "delivery_platform": "swiggy",
  "location": null,
  "weekly_income": 5000,
  "wallet_balance": 0,
  "is_admin": false
}
```

---

## 📋 Policy Endpoints

### 4. Create Insurance Policy
```bash
curl -X POST http://localhost:5000/api/policy/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "coverage_amount": 10000
  }'
```

**Response:**
```json
{
  "message": "Policy created successfully",
  "policy": {
    "_id": "507f1f77bcf86cd799439012",
    "user_id": "507f1f77bcf86cd799439011",
    "premium": 75,
    "base_premium": 50,
    "risk_score": 45,
    "coverage_amount": 10000,
    "status": "active",
    "start_date": "2024-03-19T10:00:00Z",
    "end_date": "2024-03-26T10:00:00Z",
    "premium_explanation": "Base: ₹50 + Risk Adjustment: ₹25 (High rainfall risk zone)"
  }
}
```

---

### 5. Get Active Policy
```bash
curl -X GET http://localhost:5000/api/policy \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "message": "No active policy",
  "policy": {
    "_id": "507f1f77bcf86cd799439012",
    "premium": 75,
    "coverage_amount": 10000,
    "status": "active"
  }
}
```

---

### 6. Get All Policies
```bash
curl -X GET http://localhost:5000/api/policy/history/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "premium": 75,
    "coverage_amount": 10000,
    "status": "active",
    "created_at": "2024-03-19T10:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "premium": 65,
    "coverage_amount": 8000,
    "status": "expired",
    "created_at": "2024-03-12T10:00:00Z"
  }
]
```

---

## 🎯 Claims Endpoints

### 7. Trigger/Create Claim
```bash
curl -X POST http://localhost:5000/api/claim/trigger \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trigger_type": "rain",
    "trigger_value": 45,
    "threshold_value": 30
  }'
```

**Response:**
```json
{
  "message": "Claim processed",
  "claim": {
    "_id": "507f1f77bcf86cd799439014",
    "user_id": "507f1f77bcf86cd799439011",
    "policy_id": "507f1f77bcf86cd799439012",
    "claim_amount": 7000,
    "trigger_type": "rain",
    "trigger_value": 45,
    "threshold_value": 30,
    "status": "approved",
    "fraud_check": {
      "fraud_score": 25,
      "is_fraudulent": false,
      "fraud_reasons": []
    },
    "created_at": "2024-03-19T10:05:00Z",
    "approved_at": "2024-03-19T10:05:00Z"
  }
}
```

---

### 8. Get User Claims
```bash
curl -X GET http://localhost:5000/api/claim \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "claim_amount": 7000,
    "trigger_type": "rain",
    "status": "paid",
    "created_at": "2024-03-19T10:05:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439015",
    "claim_amount": 7000,
    "trigger_type": "heat",
    "status": "approved",
    "created_at": "2024-03-19T10:10:00Z"
  }
]
```

---

### 9. Get Claim Details
```bash
curl -X GET http://localhost:5000/api/claim/507f1f77bcf86cd799439014 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "user_id": "507f1f77bcf86cd799439011",
  "policy_id": "507f1f77bcf86cd799439012",
  "claim_amount": 7000,
  "trigger_type": "rain",
  "status": "paid",
  "fraud_check": {
    "fraud_score": 25,
    "is_fraudulent": false
  }
}
```

---

## 🌍 Weather & Data Endpoints

### 10. Get Weather Data
```bash
curl -X GET "http://localhost:5000/api/weather/check?latitude=28.6139&longitude=77.2090&city=Delhi"
```

**Response:**
```json
{
  "temperature": 42.5,
  "rainfall": 2.3,
  "humidity": 65,
  "description": "Partly cloudy",
  "city": "Delhi",
  "timestamp": "2024-03-19T10:15:00Z"
}
```

---

### 11. Get AQI Data
```bash
curl -X GET "http://localhost:5000/api/weather/aqi?latitude=28.6139&longitude=77.2090&city=Delhi"
```

**Response:**
```json
{
  "aqi": 156,
  "pm25": 85,
  "pm10": 120,
  "no2": 45,
  "o3": 60,
  "city": "Delhi",
  "timestamp": "2024-03-19T10:15:00Z"
}
```

---

## 💳 Wallet Endpoints

### 12. Get Wallet Balance
```bash
curl -X GET http://localhost:5000/api/wallet/balance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "balance": 14000,
  "currency": "INR"
}
```

---

### 13. Get Transaction History
```bash
curl -X GET http://localhost:5000/api/wallet/transactions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439016",
    "amount": 7000,
    "payment_type": "claim_payout",
    "status": "success",
    "transaction_id": "TXN-1711084500000",
    "created_at": "2024-03-19T10:05:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439017",
    "amount": 7000,
    "payment_type": "claim_payout",
    "status": "success",
    "transaction_id": "TXN-1711084800000",
    "created_at": "2024-03-19T10:10:00Z"
  }
]
```

---

### 14. Recharge Wallet
```bash
curl -X POST http://localhost:5000/api/wallet/recharge \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000
  }'
```

**Response:**
```json
{
  "message": "Wallet recharged",
  "balance": 19000,
  "transaction": {
    "_id": "507f1f77bcf86cd799439018",
    "amount": 5000,
    "transaction_id": "RECHARGE-1711084900000",
    "status": "success"
  }
}
```

---

## 👨‍💼 Admin Endpoints (Require Admin Auth)

### 15. Get Analytics
```bash
curl -X GET http://localhost:5000/api/admin/analytics \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
{
  "totalUsers": 25,
  "activePolicies": 18,
  "totalClaims": {
    "total": 42,
    "approved": 35,
    "rejected": 3,
    "pending": 4
  },
  "claimsByType": [
    { "_id": "rain", "count": 15 },
    { "_id": "heat", "count": 12 },
    { "_id": "flood", "count": 8 },
    { "_id": "pollution", "count": 7 }
  ],
  "totalPayout": 245000,
  "highRiskUsers": [...]
}
```

---

### 16. Get All Users
```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Raj Kumar",
    "email": "raj@paysurance.com",
    "phone": "+91 9876543210",
    "delivery_platform": "swiggy",
    "weekly_income": 5000,
    "wallet_balance": 14000
  },
  ...
]
```

---

### 17. Get All Claims (with filter)
```bash
# Get all pending claims
curl -X GET "http://localhost:5000/api/admin/claims?status=pending" \
  -H "Authorization: Bearer ADMIN_TOKEN"

# Get all claims (any status)
curl -X GET http://localhost:5000/api/admin/claims \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "user_id": { "name": "Raj Kumar", "email": "raj@paysurance.com" },
    "claim_amount": 7000,
    "trigger_type": "rain",
    "status": "pending",
    "fraud_check": {
      "fraud_score": 25,
      "is_fraudulent": false
    }
  },
  ...
]
```

---

### 18. Review Claim (Approve/Reject)
```bash
curl -X POST http://localhost:5000/api/admin/claims/507f1f77bcf86cd799439014/review \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved",
    "notes": "Claim verified. Weather data confirmed."
  }'
```

**Response:**
```json
{
  "message": "Claim approved",
  "claim": {
    "_id": "507f1f77bcf86cd799439014",
    "status": "approved",
    "notes": "Claim verified. Weather data confirmed.",
    "approved_at": "2024-03-19T10:20:00Z"
  }
}
```

---

## 🤖 AI Service Endpoints

### 19. Get AI Service Health
```bash
curl -X GET http://localhost:8000/health
```

**Response:**
```json
{
  "status": "AI service running"
}
```

---

### 20. Calculate Risk Score
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

**Response:**
```json
{
  "risk_score": 58,
  "premium_adjustment": 29,
  "explanation": "Base: ₹50 + Risk Adjustment: ₹29 (High rainfall risk zone, High-risk city: Delhi)"
}
```

---

### 21. Fraud Detection Check
```bash
curl -X POST http://localhost:8000/fraud-check \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "507f1f77bcf86cd799439011",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "trigger_type": "rain",
    "claim_history": 2
  }'
```

**Response:**
```json
{
  "fraud_score": 25,
  "is_fraudulent": false,
  "fraud_reasons": []
}
```

---

## 🧪 Complete Testing Workflow

### Scenario: Register → Create Policy → Trigger Claim

```bash
# 1. Register
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+91 9999999999",
    "email": "test@test.com",
    "password": "test@123",
    "delivery_platform": "swiggy",
    "weekly_income": 5000
  }' | jq -r '.token')

# 2. Create Policy
curl -X POST http://localhost:5000/api/policy/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"coverage_amount": 10000}'

# 3. Trigger Claim
curl -X POST http://localhost:5000/api/claim/trigger \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "trigger_type": "rain",
    "trigger_value": 45,
    "threshold_value": 30
  }'

# 4. Get Claims
curl -X GET http://localhost:5000/api/claim \
  -H "Authorization: Bearer $TOKEN"

# 5. Check Wallet
curl -X GET http://localhost:5000/api/wallet/balance \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Expected Test Results

### Successful Registration
- Status: 201 Created
- Response includes JWT token
- User data returned

### Successful Policy Creation
- Status: 201 Created
- Premium calculated (₹50-120)
- Risk explanation provided

### Successful Claim
- Status: 201 Created
- Fraud check completed
- Status: "approved" if clean
- Wallet updated

### Admin Operations
- Status: 200 OK
- Analytics returned
- Claims listed with status

---

## ✅ Verification Checklist

After running tests, verify:
- [ ] All endpoints return correct status codes
- [ ] Response data matches expected format
- [ ] JWT tokens work for protected routes
- [ ] Database records created properly
- [ ] Admin-only endpoints reject regular users
- [ ] Error messages are clear
- [ ] Timestamps are correct

---

## 🚨 Common Test Issues

**"Unauthorized" Error**
```
Issue: Invalid or missing token
Fix: Use token from register/login response
```

**"Not Found" Error**
```
Issue: Wrong endpoint URL
Fix: Check endpoint path and HTTP method
```

**"CORS Error"**
```
Issue: Frontend calling API incorrectly
Fix: Ensure Content-Type header is set
```

---

## 📚 Using Postman

1. Create new collection "Paysurance AI"
2. Set variable `{{base_url}}` = http://localhost:5000
3. Set variable `{{token}}` = (get from login response)
4. Create requests for each endpoint
5. Use `{{base_url}}/api/auth/login` format in URLs
6. Set Bearer token in Authorization tab

---

## 🎯 Performance Testing

```bash
# Load test: 100 requests
for i in {1..100}; do
  curl -X POST http://localhost:5000/api/policy/create \
    -H "Authorization: Bearer YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"coverage_amount": 10000}' &
done
wait

# Response time should be < 200ms
# Success rate should be 100%
```

---

## 📝 Notes

- Replace `YOUR_TOKEN` with actual JWT token from login
- Replace `ADMIN_TOKEN` with admin user's token
- All timestamps are in ISO 8601 format
- All amounts are in Indian Rupees (₹)
- Claim amount is always 70% of coverage amount

---

**"When Work Stops, Pay Doesn't" - Paysurance AI** 🛡️
