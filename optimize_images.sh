#!/bin/bash

# Image optimization script for Bioarchitettura website
# This script optimizes JPEG images and creates WebP versions

echo "Starting image optimization..."

# Create directories if they don't exist
mkdir -p assets/images/optimized
mkdir -p assets/images/webp

# Initialize counters
total_original_size=0
total_optimized_size=0
total_webp_size=0
count=0

# Process all JPEG files in the root directory
for img in *.jpg; do
    if [ "$img" != "*.jpg" ] && [ "$img" != "LogoBIO_250x250.jpg" ]; then
        echo "Processing: $img"
        
        # Get original size
        original_size=$(stat -c%s "$img")
        total_original_size=$((total_original_size + original_size))
        
        # Optimize JPEG (85% quality for good balance of size/quality)
        convert "$img" -quality 85 -strip "assets/images/optimized/$img"
        
        # Get optimized size
        optimized_size=$(stat -c%s "assets/images/optimized/$img")
        total_optimized_size=$((total_optimized_size + optimized_size))
        
        # Create WebP version (85% quality)
        cwebp -q 85 "assets/images/optimized/$img" -o "assets/images/webp/${img%.*}.webp"
        
        # Get WebP size
        webp_size=$(stat -c%s "assets/images/webp/${img%.*}.webp")
        total_webp_size=$((total_webp_size + webp_size))
        
        count=$((count + 1))
        
        # Show progress
        echo "  Original: $(($original_size / 1024))KB -> Optimized: $(($optimized_size / 1024))KB -> WebP: $(($webp_size / 1024))KB"
    fi
done

# Calculate savings
jpeg_savings=$((100 - (total_optimized_size * 100 / total_original_size)))
webp_savings=$((100 - (total_webp_size * 100 / total_original_size)))

echo ""
echo "Optimization complete!"
echo "Processed $count images"
echo "Total original size: $((total_original_size / 1024))KB"
echo "Total optimized JPEG size: $((total_optimized_size / 1024))KB (${jpeg_savings}% savings)"
echo "Total WebP size: $((total_webp_size / 1024))KB (${webp_savings}% savings)"