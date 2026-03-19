@echo off
REM Paysurance AI - Complete Setup Script for Windows
REM This script sets up all three services (frontend, backend, AI service)

echo.
echo  Paysurance AI - Setup Script
echo  ============================
echo.

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js 16+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do echo Node.js found: %%i

REM Check npm
where npm >nul 2>nul
if errorlevel 1 (
    echo npm is not installed.
    pause
    exit /b 1
)

REM Check Python
where python >nul 2>nul
if errorlevel 1 (
    echo Python 3 is not installed. AI service requires Python 3.9+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python -v') do echo Python found: %%i

echo.
echo Setting up Backend...
cd backend
call npm install
echo Backend dependencies installed
cd ..

echo.
echo Setting up Frontend...
cd frontend
call npm install
echo Frontend dependencies installed
cd ..

echo.
echo Setting up AI Service...
cd ai-service
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
echo AI Service dependencies installed
cd ..

echo.
echo ✓ Setup Complete!
echo.
echo Next Steps:
echo 1. Start MongoDB (if using locally)
echo.
echo 2. In Terminal 1 - Start Backend:
echo    cd backend ^&^& npm run dev
echo.
echo 3. In Terminal 2 - Start Frontend:
echo    cd frontend ^&^& npm run dev
echo.
echo 4. In Terminal 3 - Start AI Service:
echo    cd ai-service ^&^& venv\Scripts\activate.bat ^&^& python main.py
echo.
echo 5. Open http://localhost:3000 in your browser
echo.
echo Demo Credentials:
echo Email: demo@paysurance.com
echo Password: demo@123
echo.
pause
