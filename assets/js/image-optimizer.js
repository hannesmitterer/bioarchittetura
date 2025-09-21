/**
 * Image Optimization and Lazy Loading Module
 * Bioarchitettura® - Modern image handling for performance
 */

class ImageOptimizer {
    constructor() {
        this.lazyImages = [];
        this.imageObserver = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.detectWebPSupport();
        this.setupLazyLoading();
        this.optimizeExistingImages();
    }

    /**
     * Setup Intersection Observer for lazy loading
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                // Load images 50px before they enter viewport
                rootMargin: '50px 0px',
                threshold: 0.01
            });
        }
    }

    /**
     * Detect WebP support and add class to html element
     */
    detectWebPSupport() {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            if (webP.height === 2) {
                document.documentElement.classList.add('webp');
            } else {
                document.documentElement.classList.add('no-webp');
            }
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
        // Find all images with data-src attribute
        this.lazyImages = document.querySelectorAll('img[data-src]');
        
        if (this.imageObserver) {
            this.lazyImages.forEach(img => {
                this.imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.lazyImages.forEach(img => this.loadImage(img));
        }
    }

    /**
     * Load individual image
     */
    loadImage(img) {
        const src = img.dataset.src;
        const webpSrc = img.dataset.webp;
        
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Add loading class
            img.classList.add('loading');
            
            // Set the source
            if (webpSrc && document.documentElement.classList.contains('webp')) {
                img.src = webpSrc;
            } else {
                img.src = src;
            }
            
            // Remove loading class when loaded
            img.onload = () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            };
        };
        
        // Start loading
        if (webpSrc && document.documentElement.classList.contains('webp')) {
            imageLoader.src = webpSrc;
        } else {
            imageLoader.src = src;
        }
    }

    /**
     * Optimize existing images with modern attributes
     */
    optimizeExistingImages() {
        const images = document.querySelectorAll('img:not([data-src])');
        
        images.forEach(img => {
            // Add responsive class if not present
            if (!img.classList.contains('responsive-img')) {
                img.classList.add('responsive-img');
            }
            
            // Add loading="lazy" if supported and not critical
            if ('loading' in HTMLImageElement.prototype && !img.dataset.critical) {
                img.loading = 'lazy';
            }
            
            // Add decoding="async" for better performance
            if ('decoding' in HTMLImageElement.prototype) {
                img.decoding = 'async';
            }
        });
    }

    /**
     * Create responsive image with multiple sources
     */
    createResponsiveImage(config) {
        const {
            src,
            webpSrc,
            alt,
            sizes = '100vw',
            srcSet,
            className = '',
            lazy = true
        } = config;

        const img = document.createElement('img');
        img.alt = alt;
        img.className = `responsive-img ${className}`.trim();
        
        if (lazy) {
            img.dataset.src = src;
            if (webpSrc) img.dataset.webp = webpSrc;
            if (srcSet) img.dataset.srcset = srcSet;
            img.sizes = sizes;
        } else {
            img.src = src;
            if (srcSet) img.srcset = srcSet;
            img.sizes = sizes;
            img.dataset.critical = 'true';
        }

        return img;
    }

    /**
     * Generate srcset for responsive images
     */
    generateSrcSet(baseName, sizes = [400, 800, 1200, 1600]) {
        return sizes.map(size => {
            const extension = baseName.includes('.webp') ? '.webp' : '.jpg';
            const nameWithoutExt = baseName.replace(/\.[^/.]+$/, "");
            return `${nameWithoutExt}_${size}w${extension} ${size}w`;
        }).join(', ');
    }

    /**
     * Preload critical images
     */
    preloadCriticalImages(images) {
        images.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Add image loading error handling
     */
    handleImageErrors() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                
                // Add error class
                img.classList.add('img-error');
                
                // Try fallback if available
                if (img.dataset.fallback) {
                    img.src = img.dataset.fallback;
                } else {
                    // Create placeholder
                    this.createPlaceholder(img);
                }
            }
        }, true);
    }

    /**
     * Create placeholder for failed images
     */
    createPlaceholder(img) {
        const placeholder = document.createElement('div');
        placeholder.className = 'img-placeholder';
        placeholder.style.width = img.offsetWidth + 'px';
        placeholder.style.height = img.offsetHeight + 'px';
        placeholder.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
                <span>📷 Immagine non disponibile</span>
            </div>
        `;
        
        img.parentNode.replaceChild(placeholder, img);
    }
}

// Initialize image optimization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
    
    // Handle image errors
    window.imageOptimizer.handleImageErrors();
    
    // Preload critical images (hero images, etc.)
    const criticalImages = [
        'assets/img/logo-bioarchitettura.png'
    ];
    window.imageOptimizer.preloadCriticalImages(criticalImages);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageOptimizer;
}