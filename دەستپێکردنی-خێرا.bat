@echo off
chcp 65001 >nul
title کاشێری زیرەک - Quick Start
color 0A

echo.
echo  🏪  کاشێری زیرەک - SMART POS
echo  ================================
echo.

:: Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo  ❌ Node.js not found!
    echo.
    echo  Please install Node.js first:
    echo  https://nodejs.org/dist/v16.20.2/node-v16.20.2-x86.msi
    echo.
    start https://nodejs.org/dist/v16.20.2/
    pause
    exit /b 1
)

cd /d "%~dp0"

if not exist "node_modules" (
    echo  📦 Installing dependencies...
    call npm install
)

echo  🚀 Starting application...
call npm start
