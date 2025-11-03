#!/bin/bash

# Quote Generator - Quick Deploy Script
# This script builds and deploys your app to Netlify

echo "🚀 Quote Generator - Deployment Script"
echo "======================================="
echo ""

# Check if build directory exists
if [ -d "build" ]; then
    echo "✅ Build directory found"
else
    echo "📦 Building the app..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build completed successfully!"
    else
        echo "❌ Build failed. Please check the errors above."
        exit 1
    fi
fi

echo ""
echo "Choose your deployment method:"
echo "1) Deploy with Netlify CLI (recommended)"
echo "2) Manual deployment instructions"
echo ""
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🔐 Authenticating with Netlify..."
        npx netlify login
        
        echo ""
        echo "🚀 Deploying to production..."
        npx netlify deploy --prod --dir=build
        
        echo ""
        echo "✅ Deployment complete! Check the URL above."
        ;;
    2)
        echo ""
        echo "📋 Manual Deployment Instructions:"
        echo ""
        echo "Option A - Drag & Drop:"
        echo "1. Go to https://app.netlify.com/drop"
        echo "2. Drag the 'build' folder to the browser"
        echo "3. Get your live URL!"
        echo ""
        echo "Option B - GitHub Integration:"
        echo "1. Push code to GitHub"
        echo "2. Go to https://app.netlify.com/"
        echo "3. Click 'Add new site' → 'Import an existing project'"
        echo "4. Connect your GitHub repo"
        echo "5. Set build command: npm run build"
        echo "6. Set publish directory: build"
        echo "7. Click 'Deploy site'"
        echo ""
        echo "For more details, see DEPLOYMENT_GUIDE.md"
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Thank you for using Quote Generator!"
