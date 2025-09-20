/**
 * Bioarchitettura® - Main JavaScript Module
 * Handles navigation, responsive menu, and interactive features
 */

// Navigation functionality
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

// DOM Content Loaded handler
document.addEventListener('DOMContentLoaded', function() {
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.getElementById('mainNav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (nav && menuToggle && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    });
    
    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
        const nav = document.getElementById('mainNav');
        if (nav && window.innerWidth >= 768) {
            nav.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to current page navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Enhanced accessibility features
    enhanceAccessibility();
    
    // Performance monitoring
    measurePagePerformance();
});

// Enhanced accessibility features
function enhanceAccessibility() {
    // Add skip to main content link
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Salta al contenuto principale';
        skipLink.className = 'skip-link';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '-40px';
        skipLink.style.left = '6px';
        skipLink.style.background = '#000';
        skipLink.style.color = '#fff';
        skipLink.style.padding = '8px';
        skipLink.style.textDecoration = 'none';
        skipLink.style.zIndex = '1000';
        skipLink.style.transition = 'top 0.3s';
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Add aria-current to active navigation links
    const activeNavLink = document.querySelector('.nav-link.active');
    if (activeNavLink) {
        activeNavLink.setAttribute('aria-current', 'page');
    }
    
    // Ensure all images have alt attributes
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        img.setAttribute('alt', '');
        console.warn('Image missing alt attribute:', img.src);
    });
}

// Performance monitoring
function measurePagePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                // Log performance metrics (can be sent to analytics in production)
                console.log('Page Load Time:', loadTime + 'ms');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms');
                
                // Mark poor performance
                if (loadTime > 3000) {
                    console.warn('Page load time exceeds 3 seconds. Consider optimizing assets.');
                }
            }, 0);
        });
    }
}

// Utility functions
const BioArchitettura = {
    // Smooth scroll to element
    scrollTo: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    // Show notification (can be used for form feedback, etc.)
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.backgroundColor = type === 'error' ? '#dc3545' : '#28a745';
        notification.style.color = 'white';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '1001';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    },
    
    // Form validation helper
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Make BioArchitettura utilities globally available
window.BioArchitettura = BioArchitettura;