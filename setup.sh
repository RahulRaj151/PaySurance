#!/bin/bash

# Paysurance AI - Complete Setup Script
# This script sets up all three services (frontend, backend, AI service)

echo "🛡️ Paysurance AI - Setup Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js 16+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm -v)${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}⚠️  Python 3 is not installed. AI service requires Python 3.9+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python found: $(python3 --version)${NC}"

echo ""
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
cd ..

echo ""
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
cd ..

echo ""
echo -e "${BLUE}Setting up AI Service...${NC}"
cd ai-service
python3 -m venv venv
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
pip install -r requirements.txt
echo -e "${GREEN}✓ AI Service dependencies installed${NC}"
cd ..

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Start MongoDB (if using locally):"
echo "   mongod"
echo ""
echo "2. In Terminal 1 - Start Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "3. In Terminal 2 - Start Frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. In Terminal 3 - Start AI Service:"
echo "   cd ai-service && source venv/bin/activate && python main.py"
echo ""
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo -e "${YELLOW}Demo Credentials:${NC}"
echo "Email: demo@paysurance.com"
echo "Password: demo@123"
echo ""
echo "Admin: admin@paysurance.com / admin@123"
