@echo off
chcp 65001 >nul
echo ==========================================
echo  کاشێری زیرەک - SMART POS
echo  Electron Desktop App Builder
echo ==========================================
echo.

IF NOT EXIST "node_modules" (
    echo [1/3] Installing dependencies...
    call npm install
    IF ERRORLEVEL 1 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
) ELSE (
    echo [1/3] Dependencies already installed.
)

echo.
echo [2/3] Starting application...
call npm start
IF ERRORLEVEL 1 (
    echo ERROR: Failed to start!
    pause
    exit /b 1
)
