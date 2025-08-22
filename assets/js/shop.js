/**
 * Bioarchitettura® - E-commerce System
 * Advanced shopping cart and e-commerce functionality
 * 
 * @version 1.0.0
 * @author Digital Team, Fondazione Bioarchitettura®
 * @license MIT
 */

'use strict';

/**
 * E-commerce Application Object
 * Handles shopping cart, product management, and checkout functionality
 */
const BioarchitetturaShop = {
    
    // Configuration
    config: {
        currency: 'EUR',
        locale: 'it-IT',
        storage: {
            cartKey: 'bioarchitettura_cart',
            wishlistKey: 'bioarchitettura_wishlist',
            userKey: 'bioarchitettura_user'
        },
        animation: {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        checkout: {
            steps: ['cart', 'shipping', 'payment', 'confirmation'],
            currentStep: 0
        }
    },
    
    // State management
    state: {
        cart: [],
        wishlist: [],
        products: [],
        user: null,
        loading: false
    },
    
    // Initialize e-commerce system
    init() {
        console.log('🛒 Bioarchitettura® Shop Initializing...');
        
        this.loadFromStorage();
        this.setupProductCatalog();
        this.setupCart();
        this.setupWishlist();
        this.setupCheckout();
        this.setupProductFilters();
        this.setupProductSearch();
        this.updateCartUI();
        
        console.log('✅ Bioarchitettura® Shop Ready');
    },
    
    /**
     * Storage Management
     */
    loadFromStorage() {
        try {
            const cart = localStorage.getItem(this.config.storage.cartKey);
            const wishlist = localStorage.getItem(this.config.storage.wishlistKey);
            const user = localStorage.getItem(this.config.storage.userKey);
            
            this.state.cart = cart ? JSON.parse(cart) : [];
            this.state.wishlist = wishlist ? JSON.parse(wishlist) : [];
            this.state.user = user ? JSON.parse(user) : null;
            
            console.log('💾 Data loaded from storage');
        } catch (error) {
            console.error('Storage loading error:', error);
        }
    },
    
    saveToStorage() {
        try {
            localStorage.setItem(this.config.storage.cartKey, JSON.stringify(this.state.cart));
            localStorage.setItem(this.config.storage.wishlistKey, JSON.stringify(this.state.wishlist));
            if (this.state.user) {
                localStorage.setItem(this.config.storage.userKey, JSON.stringify(this.state.user));
            }
        } catch (error) {
            console.error('Storage saving error:', error);
        }
    },
    
    /**
     * Product Catalog Management
     */
    setupProductCatalog() {
        // Initialize product data (in real implementation, would load from API)
        this.state.products = this.getProductData();
        this.renderProductGrid();
        
        console.log('📦 Product catalog setup complete');
    },
    
    getProductData() {
        return [
            {
                id: 'abbonamento-annuale',
                name: 'Abbonamento Annuale',
                category: 'abbonamenti',
                price: 120.00,
                originalPrice: 150.00,
                description: 'Abbonamento annuale alla rivista Bioarchitettura® (6 numeri)',
                image: '/assets/images/products/abbonamento-annuale.jpg',
                features: ['6 numeri all\'anno', 'Accesso digitale', 'Spedizione gratuita'],
                inStock: true,
                digital: false
            },
            {
                id: 'abbonamento-digitale',
                name: 'Abbonamento Digitale',
                category: 'abbonamenti',
                price: 80.00,
                originalPrice: 120.00,
                description: 'Accesso completo all\'archivio digitale della rivista',
                image: '/assets/images/products/abbonamento-digitale.jpg',
                features: ['Archivio completo', 'Download PDF', 'App mobile'],
                inStock: true,
                digital: true
            },
            {
                id: 'master-casaclima',
                name: 'Master CasaClima & Bioarchitettura',
                category: 'formazione',
                price: 3500.00,
                description: 'Corso specialistico di 6 mesi per professionisti',
                image: '/assets/images/products/master-casaclima.jpg',
                features: ['60 CFU', 'Certificazione CasaClima', '6 mesi online + weekend'],
                inStock: true,
                digital: false,
                installments: true
            },
            {
                id: 'ebook-hemp-building',
                name: 'eBook: Hemp Building Techniques',
                category: 'ebooks',
                price: 25.00,
                description: 'Guida completa alle tecniche costruttive con canapa',
                image: '/assets/images/products/ebook-hemp.jpg',
                features: ['200 pagine', 'Illustrazioni tecniche', 'Download immediato'],
                inStock: true,
                digital: true
            },
            {
                id: 'libro-30-anni',
                name: 'Bioarchitettura® - 30 Anni di Sostenibilità',
                category: 'libri',
                price: 45.00,
                description: 'Volume celebrativo dei primi 30 anni della rivista',
                image: '/assets/images/products/libro-30anni.jpg',
                features: ['350 pagine', 'Copertina rigida', 'Foto storiche'],
                inStock: true,
                digital: false
            }
        ];
    },
    
    renderProductGrid() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;
        
        const productsHTML = this.state.products.map(product => 
            this.createProductCard(product)
        ).join('');
        
        productGrid.innerHTML = productsHTML;
    },
    
    createProductCard(product) {
        const discountPercent = product.originalPrice 
            ? Math.round((1 - product.price / product.originalPrice) * 100)
            : 0;
            
        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${discountPercent > 0 ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
                    ${product.digital ? '<span class="digital-badge">Digitale</span>' : ''}
                </div>
                
                <div class="product-info">
                    <span class="product-category">${this.getCategoryLabel(product.category)}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    
                    <ul class="product-features">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <div class="product-price">
                        ${product.originalPrice ? 
                            `<span class="price-original">€${product.originalPrice.toFixed(2)}</span>` : ''
                        }
                        <span class="price-current">€${product.price.toFixed(2)}</span>
                        ${product.installments ? '<span class="price-note">o 6 rate</span>' : ''}
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" 
                                data-product-id="${product.id}"
                                ${!product.inStock ? 'disabled' : ''}>
                            ${product.inStock ? 'Aggiungi al Carrello' : 'Non Disponibile'}
                        </button>
                        <button class="btn-icon wishlist-toggle" 
                                data-product-id="${product.id}"
                                aria-label="Aggiungi alla lista desideri">
                            <span class="heart-icon">♡</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    },
    
    getCategoryLabel(category) {
        const labels = {
            'abbonamenti': 'Abbonamenti',
            'formazione': 'Formazione',
            'ebooks': 'eBooks',
            'libri': 'Libri'
        };
        return labels[category] || category;
    },
    
    /**
     * Shopping Cart Management
     */
    setupCart() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = e.target.dataset.productId;
                this.addToCart(productId);
            }
            
            // Remove from cart
            if (e.target.classList.contains('remove-from-cart')) {
                const productId = e.target.dataset.productId;
                this.removeFromCart(productId);
            }
            
            // Update quantity
            if (e.target.classList.contains('quantity-increase')) {
                const productId = e.target.dataset.productId;
                this.updateQuantity(productId, 1);
            }
            
            if (e.target.classList.contains('quantity-decrease')) {
                const productId = e.target.dataset.productId;
                this.updateQuantity(productId, -1);
            }
        });
        
        // Cart toggle
        const cartToggle = document.querySelector('.cart-toggle');
        const cartDropdown = document.querySelector('.cart-dropdown');
        
        if (cartToggle && cartDropdown) {
            cartToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleCartDropdown(cartDropdown);
            });
            
            // Close cart on outside click
            document.addEventListener('click', (e) => {
                if (!cartToggle.contains(e.target) && !cartDropdown.contains(e.target)) {
                    this.closeCartDropdown(cartDropdown);
                }
            });
        }
        
        console.log('🛒 Cart functionality setup complete');
    },
    
    addToCart(productId, quantity = 1) {
        const product = this.state.products.find(p => p.id === productId);
        if (!product || !product.inStock) return;
        
        const existingItem = this.state.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.state.cart.push({
                productId: productId,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveToStorage();
        this.updateCartUI();
        this.showCartNotification('Prodotto aggiunto al carrello', 'success');
        
        console.log('🛒 Added to cart:', product.name);
    },
    
    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.productId !== productId);
        this.saveToStorage();
        this.updateCartUI();
        this.showCartNotification('Prodotto rimosso dal carrello', 'info');
    },
    
    updateQuantity(productId, change) {
        const item = this.state.cart.find(item => item.productId === productId);
        if (!item) return;
        
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.saveToStorage();
            this.updateCartUI();
        }
    },
    
    getCartTotal() {
        return this.state.cart.reduce((total, item) => {
            const product = this.state.products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    },
    
    getCartItemCount() {
        return this.state.cart.reduce((count, item) => count + item.quantity, 0);
    },
    
    updateCartUI() {
        // Update cart counter
        const cartCounter = document.querySelector('.cart-counter');
        const itemCount = this.getCartItemCount();
        
        if (cartCounter) {
            cartCounter.textContent = itemCount;
            cartCounter.style.display = itemCount > 0 ? 'block' : 'none';
        }
        
        // Update cart dropdown
        this.renderCartDropdown();
        
        // Update cart page
        this.renderCartPage();
    },
    
    renderCartDropdown() {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');
        
        if (!cartItems) return;
        
        if (this.state.cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Il carrello è vuoto</p>';
        } else {
            const itemsHTML = this.state.cart.map(item => {
                const product = this.state.products.find(p => p.id === item.productId);
                if (!product) return '';
                
                return `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <h4>${product.name}</h4>
                            <p>Quantità: ${item.quantity}</p>
                            <p class="cart-item-price">€${(product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button class="remove-from-cart" data-product-id="${product.id}">×</button>
                    </div>
                `;
            }).join('');
            
            cartItems.innerHTML = itemsHTML;
        }
        
        if (cartTotal) {
            cartTotal.textContent = `€${this.getCartTotal().toFixed(2)}`;
        }
    },
    
    renderCartPage() {
        const cartPage = document.querySelector('.cart-page');
        if (!cartPage) return;
        
        if (this.state.cart.length === 0) {
            cartPage.innerHTML = `
                <div class="cart-empty-state">
                    <h2>Il tuo carrello è vuoto</h2>
                    <p>Scopri i nostri prodotti e inizia la tua esperienza sostenibile</p>
                    <a href="/shop.html" class="btn btn-primary">Vai al Catalogo</a>
                </div>
            `;
            return;
        }
        
        const itemsHTML = this.state.cart.map(item => {
            const product = this.state.products.find(p => p.id === item.productId);
            if (!product) return '';
            
            return `
                <tr class="cart-row">
                    <td class="cart-product">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                        </div>
                    </td>
                    <td class="cart-price">€${product.price.toFixed(2)}</td>
                    <td class="cart-quantity">
                        <div class="quantity-controls">
                            <button class="quantity-decrease" data-product-id="${product.id}">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-increase" data-product-id="${product.id}">+</button>
                        </div>
                    </td>
                    <td class="cart-subtotal">€${(product.price * item.quantity).toFixed(2)}</td>
                    <td class="cart-remove">
                        <button class="remove-from-cart" data-product-id="${product.id}">Rimuovi</button>
                    </td>
                </tr>
            `;
        }).join('');
        
        cartPage.innerHTML = `
            <div class="cart-content">
                <h1>Carrello</h1>
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Prodotto</th>
                            <th>Prezzo</th>
                            <th>Quantità</th>
                            <th>Subtotale</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
                
                <div class="cart-summary">
                    <div class="cart-totals">
                        <h3>Riepilogo Ordine</h3>
                        <p>Subtotale: €${this.getCartTotal().toFixed(2)}</p>
                        <p>Spedizione: Gratuita</p>
                        <h4>Totale: €${this.getCartTotal().toFixed(2)}</h4>
                    </div>
                    <button class="btn btn-primary proceed-checkout">Procedi all'Ordine</button>
                </div>
            </div>
        `;
    },
    
    toggleCartDropdown(dropdown) {
        dropdown.classList.toggle('active');
    },
    
    closeCartDropdown(dropdown) {
        dropdown.classList.remove('active');
    },
    
    showCartNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    },
    
    /**
     * Wishlist Management
     */
    setupWishlist() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('wishlist-toggle') || 
                e.target.closest('.wishlist-toggle')) {
                
                const button = e.target.closest('.wishlist-toggle') || e.target;
                const productId = button.dataset.productId;
                this.toggleWishlist(productId, button);
            }
        });
        
        this.updateWishlistUI();
        console.log('💝 Wishlist functionality setup complete');
    },
    
    toggleWishlist(productId, button) {
        const product = this.state.products.find(p => p.id === productId);
        if (!product) return;
        
        const isInWishlist = this.state.wishlist.includes(productId);
        
        if (isInWishlist) {
            this.state.wishlist = this.state.wishlist.filter(id => id !== productId);
            button.classList.remove('active');
            button.querySelector('.heart-icon').textContent = '♡';
            this.showCartNotification('Rimosso dalla lista desideri', 'info');
        } else {
            this.state.wishlist.push(productId);
            button.classList.add('active');
            button.querySelector('.heart-icon').textContent = '♥';
            this.showCartNotification('Aggiunto alla lista desideri', 'success');
        }
        
        this.saveToStorage();
    },
    
    updateWishlistUI() {
        const wishlistButtons = document.querySelectorAll('.wishlist-toggle');
        
        wishlistButtons.forEach(button => {
            const productId = button.dataset.productId;
            const isInWishlist = this.state.wishlist.includes(productId);
            
            if (isInWishlist) {
                button.classList.add('active');
                button.querySelector('.heart-icon').textContent = '♥';
            } else {
                button.classList.remove('active');
                button.querySelector('.heart-icon').textContent = '♡';
            }
        });
    },
    
    /**
     * Product Filters and Search
     */
    setupProductFilters() {
        const filterButtons = document.querySelectorAll('.filter-button');
        const sortSelect = document.querySelector('.sort-select');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.filterProducts(category);
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
        
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
        
        console.log('🔍 Product filters setup complete');
    },
    
    filterProducts(category) {
        let filteredProducts = this.state.products;
        
        if (category && category !== 'all') {
            filteredProducts = this.state.products.filter(product => 
                product.category === category
            );
        }
        
        this.renderFilteredProducts(filteredProducts);
    },
    
    sortProducts(sortBy) {
        let sortedProducts = [...this.state.products];
        
        switch (sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Keep original order
                break;
        }
        
        this.renderFilteredProducts(sortedProducts);
    },
    
    renderFilteredProducts(products) {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;
        
        const productsHTML = products.map(product => 
            this.createProductCard(product)
        ).join('');
        
        productGrid.innerHTML = productsHTML || '<p>Nessun prodotto trovato</p>';
        
        // Update wishlist states
        setTimeout(() => this.updateWishlistUI(), 100);
    },
    
    setupProductSearch() {
        const searchInput = document.querySelector('.product-search');
        if (!searchInput) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const query = e.target.value.trim().toLowerCase();
                this.searchProducts(query);
            }, 300);
        });
    },
    
    searchProducts(query) {
        if (!query) {
            this.renderFilteredProducts(this.state.products);
            return;
        }
        
        const filteredProducts = this.state.products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.features.some(feature => feature.toLowerCase().includes(query))
        );
        
        this.renderFilteredProducts(filteredProducts);
    },
    
    /**
     * Checkout Process
     */
    setupCheckout() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('proceed-checkout')) {
                this.startCheckout();
            }
            
            if (e.target.classList.contains('checkout-step-btn')) {
                const step = parseInt(e.target.dataset.step);
                this.goToCheckoutStep(step);
            }
        });
        
        console.log('💳 Checkout functionality setup complete');
    },
    
    startCheckout() {
        if (this.state.cart.length === 0) {
            alert('Il carrello è vuoto');
            return;
        }
        
        // Redirect to checkout page or show modal
        this.showCheckoutModal();
    },
    
    showCheckoutModal() {
        // Create checkout modal (simplified version)
        const modal = document.createElement('div');
        modal.className = 'checkout-modal';
        modal.innerHTML = `
            <div class="checkout-modal-content">
                <div class="checkout-header">
                    <h2>Finalizza Ordine</h2>
                    <button class="checkout-close">×</button>
                </div>
                
                <div class="checkout-steps">
                    <div class="checkout-step active">
                        <h3>1. Dati di Spedizione</h3>
                        <form class="checkout-form">
                            <input type="text" placeholder="Nome" required>
                            <input type="text" placeholder="Cognome" required>
                            <input type="email" placeholder="Email" required>
                            <input type="tel" placeholder="Telefono" required>
                            <input type="text" placeholder="Indirizzo" required>
                            <input type="text" placeholder="Città" required>
                            <input type="text" placeholder="CAP" required>
                        </form>
                    </div>
                </div>
                
                <div class="checkout-summary">
                    <h3>Riepilogo Ordine</h3>
                    <p>Totale: €${this.getCartTotal().toFixed(2)}</p>
                    <button class="btn btn-primary complete-order">Completa Ordine</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Close modal
        modal.querySelector('.checkout-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Handle order completion
        modal.querySelector('.complete-order').addEventListener('click', (e) => {
            e.preventDefault();
            this.completeOrder();
            modal.remove();
        });
    },
    
    completeOrder() {
        // In real implementation, would process payment and create order
        console.log('💰 Processing order:', this.state.cart);
        
        // Clear cart
        this.state.cart = [];
        this.saveToStorage();
        this.updateCartUI();
        
        // Show success message
        this.showOrderSuccess();
    },
    
    showOrderSuccess() {
        alert('Ordine completato con successo! Riceverai una conferma via email.');
        // In real implementation, would show proper success page/modal
    },
    
    /**
     * Utility Methods
     */
    
    formatPrice(price) {
        return new Intl.NumberFormat(this.config.locale, {
            style: 'currency',
            currency: this.config.currency
        }).format(price);
    },
    
    formatDate(date) {
        return new Intl.DateTimeFormat(this.config.locale).format(new Date(date));
    },
    
    // Clear all data (for testing/admin purposes)
    clearAllData() {
        this.state.cart = [];
        this.state.wishlist = [];
        this.state.user = null;
        
        localStorage.removeItem(this.config.storage.cartKey);
        localStorage.removeItem(this.config.storage.wishlistKey);
        localStorage.removeItem(this.config.storage.userKey);
        
        this.updateCartUI();
        this.updateWishlistUI();
        
        console.log('🧹 All shop data cleared');
    }
};

// Initialize e-commerce system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on shop page or pages with shop functionality
    if (document.querySelector('.product-grid') || 
        document.querySelector('.cart-toggle') ||
        document.location.pathname.includes('shop')) {
        BioarchitetturaShop.init();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BioarchitetturaShop;
}