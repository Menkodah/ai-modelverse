@echo off
echo ========================================
echo ModelVerse AI Model Maker PRO Setup
echo ========================================
echo.

echo Installing root dependencies...
npm install

echo.
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo Installing backend dependencies...
cd backend
npm install
cd ..

echo.
echo Installing ML engine dependencies...
cd ml-engine
pip install -r requirements.txt
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy .env.example to .env and configure your settings
echo 2. Set up your database (PostgreSQL + Redis)
echo 3. Run 'npm run dev' to start all services
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000
echo ML Engine: http://localhost:8001
echo.
pause
