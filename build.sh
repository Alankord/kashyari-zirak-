#!/bin/bash
# Build for all platforms

echo "=========================================="
echo "  Building کاشێری زیرەک for all platforms"
echo "=========================================="

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "Building for current platform..."
npm run build

echo ""
echo "=========================================="
echo "  Build complete! Check the 'dist' folder"
echo "=========================================="
