@echo off
chcp 65001 >nul
echo ==========================================
echo  کاشێری زیرەک - Windows 7 Builder
echo ==========================================
echo.
echo [INFO] Using Electron 22 for Windows 7 compatibility
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js 16 from: https://nodejs.org/dist/v16.20.2/
    pause
    exit /b 1
)

echo [1/4] Node.js version:
node --version
echo.

IF NOT EXIST "node_modules" (
    echo [2/4] Installing dependencies (first time)...
    call npm install
    IF ERRORLEVEL 1 (
        echo [ERROR] npm install failed!
        echo Try: npm install --legacy-peer-deps
        pause
        exit /b 1
    )
) ELSE (
    echo [2/4] Dependencies already installed.
)

echo.
echo [3/4] Ensuring Electron 22 for Windows 7...
call npm install electron@22.3.27 --save-dev

echo.
echo [4/4] Building Windows installer (32-bit for Win7)...
call npm run build-win

IF ERRORLEVEL 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo ==========================================
echo  Build Complete!
echo  Check the 'dist' folder
echo ==========================================
echo.
echo Files created:
dir /b dist\*.exe 2>nul
echo.
pause
