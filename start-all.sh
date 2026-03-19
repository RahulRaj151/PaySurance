#!/bin/bash

# Paysurance AI - Quick Server Startup Script
# Run this after initial setup to start all services

echo "🛡️ Paysurance AI - Starting All Services..."
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check MongoDB
echo -e "${BLUE}Checking MongoDB...${NC}"
if check_port 27017; then
    echo -e "${GREEN}✓ MongoDB running on port 27017${NC}"
else
    echo -e "${YELLOW}⚠️ MongoDB not detected on port 27017${NC}"
    echo "Start MongoDB with: mongod"
    echo "Or use: mongosh mongodb+srv://..."
fi

echo ""
echo -e "${BLUE}Starting Backend Server...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo "   http://localhost:5000"
cd ..

echo ""
echo -e "${BLUE}Starting Frontend Server...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo "   http://localhost:3000"
cd ..

echo ""
echo -e "${BLUE}Starting AI Service...${NC}"
cd ai-service
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
python main.py &
AI_PID=$!
echo -e "${GREEN}✓ AI Service started (PID: $AI_PID)${NC}"
echo "   http://localhost:8000"
echo "   Docs: http://localhost:8000/docs"
cd ..

echo ""
echo -e "${GREEN}🎉 All services running!${NC}"
echo ""
echo -e "${BLUE}Endpoints:${NC}"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  AI:       http://localhost:8000"
echo ""
echo -e "${YELLOW}To stop all services, press Ctrl+C${NC}"

# Wait for user interrupt
wait
