/**
 * Bioarchitettura® - Main JavaScript Functionality
 * Core functionalities for the sustainable architecture website
 * 
 * @version 1.0.0
 * @author Digital Team, Fondazione Bioarchitettura®
 * @license MIT
 */

'use strict';

/**
 * Main Application Object
 * Handles core website functionality including navigation, search, and user interactions
 */
const BioarchitetturaApp = {
    
    // Configuration
    config: {
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        },
        animation: {
            duration: 300,
            easing: 'ease-in-out'
        },
        search: {
            minChars: 3,
            debounceDelay: 300
        }
    },
    
    // Initialize application
    init() {
        console.log('🌱 Bioarchitettura® App Initializing...');
        
        this.setupNavigation();
        this.setupSearch();
        this.setupScrollEffects();
        this.setupFormValidation();
        this.setupAccessibility();
        this.setupAnalytics();
        
        console.log('✅ Bioarchitettura® App Ready');
    },
    
    /**
     * Navigation Management
     * Handles mobile menu, active states, and smooth scrolling
     */
    setupNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.getElementById('mainNav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Mobile menu toggle
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu(nav, menuToggle);
            });
            
            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                    this.closeMobileMenu(nav, menuToggle);
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('active')) {
                    this.closeMobileMenu(nav, menuToggle);
                    menuToggle.focus(); // Return focus to menu button
                }
            });
        }
        
        // Active navigation state
        this.setActiveNavigation();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        console.log('📱 Navigation setup complete');
    },
    
    /**
     * Toggle mobile menu with accessibility support
     */
    toggleMobileMenu(nav, toggle) {
        const isOpen = nav.classList.contains('active');
        
        if (isOpen) {
            this.closeMobileMenu(nav, toggle);
        } else {
            this.openMobileMenu(nav, toggle);
        }
    },
    
    /**
     * Open mobile menu
     */
    openMobileMenu(nav, toggle) {
        nav.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Chiudi menu');
        
        // Focus first menu item
        const firstLink = nav.querySelector('.nav-link');
        if (firstLink) {
            firstLink.focus();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    },
    
    /**
     * Close mobile menu
     */
    closeMobileMenu(nav, toggle) {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Apri menu');
        
        // Restore body scroll
        document.body.style.overflow = '';
    },
    
    /**
     * Set active navigation based on current page
     */
    setActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if link href matches current path
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    },
    
    /**
     * Setup smooth scrolling for internal links
     */
    setupSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    },
    
    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },
    
    /**
     * Search Functionality
     * Handles site search with debouncing and keyboard navigation
     */
    setupSearch() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchInput) return;
        
        let searchTimeout;
        let searchCache = new Map();
        
        // Debounced search
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < this.config.search.minChars) {
                this.hideSearchResults(searchResults);
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query, searchResults, searchCache);
            }, this.config.search.debounceDelay);
        });
        
        // Handle search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query.length >= this.config.search.minChars) {
                    this.performSearch(query, searchResults, searchCache);
                }
            });
        }
        
        // Close search results on outside click
        document.addEventListener('click', (e) => {
            if (searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                this.hideSearchResults(searchResults);
            }
        });
        
        console.log('🔍 Search functionality setup complete');
    },
    
    /**
     * Perform search operation
     */
    async performSearch(query, resultsContainer, cache) {
        if (!resultsContainer) return;
        
        // Check cache first
        if (cache.has(query)) {
            this.displaySearchResults(cache.get(query), resultsContainer);
            return;
        }
        
        // Show loading state
        this.showSearchLoading(resultsContainer);
        
        try {
            // Simulate search API call (replace with actual search implementation)
            const results = await this.searchContent(query);
            cache.set(query, results);
            this.displaySearchResults(results, resultsContainer);
        } catch (error) {
            console.error('Search error:', error);
            this.showSearchError(resultsContainer);
        }
    },
    
    /**
     * Search content (placeholder implementation)
     */
    async searchContent(query) {
        // This would typically call a search API or perform client-side search
        // For now, return mock results
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        title: `Risultato per "${query}"`,
                        excerpt: 'Descrizione del contenuto trovato...',
                        url: '/rivista/esempio-articolo',
                        type: 'articolo'
                    }
                ]);
            }, 500);
        });
    },
    
    /**
     * Display search results
     */
    displaySearchResults(results, container) {
        if (!container) return;
        
        container.innerHTML = '';
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-no-results">
                    <p>Nessun risultato trovato</p>
                </div>
            `;
        } else {
            const resultsHTML = results.map(result => `
                <article class="search-result">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.excerpt}</p>
                    <span class="search-result-type">${result.type}</span>
                </article>
            `).join('');
            
            container.innerHTML = resultsHTML;
        }
        
        container.classList.add('active');
    },
    
    /**
     * Show search loading state
     */
    showSearchLoading(container) {
        if (container) {
            container.innerHTML = '<div class="search-loading">Ricerca in corso...</div>';
            container.classList.add('active');
        }
    },
    
    /**
     * Show search error
     */
    showSearchError(container) {
        if (container) {
            container.innerHTML = '<div class="search-error">Errore durante la ricerca</div>';
            container.classList.add('active');
        }
    },
    
    /**
     * Hide search results
     */
    hideSearchResults(container) {
        if (container) {
            container.classList.remove('active');
        }
    },
    
    /**
     * Scroll Effects
     * Handles scroll-based animations and interactions
     */
    setupScrollEffects() {
        const header = document.querySelector('.header');
        const backToTopBtn = document.querySelector('.back-to-top');
        
        let lastScrollTop = 0;
        let ticking = false;
        
        // Throttled scroll handler
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Header behavior
                    if (header) {
                        if (scrollTop > 100) {
                            header.classList.add('scrolled');
                        } else {
                            header.classList.remove('scrolled');
                        }
                    }
                    
                    // Back to top button
                    if (backToTopBtn) {
                        if (scrollTop > 500) {
                            backToTopBtn.classList.add('visible');
                        } else {
                            backToTopBtn.classList.remove('visible');
                        }
                    }
                    
                    // Reveal animations for elements in viewport
                    this.revealOnScroll();
                    
                    lastScrollTop = scrollTop;
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Back to top functionality
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                this.smoothScrollTo(document.body);
            });
        }
        
        console.log('📜 Scroll effects setup complete');
    },
    
    /**
     * Reveal elements on scroll
     */
    revealOnScroll() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = windowHeight * 0.8;
            
            if (elementTop < revealPoint && !element.classList.contains('revealed')) {
                element.classList.add('revealed');
            }
        });
    },
    
    /**
     * Form Validation
     * Client-side form validation with accessibility
     */
    setupFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
        
        console.log('✅ Form validation setup complete');
    },
    
    /**
     * Validate entire form
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    /**
     * Validate individual field
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Required field check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Questo campo è obbligatorio';
        }
        
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Inserisci un indirizzo email valido';
            }
        }
        
        // Update field state
        if (isValid) {
            this.clearFieldError(field);
        } else {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    },
    
    /**
     * Show field error
     */
    showFieldError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.setAttribute('aria-describedby', 'error-' + field.name);
        errorElement.id = 'error-' + field.name;
    },
    
    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    },
    
    /**
     * Accessibility Enhancements
     */
    setupAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }
        
        // Keyboard navigation for custom controls
        this.setupKeyboardNavigation();
        
        // Focus management
        this.setupFocusManagement();
        
        console.log('♿ Accessibility enhancements setup complete');
    },
    
    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        // Arrow key navigation for menus
        const menus = document.querySelectorAll('[role="menu"]');
        menus.forEach(menu => {
            menu.addEventListener('keydown', this.handleMenuKeydown.bind(this));
        });
    },
    
    /**
     * Handle menu keyboard navigation
     */
    handleMenuKeydown(e) {
        const items = e.currentTarget.querySelectorAll('[role="menuitem"]');
        const currentIndex = Array.from(items).indexOf(document.activeElement);
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                items[nextIndex].focus();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                items[prevIndex].focus();
                break;
                
            case 'Home':
                e.preventDefault();
                items[0].focus();
                break;
                
            case 'End':
                e.preventDefault();
                items[items.length - 1].focus();
                break;
        }
    },
    
    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Visible focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },
    
    /**
     * Analytics Setup
     */
    setupAnalytics() {
        // Basic event tracking (integrate with actual analytics service)
        this.trackPageView();
        this.trackUserInteractions();
        
        console.log('📊 Analytics setup complete');
    },
    
    /**
     * Track page view
     */
    trackPageView() {
        // Implement actual analytics tracking
        console.log('📄 Page view tracked:', window.location.pathname);
    },
    
    /**
     * Track user interactions
     */
    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .nav-link, .card')) {
                console.log('🖱️ Interaction tracked:', e.target.textContent.trim());
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (e) => {
            console.log('📝 Form submission tracked:', e.target.action || 'inline form');
        });
    },
    
    /**
     * Utility Methods
     */
    
    /**
     * Get current breakpoint
     */
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width >= this.config.breakpoints.desktop) return 'desktop';
        if (width >= this.config.breakpoints.tablet) return 'tablet';
        return 'mobile';
    },
    
    /**
     * Debounce utility
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    BioarchitetturaApp.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👋 Page hidden - pausing non-critical activities');
    } else {
        console.log('👁️ Page visible - resuming activities');
    }
});

// Handle window resize
window.addEventListener('resize', BioarchitetturaApp.debounce(() => {
    const breakpoint = BioarchitetturaApp.getCurrentBreakpoint();
    console.log('📱 Breakpoint changed:', breakpoint);
    
    // Close mobile menu on resize to desktop
    if (breakpoint !== 'mobile') {
        const nav = document.getElementById('mainNav');
        const toggle = document.querySelector('.menu-toggle');
        if (nav && nav.classList.contains('active')) {
            BioarchitetturaApp.closeMobileMenu(nav, toggle);
        }
    }
}, 250));

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BioarchitetturaApp;
}