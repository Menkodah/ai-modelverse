@echo off
echo ========================================
echo ModelVerse Cloud Deployment Helper
echo ========================================
echo.

echo Your ModelVerse project is ready for deployment!
echo.
echo Follow these steps to deploy your website:
echo.

echo 1. DEPLOY FRONTEND TO VERCEL:
echo    - Go to: https://vercel.com
echo    - Sign up with GitHub
echo    - Click "New Project"
echo    - Import: Menkodah/ai-modelverse
echo    - Root Directory: frontend
echo    - Framework: Next.js
echo    - Click "Deploy"
echo.

echo 2. DEPLOY BACKEND TO RAILWAY:
echo    - Go to: https://railway.app
echo    - Sign up with GitHub
echo    - Click "New Project"
echo    - Deploy from GitHub repo
echo    - Select: ai-modelverse
echo    - Directory: backend
echo    - Click "Deploy"
echo.

echo 3. DEPLOY ML ENGINE TO RAILWAY:
echo    - Create another Railway project
echo    - Deploy from GitHub repo
echo    - Select: ai-modelverse
echo    - Directory: ml-engine
echo    - Click "Deploy"
echo.

echo Your website will be live in minutes!
echo.
echo Frontend URL: https://your-project.vercel.app
echo Backend URL: https://your-backend.railway.app
echo ML Engine URL: https://your-ml-engine.railway.app
echo.

pause
