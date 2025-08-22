#!/bin/bash

# Deploy script for Bioarchitettura® website
# Compatible with Jekyll and GitHub Pages

set -e  # Exit on any error

echo "🚀 Starting Bioarchitettura® deployment..."

# Check if we're in the right directory
if [ ! -f "_config.yml" ]; then
    echo "❌ Error: _config.yml not found. Please run this script from the repository root."
    exit 1
fi

# Check if Jekyll is installed
if ! command -v jekyll &> /dev/null; then
    echo "📦 Installing Jekyll..."
    gem install bundler jekyll
fi

# Install dependencies
echo "📦 Installing Ruby dependencies..."
bundle install

# Clean previous build
echo "🧹 Cleaning previous build..."
bundle exec jekyll clean

# Check Jekyll configuration
echo "🔍 Checking Jekyll configuration..."
bundle exec jekyll doctor

# Build the site
echo "🔨 Building Jekyll site..."
bundle exec jekyll build

# Verify build was successful
if [ ! -d "_site" ]; then
    echo "❌ Error: Build failed - _site directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Optional: Test the build locally
if [ "$1" = "--serve" ] || [ "$1" = "-s" ]; then
    echo "🌐 Starting local server..."
    echo "📱 Open http://localhost:4000 in your browser"
    bundle exec jekyll serve --livereload
elif [ "$1" = "--test" ] || [ "$1" = "-t" ]; then
    echo "🧪 Starting test server (no livereload)..."
    echo "📱 Open http://localhost:4000 in your browser"
    echo "🛑 Press Ctrl+C to stop the server"
    bundle exec jekyll serve --no-watch
else
    echo "📋 Deployment ready!"
    echo "📁 Built files are in _site/ directory"
    echo "🌐 Ready for deployment to GitHub Pages"
    echo ""
    echo "💡 Usage options:"
    echo "   ./deploy.sh --serve   Start development server with livereload"
    echo "   ./deploy.sh --test    Start test server without livereload"
fi

echo "🎉 Deployment script completed!"