#!/bin/bash

# Fadj Ma - Vercel Deployment Script
# This script deploys the Fadj Ma web application to Vercel

set -e

echo "🚀 Fadj Ma - Vercel Deployment"
echo "================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Navigate to web directory
cd "$(dirname "$0")/web"

echo "📝 Building application..."
npm run build

echo "🌐 Deploying to Vercel..."
vercel --prod --confirm

echo "✅ Deployment complete!"
echo ""
echo "🎉 Your application is now live!"
echo "📍 Visit: https://fadj-ma.vercel.app"
echo ""
echo "📊 Dashboard: https://vercel.com/dashboard"
