@echo off
chcp 65001 >nul
title کاشێری زیرەک - SMART POS Installer
color 0B

echo.
echo  ============================================
echo   🏪  کاشێری زیرەک - SMART POS
echo   یەک کلیک - دروستکردنی بەرنامە
echo  ============================================
echo.

:: Check Windows version
for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j
if "%VERSION%"=="6.1" (
    echo  [INFO] Windows 7 detected - using compatible settings
    set WIN7=1
) else (
    set WIN7=0
)

:: Step 1: Check Node.js
echo  [1/6] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo  [INFO] Node.js not found. Downloading...

    if "%WIN7%"=="1" (
        set NODE_URL=https://nodejs.org/dist/v16.20.2/node-v16.20.2-x86.msi
        set NODE_FILE=node-v16.20.2-x86.msi
    ) else (
        set NODE_URL=https://nodejs.org/dist/v18.19.0/node-v18.19.0-x64.msi
        set NODE_FILE=node-v18.19.0-x64.msi
    )

    echo  [INFO] Downloading Node.js installer...
    powershell -Command "& {$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri '%NODE_URL%' -OutFile '%TEMP%\%NODE_FILE%'}" 2>nul

    if not exist "%TEMP%\%NODE_FILE%" (
        echo  [ERROR] Download failed. Please install Node.js manually from:
        echo  https://nodejs.org/
        pause
        exit /b 1
    )

    echo  [INFO] Installing Node.js (please wait)...
    msiexec /i "%TEMP%\%NODE_FILE%" /qn /norestart

    :: Refresh environment variables
    call refreshenv.cmd 2>nul
    set "PATH=%PATH%;C:\Program Files\nodejs\;C:\Program Files (x86)\nodejs\"

    node --version >nul 2>&1
    if errorlevel 1 (
        echo  [ERROR] Node.js installation failed. Please restart and try again.
        pause
        exit /b 1
    )

    echo  [OK] Node.js installed successfully!
) else (
    for /f "tokens=*" %%a in ('node --version') do echo  [OK] Node.js found: %%a
)

echo.

:: Step 2: Navigate to app directory
echo  [2/6] Preparing application...
cd /d "%~dp0"
echo  [OK] Directory: %CD%

echo.

:: Step 3: Install dependencies
echo  [3/6] Installing dependencies (first time only)...
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo  [WARNING] npm install failed, trying with legacy peer deps...
        call npm install --legacy-peer-deps
        if errorlevel 1 (
            echo  [ERROR] Failed to install dependencies.
            pause
            exit /b 1
        )
    )
    echo  [OK] Dependencies installed!
) else (
    echo  [OK] Dependencies already installed.
)

echo.

:: Step 4: Install Electron for Windows 7
echo  [4/6] Setting up Electron (Windows 7 compatible)...
if "%WIN7%"=="1" (
    call npm install electron@22.3.27 --save-dev
    echo  [OK] Electron 22 installed (Windows 7 compatible)
) else (
    call npm install electron@28.0.0 --save-dev
    echo  [OK] Electron 28 installed
)

echo.

:: Step 5: Build Portable EXE
echo  [5/6] Building Portable Application...
echo  [INFO] This may take 2-5 minutes, please wait...
call npm run build-win-portable

if errorlevel 1 (
    echo  [WARNING] Portable build failed, trying full build...
    call npm run build-win
    if errorlevel 1 (
        echo  [ERROR] Build failed. Starting in development mode...
        goto :devmode
    )
)

echo.
echo  [OK] Build complete!
echo.

:: Step 6: Launch or show result
echo  [6/6] Finishing up...
if exist "dist\*Portable*.exe" (
    for %%f in (dist\*Portable*.exe) do (
        echo.
        echo  ============================================
        echo   ✅ SUCCESS! Application built!
        echo  ============================================
        echo.
        echo   Location: %%~dpnf%%~xf
        echo.
        echo   You can now:
        echo   1. Copy this file to any computer
        echo   2. Double-click to run (no installation!)
        echo   3. Put it on USB stick
        echo.
        echo   Would you like to launch it now?
        choice /C YN /N /M "   Launch now? (Y/N): "
        if errorlevel 2 goto :finish
        if errorlevel 1 start "" "%%f" & goto :finish
    )
) else if exist "dist\*Setup*.exe" (
    for %%f in (dist\*Setup*.exe) do (
        echo.
        echo  ============================================
        echo   ✅ SUCCESS! Installer built!
        echo  ============================================
        echo.
        echo   Location: %%~dpnf%%~xf
        echo.
        echo   Run this file to install the application.
        echo.
        choice /C YN /N /M "   Launch installer now? (Y/N): "
        if errorlevel 2 goto :finish
        if errorlevel 1 start "" "%%f" & goto :finish
    )
)

:devmode
echo.
echo  ============================================
echo   🚀 Starting in Development Mode...
echo  ============================================
echo.
call npm start
goto :finish

:finish
echo.
echo  ============================================
echo   Thank you for using کاشێری زیرەک!
echo  ============================================
echo.
pause
