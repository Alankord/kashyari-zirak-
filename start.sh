#!/bin/bash
# کاشێری زیرەک - SMART POS Electron Builder

set -e

echo "=========================================="
echo "  کاشێری زیرەک - SMART POS"
echo "  Electron Desktop App Builder"
echo "=========================================="
echo ""

if [ ! -d "node_modules" ]; then
    echo "[1/3] Installing dependencies..."
    npm install
else
    echo "[1/3] Dependencies already installed."
fi

echo ""
echo "[2/3] Starting application..."
npm start
