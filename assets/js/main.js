/**
 * Bioarchitettura® Website JavaScript
 * Core functionality for modern responsive design
 */

(function() {
    'use strict';

    // DOM utilities
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // Mobile menu functionality
    function initMobileMenu() {
        const menuToggle = $('.menu-toggle');
        const nav = $('.nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = $(link.getAttribute('href'));
                if (target) {
                    const headerHeight = $('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animated counter for statistics
    function animateCounters() {
        const counters = $$('.stat-number[data-count]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Newsletter form handling
    function initNewsletterForm() {
        const form = $('.newsletter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                
                if (validateEmail(email)) {
                    showNotification('Grazie per esserti iscritto alla nostra newsletter!', 'success');
                    form.reset();
                } else {
                    showNotification('Inserisci un indirizzo email valido.', 'error');
                }
            });
        }
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = $$('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Chiudi notifica">&times;</button>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#2D5A3D' : type === 'error' ? '#DC6B4A' : '#3B82F6',
            color: '#FEFEFE',
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '1000',
            maxWidth: '400px',
            animation: 'slideInRight 0.3s ease-out',
            fontFamily: 'var(--font-primary)',
            fontSize: '14px',
            lineHeight: '1.4'
        });

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        document.body.appendChild(notification);
    }

    // Add notification animations
    function addNotificationStyles() {
        if (!$('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0.8;
                    line-height: 1;
                }
                .notification-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    // Lazy loading for images
    function initLazyLoading() {
        const images = $$('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
        }
    }

    // Form validation helpers
    function addFormValidation() {
        const forms = $$('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Real-time validation
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        validateField(input);
                    }
                });
            });

            // Form submission validation
            form.addEventListener('submit', (e) => {
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    showNotification('Correggi gli errori nel modulo prima di inviare.', 'error');
                }
            });
        });
    }

    // Individual field validation
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        // Remove existing error state
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (required && !value) {
            isValid = false;
            errorMessage = 'Questo campo è obbligatorio.';
        }
        // Email validation
        else if (type === 'email' && value && !validateEmail(value)) {
            isValid = false;
            errorMessage = 'Inserisci un indirizzo email valido.';
        }
        // Phone validation (basic)
        else if (type === 'tel' && value && !/^[\d\s\+\-\(\)]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Inserisci un numero di telefono valido.';
        }

        if (!isValid) {
            field.classList.add('error');
            const errorEl = document.createElement('span');
            errorEl.className = 'field-error';
            errorEl.textContent = errorMessage;
            errorEl.style.cssText = 'color: #DC6B4A; font-size: 12px; margin-top: 4px; display: block;';
            field.parentNode.appendChild(errorEl);
        }

        return isValid;
    }

    // Performance optimization: Debounce function
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Scroll-based header styling
    function initScrollHeader() {
        const header = $('.header');
        if (!header) return;

        const handleScroll = debounce(() => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);

        // Add scroll styles
        if (!$('#scroll-header-styles')) {
            const styles = document.createElement('style');
            styles.id = 'scroll-header-styles';
            styles.textContent = `
                .header.scrolled {
                    background: rgba(31, 41, 55, 0.95);
                    backdrop-filter: blur(10px);
                }
            `;
            document.head.appendChild(styles);
        }
    }

    // Accessibility improvements
    function enhanceAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Vai al contenuto principale';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #2D5A3D;
            color: #FEFEFE;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        skipLink.addEventListener('focus', () => skipLink.style.top = '6px');
        skipLink.addEventListener('blur', () => skipLink.style.top = '-40px');
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Ensure main content has ID
        const main = $('main') || $('.main-content');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    }

    // Initialize all functionality when DOM is ready
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all components
        addNotificationStyles();
        initMobileMenu();
        initSmoothScrolling();
        animateCounters();
        initNewsletterForm();
        initLazyLoading();
        addFormValidation();
        initScrollHeader();
        enhanceAccessibility();

        // Add loaded class to body for CSS transitions
        document.body.classList.add('js-loaded');

        console.log('🏗️ Bioarchitettura® website initialized successfully');
    }

    // Start initialization
    init();

})();

// Export utility functions for use in other scripts
window.BioarchitetturaUtils = {
    showNotification: function(message, type) {
        // This will be available after initialization
        if (window.showNotification) {
            window.showNotification(message, type);
        }
    },
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};