/**
 * Image optimization and loading utilities for Bioarchitettura website
 */

// WebP support detection
function supportsWebP() {
    return new Promise((resolve) => {
        const webp = new Image();
        webp.onload = webp.onerror = () => {
            resolve(webp.height === 2);
        };
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}

// Lazy loading implementation
class LazyImageLoader {
    constructor() {
        this.imageObserver = null;
        this.webpSupported = false;
        this.init();
    }

    async init() {
        this.webpSupported = await supportsWebP();
        this.setupIntersectionObserver();
        this.loadImages();
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px' // Start loading 50px before image enters viewport
            });
        }
    }

    loadImages() {
        const lazyImages = document.querySelectorAll('.lazy-load');
        
        if (this.imageObserver) {
            lazyImages.forEach(img => this.imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => this.loadImage(img));
        }
    }

    loadImage(img) {
        // Check if image is inside a picture element (for WebP fallback)
        const picture = img.closest('picture');
        
        if (picture) {
            // Handle picture element with WebP source
            const webpSource = picture.querySelector('source[type="image/webp"]');
            const jpegSource = picture.querySelector('source[type="image/jpeg"], img');
            
            if (this.webpSupported && webpSource && webpSource.dataset.src) {
                webpSource.srcset = webpSource.dataset.src;
            }
            
            if (jpegSource && jpegSource.dataset.src) {
                if (jpegSource.tagName === 'IMG') {
                    jpegSource.src = jpegSource.dataset.src;
                } else {
                    jpegSource.srcset = jpegSource.dataset.src;
                }
            }
        } else {
            // Handle regular img element
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        }

        // Add loaded class for CSS transitions
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            img.classList.remove('lazy-load');
        });

        // Handle loading errors
        img.addEventListener('error', () => {
            img.classList.add('loaded');
            img.classList.remove('lazy-load');
            console.warn('Failed to load image:', img.dataset.src || img.src);
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LazyImageLoader();
});

// Utility function to create responsive picture elements
function createResponsivePicture(imagePath, altText, className = '') {
    const basePath = imagePath.replace(/\.[^/.]+$/, '');
    const extension = imagePath.split('.').pop();
    
    return `
        <picture class="${className}">
            <source type="image/webp" data-src="${basePath}.webp">
            <img 
                class="lazy-load" 
                data-src="${imagePath}"
                alt="${altText}"
                loading="lazy"
            >
        </picture>
    `;
}

// Export for global use
window.ImageUtils = {
    createResponsivePicture,
    supportsWebP
};