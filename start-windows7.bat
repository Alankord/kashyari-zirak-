@echo off
chcp 65001 >nul
echo ==========================================
echo  کاشێری زیرەک - SMART POS
echo  Windows 7 Compatible Mode
echo ==========================================
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js 16 from:
    echo https://nodejs.org/dist/v16.20.2/node-v16.20.2-x86.msi
    echo.
    start https://nodejs.org/dist/v16.20.2/
    pause
    exit /b 1
)

IF NOT EXIST "node_modules" (
    echo [1/3] Installing dependencies (Windows 7 compatible)...
    call npm install
    IF ERRORLEVEL 1 (
        call npm install --legacy-peer-deps
    )
    echo.
)

echo [2/3] Ensuring Windows 7 compatibility...
call npm install electron@22.3.27 --save-dev 2>nul

echo.
echo [3/3] Starting Kashyari Zirak...
call npm start

IF ERRORLEVEL 1 (
    echo.
    echo [ERROR] Failed to start!
    echo Try running as Administrator.
    pause
)
