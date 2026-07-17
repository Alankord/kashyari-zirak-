@echo off
chcp 65001 >nul
echo ==========================================
echo  Building Windows Installer...
echo ==========================================
echo.

IF NOT EXIST "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Building Windows installer...
call npm run build-win

echo.
echo ==========================================
echo  Build complete!
echo  Check the 'dist' folder
echo ==========================================
pause
