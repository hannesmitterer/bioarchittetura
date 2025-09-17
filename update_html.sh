#!/bin/bash

# Update all HTML files with image optimizations

files=("shop.html" "master.html" "fondazione.html")

for file in "${files[@]}"; do
    echo "Updating $file..."
    
    # Add images.css link after styles.css
    sed -i 's|<link rel="stylesheet" href="styles.css">|<link rel="stylesheet" href="styles.css">\n    <link rel="stylesheet" href="assets/css/images.css">|' "$file"
    
    # Update logo in header
    sed -i 's|<a href="index.html" class="logo">Bioarchitettura®</a>|<a href="index.html" class="logo">\
                    <picture>\
                        <source type="image/webp" srcset="assets/images/webp/logo-150x150.webp 150w, assets/images/webp/logo-100x100.webp 100w, assets/images/webp/logo-50x50.webp 50w" sizes="(max-width: 768px) 32px, 40px">\
                        <img src="assets/images/responsive/logo-100x100.jpg" \
                             srcset="assets/images/responsive/logo-150x150.jpg 150w, assets/images/responsive/logo-100x100.jpg 100w, assets/images/responsive/logo-50x50.jpg 50w" \
                             sizes="(max-width: 768px) 32px, 40px"\
                             alt="Bioarchitettura® - Logo della rivista italiana di architettura sostenibile"\
                             class="logo-image"\
                             width="100"\
                             height="100">\
                    </picture>\
                    <span>Bioarchitettura®</span>\
                </a>|' "$file"
    
    # Add script tag before closing body
    sed -i 's|</body>|    <script src="assets/js/images.js"></script>\
</body>|' "$file"
done

echo "All HTML files updated!"