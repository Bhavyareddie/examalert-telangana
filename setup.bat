@echo off
echo ============================================
echo  ExamAlert Telangana - Setup Script
echo ============================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (echo ERROR: Backend install failed & exit /b 1)
echo Backend dependencies installed!
echo.

echo [2/4] Installing frontend dependencies...
cd ..\frontend
npm install
if %errorlevel% neq 0 (echo ERROR: Frontend install failed & exit /b 1)
echo Frontend dependencies installed!
echo.

echo [3/4] Setting up environment files...
cd ..\backend
if not exist .env (
  copy .env.example .env
  echo Created backend\.env - Please fill in your credentials!
) else (
  echo backend\.env already exists
)

cd ..\frontend
if not exist .env.local (
  copy .env.example .env.local
  echo Created frontend\.env.local - Please fill in your credentials!
) else (
  echo frontend\.env.local already exists
)

echo.
echo [4/4] Setup complete!
echo.
echo ============================================
echo  NEXT STEPS:
echo ============================================
echo.
echo 1. Create a FREE Supabase project at https://supabase.com
echo    - Copy Project URL and anon key
echo    - Run backend\migrations\001_init.sql in SQL Editor
echo    - Enable Google OAuth in Authentication settings
echo.
echo 2. Get FREE Gemini API key at https://makersuite.google.com
echo.
echo 3. Fill in backend\.env with your credentials
echo    Fill in frontend\.env.local with your credentials
echo.
echo 4. Start development servers:
echo    Terminal 1: cd backend ^&^& npm run dev
echo    Terminal 2: cd frontend ^&^& npm run dev
echo.
echo 5. Open http://localhost:3000 in your browser
echo.
echo See DEPLOYMENT.md for production deployment guide.
echo ============================================
cd ..
