# AI Service - Paysurance AI

FastAPI-based microservice for risk scoring and fraud detection.

## 🤖 Features

- **Risk Scoring**: Calculate premium based on location and conditions
- **Fraud Detection**: Advanced anomaly detection for claim validation
- **Real-time Processing**: Fast inference on claim events
- **Extensible**: Easy to integrate ML models

## 📦 Dependencies

```
fastapi==0.104.0
uvicorn==0.24.0
pydantic==2.4.0
python-multipart==0.0.6
```

## 🚀 Quick Start

### Installation

```bash
# Create virtual environment
python -m venv venv

# Activate
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running

```bash
# Development with auto-reload
python main.py

# Or with uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

**API available at**: http://localhost:8000
**Interactive docs**: http://localhost:8000/docs (Swagger UI)

## 📚 API Endpoints

### Health Check
```
GET /health

Response: { "status": "AI service running" }
```

### Risk Score Calculation
```
POST /risk-score

Request Body:
{
  "latitude": 28.6139,
  "longitude": 77.2090,
  "city": "Delhi",
  "weekly_income": 5000
}

Response:
{
  "risk_score": 45,
  "premium_adjustment": 25,
  "explanation": "Base: ₹50 + Risk Adjustment: ₹25 (High rainfall risk zone, High-risk city: Delhi)"
}
```

### Fraud Detection
```
POST /fraud-check

Request Body:
{
  "user_id": "507f1f77bcf86cd799439011",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "trigger_type": "rain",
  "claim_history": 2
}

Response:
{
  "fraud_score": 25,
  "is_fraudulent": false,
  "fraud_reasons": []
}
```

## 🧠 Risk Scoring Logic

### Factors Considered

1. **Location-Based Risk**
   - High-risk zones (28-32°N latitude): +30 risk, +20 premium
   - High-risk cities: +15 risk, +10 premium

2. **Income-Based**
   - Weekly income > ₹10,000: +10 risk, +5 premium

3. **Seasonal Factors**
   - Random seasonal adjustment: +5-15 risk, +2.5-7.5 premium

### Formula
```
Risk Score = Location Factor + City Factor + Income Factor + Seasonal Factor
Premium Adjustment = Base (₹50) + Risk Multiplier (0.5-70 adjustment)

Min: ₹50/week
Max: ₹120/week
```

### High-Risk Cities
- Delhi
- Mumbai
- Bangalore
- Hyderabad

### Example Calculation
```
User: Raj Kumar in Delhi, ₹5000/week

Risk Factors:
- Location (Delhi region): +30 risk
- City (Delhi): +15 risk
- Income moderate: +0
- Seasonal: +8 risk
= 53 risk score

Premium: ₹50 + (₹20+₹10+₹4) = ₹84/week
```

## 🔍 Fraud Detection Logic

### Scoring System

| Factor | Points | Condition |
|--------|--------|-----------|
| Excessive Claims | +25 | > 10 claims |
| Multiple Claims | +15 | 5-10 claims |
| Unusual Location | +10 | Location anomaly |
| Rare Trigger Type | +8 | Uncommon event |
| Behavioral Anomaly | +5 | Random detection |

### Thresholds
```
fraud_score <= 50: LEGITIMATE (auto-approve)
fraud_score > 50: FRAUDULENT (requires review)
```

### Example Analysis
```
User: Kumar with 12 claims in 30 days, Rain trigger

Fraud Factors:
- Claim history (12 claims): +25
- Location pattern: +0
- Trigger type (rain): +0
- Anomaly: +0
= 25 fraud score

Result: LEGITIMATE (< 50) → Auto-approved
```

### Example - Fraudulent Case
```
User: Suspicious account, 15 claims, Flood trigger (rare)

Fraud Factors:
- Claim history (15 claims): +25
- Unusual location: +10
- Rare trigger (flood): +8
- Anomaly detected: +5
= 48 fraud score (borderline)

Result: BORDERLINE → Manual review
```

## 🏗️ Architecture

```
FastAPI Server
├── Request Validation (Pydantic)
├── Risk Calculation Engine
├── Fraud Detection Engine
└── Response Formatting
```

### Data Models

```python
class RiskScoreRequest(BaseModel):
    latitude: float
    longitude: float
    city: str
    weekly_income: float

class RiskScoreResponse(BaseModel):
    risk_score: float           # 0-100
    premium_adjustment: float   # ₹0-70
    explanation: str           # Human-readable

class FraudCheckRequest(BaseModel):
    user_id: str
    latitude: float
    longitude: float
    trigger_type: str
    claim_history: int

class FraudCheckResponse(BaseModel):
    fraud_score: float          # 0-100
    is_fraudulent: bool
    fraud_reasons: list         # Empty if legitimate
```

## 🔄 Integration with Backend

Backend calls this service:

```javascript
// In backend/routes/policy.js
const aiResponse = await axios.post(
  `${process.env.AI_SERVICE_URL}/risk-score`,
  {
    latitude: user.location.latitude,
    longitude: user.location.longitude,
    city: user.location.city,
    weekly_income: user.weekly_income,
  }
);

const riskScore = aiResponse.data.risk_score;
const premium = 50 + aiResponse.data.premium_adjustment;
```

```javascript
// In backend/routes/claim.js
const fraudResponse = await axios.post(
  `${process.env.AI_SERVICE_URL}/fraud-check`,
  {
    user_id: req.user_id,
    latitude: user.location.latitude,
    longitude: user.location.longitude,
    trigger_type: trigger_type,
    claim_history: claimCount,
  }
);

if (fraudResponse.data.fraud_score > 50) {
  claim.status = 'rejected';
}
```

## 🧪 Testing

### Test with cURL

**Risk Score:**
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

**Fraud Check:**
```bash
curl -X POST http://localhost:8000/fraud-check \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "507f1f77bcf86cd799439011",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "trigger_type": "rain",
    "claim_history": 3
  }'
```

### Test with Python

```python
import requests

# Risk Score
response = requests.post(
    'http://localhost:8000/risk-score',
    json={
        'latitude': 28.6139,
        'longitude': 77.2090,
        'city': 'Delhi',
        'weekly_income': 5000
    }
)
print(response.json())

# Fraud Check
response = requests.post(
    'http://localhost:8000/fraud-check',
    json={
        'user_id': '507f1f77bcf86cd799439011',
        'latitude': 28.6139,
        'longitude': 77.2090,
        'trigger_type': 'rain',
        'claim_history': 2
    }
)
print(response.json())
```

## 🚀 Production Deployment

### Environment Setup
```bash
# Create .env for secrets (optional)
export AI_SERVICE_URL=https://ai-api.paysurance.com

# Or configure environment:
export PYTHONUNBUFFERED=1
```

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY main.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t paysurance-ai .
docker run -p 8000:8000 paysurance-ai
```

### Cloud Deployment

**Railway.app:**
```bash
# Push to GitHub
git push origin main

# Connect repository on Railway
# Set PORT=8000
# Deploy
```

**Render:**
```
Service: Manual Flask/FastAPI
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port 8000
```

**Heroku:**
```bash
heroku create paysurance-ai
git push heroku main
```

## 🔐 Error Handling

All endpoints handle errors gracefully:

```python
try:
    # Process request
except Exception as err:
    return {"error": str(err)}
```

HTTP Status Codes:
- `200` - Success
- `422` - Validation Error
- `500` - Server Error

## 📈 Performance Optimization

### Current Implementation
- Synchronous processing
- In-memory calculations
- < 100ms response time

### Future Enhancements
- ML model integration (sklearn, PyTorch)
- Caching with Redis
- Async processing
- Batch prediction endpoints
- Request rate limiting

## 🎓 ML Integration Guide

### Adding a Risk Model

```python
import pickle
from sklearn.ensemble import RandomForestRegressor

# Load pre-trained model
model = pickle.load(open('risk_model.pkl', 'rb'))

@app.post("/risk-score")
def calculate_risk_score(request: RiskScoreRequest):
    # Prepare features
    features = [[
        request.latitude,
        request.longitude,
        request.weekly_income,
    ]]
    
    # Predict
    risk_score = model.predict(features)[0]
    
    return RiskScoreResponse(
        risk_score=risk_score,
        premium_adjustment=risk_score * 0.7,
        explanation=f"ML Model Prediction: {risk_score:.1f}"
    )
```

###Adding a Fraud Model

```python
import joblib

# Load fraud detection model
fraud_model = joblib.load('fraud_model.joblib')

@app.post("/fraud-check")
def fraud_detection(request: FraudCheckRequest):
    features = [[
        request.claim_history,
        hash_location(request.latitude, request.longitude),
        trigger_risk[request.trigger_type],
    ]]
    
    fraud_probability = fraud_model.predict_proba(features)[0][1]
    fraud_score = fraud_probability * 100
    
    return FraudCheckResponse(
        fraud_score=fraud_score,
        is_fraudulent=fraud_score > 50,
        fraud_reasons=["ML Model flagged"] if rand_score > 50 else []
    )
```

## 📚 API Documentation

Interactive API docs available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

FastAPI auto-generates documentation from type hints and docstrings.

## 🐛 Troubleshooting

**Module not found error:**
```bash
pip install -r requirements.txt
```

**Port already in use:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
uvicorn main:app --port 8001
```

**Slow response:**
- Check if MongoDB is running
- Verify network connection to backend
- Profile with print statements

## 📖 Related Files

- **Backend**: `/backend/`
- **Frontend**: `/frontend/`
- **Main README**: `/README.md`

---

"When Work Stops, Pay Doesn't" - Paysurance AI
