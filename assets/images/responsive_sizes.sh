#!/bin/bash

# Create responsive image sizes for key images
echo "Creating responsive image sizes..."

mkdir -p assets/images/responsive

# Create multiple sizes for the logo (for different use cases)
convert assets/images/optimized/logo-250x250.jpg -resize 150x150 assets/images/responsive/logo-150x150.jpg
convert assets/images/optimized/logo-250x250.jpg -resize 100x100 assets/images/responsive/logo-100x100.jpg
convert assets/images/optimized/logo-250x250.jpg -resize 50x50 assets/images/responsive/logo-50x50.jpg

# Create WebP versions of responsive logo sizes
cwebp -q 85 assets/images/responsive/logo-150x150.jpg -o assets/images/webp/logo-150x150.webp
cwebp -q 85 assets/images/responsive/logo-100x100.jpg -o assets/images/webp/logo-100x100.webp
cwebp -q 85 assets/images/responsive/logo-50x50.jpg -o assets/images/webp/logo-50x50.webp

echo "Responsive sizes created!"