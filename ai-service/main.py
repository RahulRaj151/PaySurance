from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import math

app = FastAPI(title="Paysurance AI Service", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Risk Score Request
class RiskScoreRequest(BaseModel):
    latitude: float
    longitude: float
    city: str
    weekly_income: float

# Fraud Check Request
class FraudCheckRequest(BaseModel):
    user_id: str
    latitude: float
    longitude: float
    trigger_type: str
    claim_history: int

# Risk Score Response
class RiskScoreResponse(BaseModel):
    risk_score: float
    premium_adjustment: float
    explanation: str

# Fraud Check Response
class FraudCheckResponse(BaseModel):
    fraud_score: float
    is_fraudulent: bool
    fraud_reasons: list

@app.get("/health")
def health():
    return {"status": "AI service running"}

@app.post("/risk-score", response_model=RiskScoreResponse)
def calculate_risk_score(request: RiskScoreRequest):
    """
    Calculate risk score and premium adjustment based on:
    - Location (latitude, longitude)
    - City-specific risk factors
    - Weekly income
    """
    
    base_premium = 50
    risk_score = 0
    premium_adjustment = 0
    reasons = []

    # Simulate weather risk based on location
    # In production, fetch real weather data
    latitude = request.latitude
    longitude = request.longitude

    # High-risk zones (North India, monsoon zones)
    if 28 <= latitude <= 32:  # Delhi-Agra region
        risk_score += 30
        premium_adjustment += 20
        reasons.append("High rainfall risk zone")

    # High-risk cities
    high_risk_cities = ["delhi", "mumbai", "bangalore", "hyderabad"]
    if request.city.lower() in high_risk_cities:
        risk_score += 15
        premium_adjustment += 10
        reasons.append(f"High-risk city: {request.city}")

    # Income-based adjustment
    if request.weekly_income > 10000:
        risk_score += 10
        premium_adjustment += 5
        reasons.append("High weekly income requires higher coverage")

    # Random seasonal factors
    seasonal_factor = random.randint(5, 15)
    risk_score += seasonal_factor
    premium_adjustment += seasonal_factor * 0.5

    # Cap risk score
    risk_score = min(risk_score, 100)
    premium_adjustment = min(premium_adjustment, 70)

    explanation = f"Base: ₹{base_premium} + Risk Adjustment: ₹{int(premium_adjustment)} ({', '.join(reasons)})"

    return RiskScoreResponse(
        risk_score=risk_score,
        premium_adjustment=premium_adjustment,
        explanation=explanation,
    )

@app.post("/fraud-check", response_model=FraudCheckResponse)
def fraud_detection(request: FraudCheckRequest):
    """
    Fraud detection based on:
    - Claim history
    - Location patterns
    - Trigger type frequency
    - Suspicious patterns
    """
    
    fraud_score = 0
    fraud_reasons = []

    # Check claim history frequency
    if request.claim_history > 10:
        fraud_score += 25
        fraud_reasons.append("Excessive claims in short period")
    elif request.claim_history > 5:
        fraud_score += 15
        fraud_reasons.append("Multiple claims detected")

    # Location anomalies (simulate)
    # Check if location is unusual
    location_hash = abs(hash(f"{request.latitude}{request.longitude}")) % 100
    if location_hash < 10:
        fraud_score += 10
        fraud_reasons.append("Unusual location pattern")

    # Trigger type frequency analysis
    trigger_scores = {
        "rain": 5,
        "heat": 10,
        "flood": 15,
        "pollution": 8,
        "curfew": 20,
    }
    
    trigger_score = trigger_scores.get(request.trigger_type, 0)
    if trigger_score > 12:
        fraud_score += 8
        fraud_reasons.append(f"Uncommon trigger type: {request.trigger_type}")

    # Random anomaly detection
    if random.random() > 0.8:
        fraud_score += 5
        fraud_reasons.append("Behavioral anomaly detected")

    # Cap fraud score
    fraud_score = min(fraud_score, 95)
    is_fraudulent = fraud_score > 50

    return FraudCheckResponse(
        fraud_score=fraud_score,
        is_fraudulent=is_fraudulent,
        fraud_reasons=fraud_reasons if is_fraudulent else [],
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
