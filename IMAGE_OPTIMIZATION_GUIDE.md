# Image Optimization Guide - Bioarchitettura Website

## Overview

This document describes the image optimization implementation for the Bioarchitettura® website, designed to improve loading performance, user experience, and accessibility while maintaining visual quality.

## Optimization Results

### Performance Improvements
- **JPEG Compression**: 48% reduction in file sizes (from 4,175KB to 2,191KB)
- **WebP Format**: 60% reduction in file sizes (from 4,175KB to 1,702KB)
- **Logo Optimization**: 93% reduction (from 652KB to 44KB for JPEG, 98% to 12KB for WebP)

### File Structure
```
assets/
├── css/
│   └── images.css          # Image styling and responsive design
├── js/
│   └── images.js           # Lazy loading and WebP detection
└── images/
    ├── optimized/          # Compressed JPEG images (85% quality)
    ├── webp/              # WebP format images (85% quality)
    └── responsive/        # Multiple sizes for responsive design
```

## Technical Implementation

### 1. Image Formats
- **WebP**: Primary format for modern browsers (60% smaller than JPEG)
- **JPEG**: Fallback format with optimized compression (48% reduction)
- **Multiple Sizes**: Responsive variants for different viewport sizes

### 2. Lazy Loading
Images load only when they become visible in the viewport:
- Uses `IntersectionObserver` API for performance
- Fallback implementation for older browsers
- 50px preload margin for smooth user experience

### 3. WebP Detection and Fallback
Automatic WebP support detection with JPEG fallback:
```html
<picture>
    <source type="image/webp" srcset="path/to/image.webp">
    <img src="path/to/image.jpg" alt="Descriptive text">
</picture>
```

### 4. Responsive Images
Multiple image sizes based on viewport:
```html
<img srcset="logo-150x150.jpg 150w, logo-100x100.jpg 100w, logo-50x50.jpg 50w" 
     sizes="(max-width: 768px) 32px, 40px">
```

### 5. Accessibility Features
- Descriptive alt text for all images
- Proper semantic markup
- Focus states for interactive images
- Width/height attributes to prevent layout shift

## Usage Guidelines

### Adding New Images

1. **Optimize Images**:
   ```bash
   # Compress JPEG (85% quality)
   convert original.jpg -quality 85 -strip assets/images/optimized/image.jpg
   
   # Create WebP version
   cwebp -q 85 assets/images/optimized/image.jpg -o assets/images/webp/image.webp
   ```

2. **HTML Implementation**:
   ```html
   <picture>
       <source type="image/webp" data-src="assets/images/webp/image.webp">
       <img class="lazy-load" 
            data-src="assets/images/optimized/image.jpg"
            alt="Descriptive alternative text"
            width="400" 
            height="300"
            loading="lazy">
   </picture>
   ```

### Logo Implementation
The logo uses responsive sizing and optimized formats:
```html
<picture>
    <source type="image/webp" 
            srcset="assets/images/webp/logo-150x150.webp 150w, 
                    assets/images/webp/logo-100x100.webp 100w, 
                    assets/images/webp/logo-50x50.webp 50w" 
            sizes="(max-width: 768px) 32px, 40px">
    <img src="assets/images/responsive/logo-100x100.jpg" 
         srcset="assets/images/responsive/logo-150x150.jpg 150w, 
                 assets/images/responsive/logo-100x100.jpg 100w, 
                 assets/images/responsive/logo-50x50.jpg 50w" 
         sizes="(max-width: 768px) 32px, 40px"
         alt="Bioarchitettura® - Logo della rivista italiana di architettura sostenibile"
         class="logo-image"
         width="100"
         height="100">
</picture>
```

## Performance Best Practices

### 1. Image Compression Settings
- **JPEG Quality**: 85% (optimal balance of quality/size)
- **WebP Quality**: 85% (matches JPEG quality)
- **Strip Metadata**: Remove EXIF data to reduce file size

### 2. Responsive Design
- Use `sizes` attribute to specify image display sizes
- Provide multiple source sizes for different viewports
- Implement proper CSS for aspect ratio preservation

### 3. Loading Strategy
- Use `loading="lazy"` for below-the-fold images
- Implement `data-src` for JavaScript-controlled loading
- Add smooth opacity transitions for better UX

### 4. Browser Support
- WebP: Chrome 23+, Firefox 65+, Safari 14+, Edge 18+
- Lazy Loading: Chrome 76+, Firefox 75+, Safari 15.4+, Edge 79+
- Fallbacks ensure compatibility with all browsers

## Accessibility Compliance

### WCAG 2.1 AA Requirements
- **Alt Text**: Descriptive alternatives for all informative images
- **Focus Indicators**: Visible focus states for interactive images
- **Contrast**: Images maintain sufficient contrast ratios
- **Responsive**: Images scale properly at 200% zoom

### Implementation Examples
```html
<!-- Decorative image -->
<img src="decoration.jpg" alt="" role="presentation">

<!-- Informative image -->
<img src="chart.jpg" alt="Energy consumption decreased by 40% in 2024">

<!-- Interactive image -->
<a href="article.html">
    <img src="preview.jpg" alt="Read article: Sustainable Building Materials">
</a>
```

## File Organization

### Directory Structure
- Keep original images outside the assets folder for backup
- Use descriptive filenames following the pattern: `category-description-size.ext`
- Maintain consistent naming across formats (WebP and JPEG)

### Version Control
- Include optimized images in version control
- Exclude original/source images to reduce repository size
- Use `.gitignore` for temporary processing files

## Monitoring and Maintenance

### Performance Metrics
- Monitor Core Web Vitals (LCP, CLS, FID)
- Track image loading performance
- Measure bandwidth savings

### Regular Tasks
- Audit new images for optimization opportunities
- Update compression settings based on quality feedback
- Review and update alt text for accessibility

## Tools and Scripts

### Automated Optimization
- `optimize_images.sh`: Batch process all images
- `responsive_sizes.sh`: Create multiple sizes for responsive design
- `update_html.sh`: Update HTML files with optimized image references

### Manual Tools
- **ImageMagick**: Image conversion and optimization
- **cwebp**: WebP format conversion
- **Browser DevTools**: Performance and accessibility testing

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| WebP | 23+ | 65+ | 14+ | 18+ |
| Lazy Loading | 76+ | 75+ | 15.4+ | 79+ |
| Picture Element | 38+ | 38+ | 9.1+ | 13+ |
| IntersectionObserver | 51+ | 55+ | 12.1+ | 15+ |

All features include appropriate fallbacks for older browsers.