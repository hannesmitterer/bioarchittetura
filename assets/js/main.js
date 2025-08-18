// Bioarchitettura® - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navbar = document.querySelector('.navbar');
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '☰';
    navToggle.style.display = 'none';
    
    // Add mobile menu functionality
    function setupMobileMenu() {
        const navList = document.querySelector('.navbar-nav');
        
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navbar.appendChild(navToggle);
            
            navToggle.addEventListener('click', function() {
                navList.classList.toggle('mobile-active');
            });
        } else {
            navToggle.style.display = 'none';
            navList.classList.remove('mobile-active');
        }
    }
    
    // Setup mobile menu on load and resize
    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
    
    console.log('Bioarchitettura® website loaded successfully');
});