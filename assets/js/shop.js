/**
 * Bioarchitettura® Shop JavaScript
 * E-commerce functionality for the shop page
 */

(function() {
    'use strict';

    // Shop state management
    const ShopState = {
        products: [],
        cart: JSON.parse(localStorage.getItem('bioarchitettura-cart') || '[]'),
        currentCategory: 'all',
        isCartOpen: false
    };

    // Product catalog
    const PRODUCTS = [
        // Magazine Subscriptions
        {
            id: 'subscription-annual',
            title: 'Abbonamento Annuale',
            description: 'Abbonamento completo alla rivista per un anno con spedizione gratuita',
            price: 45.00,
            originalPrice: null,
            category: 'subscriptions',
            badge: 'Bestseller',
            features: [
                '4-6 numeri all\'anno',
                'Spedizione gratuita',
                'Accesso all\'archivio digitale',
                'Newsletter esclusiva'
            ],
            icon: '📚'
        },
        {
            id: 'subscription-digital',
            title: 'Abbonamento Digitale',
            description: 'Versione digitale della rivista con accesso immediato',
            price: 30.00,
            originalPrice: 35.00,
            category: 'subscriptions',
            badge: 'Digital',
            features: [
                'Accesso immediato',
                'Archivio completo 1992-2024',
                'Download PDF',
                'Ricerca avanzata'
            ],
            icon: '💻'
        },
        {
            id: 'gift-subscription',
            title: 'Abbonamento Regalo',
            description: 'Il regalo perfetto per architetti e appassionati di sostenibilità',
            price: 50.00,
            originalPrice: null,
            category: 'subscriptions',
            badge: 'Regalo',
            features: [
                'Confezione regalo',
                'Carta personalizzata',
                'Spedizione gratuita',
                'Validità 12 mesi'
            ],
            icon: '🎁'
        },
        
        // Ebooks
        {
            id: 'ebook-materiali-naturali',
            title: 'Ebook: Materiali Naturali',
            description: 'Guida completa ai materiali naturali nell\'architettura sostenibile',
            price: 15.00,
            originalPrice: 20.00,
            category: 'ebooks',
            badge: 'New',
            features: [
                '150 pagine di contenuti',
                'Schede tecniche dettagliate',
                'Casi studio pratici',
                'Aggiornamenti gratuiti'
            ],
            icon: '🌿'
        },
        {
            id: 'ebook-bioarchitettura-guida',
            title: 'Ebook: Guida alla Bioarchitettura',
            description: 'Introduzione completa ai principi della bioarchitettura',
            price: 18.00,
            originalPrice: null,
            category: 'ebooks',
            badge: null,
            features: [
                'Principi fondamentali',
                'Tecniche costruttive',
                'Normativa italiana',
                'Esempi pratici'
            ],
            icon: '🏗️'
        },
        {
            id: 'ebook-casaclima-standard',
            title: 'Ebook: Standard Casaclima',
            description: 'Tutto quello che devi sapere sugli standard Casaclima',
            price: 25.00,
            originalPrice: null,
            category: 'ebooks',
            badge: null,
            features: [
                'Protocolli di certificazione',
                'Calcoli energetici',
                'Software PHPP',
                'Casi studio certificati'
            ],
            icon: '⚡'
        },

        // Books & Publications
        {
            id: 'libro-30-anni-bioarchitettura',
            title: '30 Anni di Bioarchitettura',
            description: 'Volume celebrativo dei 30 anni della rivista con i migliori articoli',
            price: 45.00,
            originalPrice: 55.00,
            category: 'books',
            badge: 'Limited',
            features: [
                '400 pagine a colori',
                'Copertina rigida',
                'Articoli selezionati',
                'Numerato e limitato'
            ],
            icon: '📖'
        },
        {
            id: 'manuale-progettazione-sostenibile',
            title: 'Manuale Progettazione Sostenibile',
            description: 'Guida pratica per architetti e ingegneri',
            price: 38.00,
            originalPrice: null,
            category: 'books',
            badge: null,
            features: [
                'Metodologie progettuali',
                'Dettagli costruttivi',
                'Software di calcolo',
                'Normativa aggiornata'
            ],
            icon: '📐'
        },
        {
            id: 'atlante-architettura-sostenibile',
            title: 'Atlante Architettura Sostenibile',
            description: 'Raccolta dei migliori progetti europei di architettura sostenibile',
            price: 65.00,
            originalPrice: 75.00,
            category: 'books',
            badge: 'Premium',
            features: [
                'Over 200 progetti',
                'Foto ad alta risoluzione',
                'Formato grande 24x30cm',
                'Testi in italiano e inglese'
            ],
            icon: '🏛️'
        },

        // Master & Courses
        {
            id: 'master-casaclima-bioarchitettura',
            title: 'Master Casaclima Bioarchitettura®',
            description: 'Il corso di formazione più completo per l\'architettura sostenibile',
            price: 2800.00,
            originalPrice: 3200.00,
            category: 'courses',
            badge: 'Early Bird',
            features: [
                '6 mesi di formazione',
                'Certificazione ufficiale',
                'Docenti internazionali',
                'Stage presso aziende partner'
            ],
            icon: '🎓'
        },
        {
            id: 'corso-materiali-naturali',
            title: 'Corso Materiali Naturali',
            description: 'Specializzazione sui materiali naturali nell\'edilizia',
            price: 450.00,
            originalPrice: null,
            category: 'courses',
            badge: null,
            features: [
                '3 giorni intensivi',
                'Laboratori pratici',
                'Crediti formativi',
                'Certificato di partecipazione'
            ],
            icon: '🧱'
        },
        {
            id: 'webinar-efficienza-energetica',
            title: 'Webinar Efficienza Energetica',
            description: 'Serie di 5 webinar sui temi dell\'efficienza energetica',
            price: 120.00,
            originalPrice: 150.00,
            category: 'courses',
            badge: 'Online',
            features: [
                '5 sessioni da 2 ore',
                'Registrazioni disponibili',
                'Q&A con esperti',
                'Materiali didattici inclusi'
            ],
            icon: '💡'
        }
    ];

    // DOM Elements
    let elements = {};

    // Initialize shop functionality
    function initShop() {
        // Get DOM elements
        elements = {
            productsGrid: document.querySelector('.products-grid'),
            categoryFilters: document.querySelectorAll('.category-filter'),
            cartIcon: document.querySelector('.cart-icon-container'),
            cartOverlay: document.querySelector('.cart-overlay'),
            cartSidebar: document.querySelector('.cart-sidebar'),
            cartClose: document.querySelector('.cart-close'),
            cartItems: document.querySelector('.cart-items'),
            cartCount: document.querySelector('.cart-count'),
            cartTotal: document.querySelector('.total-amount'),
            checkoutBtn: document.querySelector('.checkout-btn')
        };

        // Initialize products
        ShopState.products = PRODUCTS;
        
        // Render initial state
        renderProducts();
        updateCartUI();
        
        // Bind events
        bindEvents();
    }

    // Bind event listeners
    function bindEvents() {
        // Category filters
        elements.categoryFilters.forEach(filter => {
            filter.addEventListener('click', handleCategoryFilter);
        });

        // Cart toggle
        if (elements.cartIcon) {
            elements.cartIcon.addEventListener('click', toggleCart);
        }

        // Cart close
        if (elements.cartClose) {
            elements.cartClose.addEventListener('click', closeCart);
        }

        // Cart overlay
        if (elements.cartOverlay) {
            elements.cartOverlay.addEventListener('click', closeCart);
        }

        // Checkout button
        if (elements.checkoutBtn) {
            elements.checkoutBtn.addEventListener('click', proceedToCheckout);
        }

        // Keyboard accessibility
        document.addEventListener('keydown', handleKeyboard);
    }

    // Handle category filtering
    function handleCategoryFilter(e) {
        e.preventDefault();
        
        // Update active filter
        elements.categoryFilters.forEach(filter => filter.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update current category
        ShopState.currentCategory = e.target.dataset.category;
        
        // Re-render products
        renderProducts();
    }

    // Render products grid
    function renderProducts() {
        if (!elements.productsGrid) return;

        // Filter products by category
        const filteredProducts = ShopState.currentCategory === 'all' 
            ? ShopState.products 
            : ShopState.products.filter(product => product.category === ShopState.currentCategory);

        // Generate HTML
        const html = filteredProducts.map(product => createProductHTML(product)).join('');
        
        // Update DOM
        elements.productsGrid.innerHTML = html;
        
        // Bind add to cart buttons
        bindAddToCartButtons();
    }

    // Create product card HTML
    function createProductHTML(product) {
        const savings = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        const isInCart = ShopState.cart.some(item => item.id === product.id);

        return `
            <article class="product-card" data-product-id="${product.id}">
                ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ''}
                
                <div class="product-image">
                    ${product.icon}
                </div>
                
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                
                <ul class="product-features">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <div class="product-footer">
                    <div class="product-price">
                        <span class="price-current">€${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="price-original">€${product.originalPrice.toFixed(2)}</span>` : ''}
                        ${savings > 0 ? `<span class="product-savings">Risparmi ${savings}%</span>` : ''}
                    </div>
                    
                    <button class="add-to-cart" 
                            data-product-id="${product.id}"
                            ${isInCart ? 'disabled' : ''}>
                        ${isInCart ? 'Nel carrello' : 'Aggiungi'}
                    </button>
                </div>
            </article>
        `;
    }

    // Bind add to cart button events
    function bindAddToCartButtons() {
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });
    }

    // Handle add to cart
    function handleAddToCart(e) {
        e.preventDefault();
        
        const productId = e.target.dataset.productId;
        const product = ShopState.products.find(p => p.id === productId);
        
        if (product) {
            addToCart(product);
            
            // Update button state
            e.target.textContent = 'Nel carrello';
            e.target.disabled = true;
            
            // Show success notification
            showNotification(`${product.title} aggiunto al carrello!`, 'success');
        }
    }

    // Add product to cart
    function addToCart(product) {
        const existingItem = ShopState.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            ShopState.cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                icon: product.icon,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartUI();
    }

    // Remove product from cart
    function removeFromCart(productId) {
        ShopState.cart = ShopState.cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
        
        // Update add to cart button
        const button = document.querySelector(`[data-product-id="${productId}"]`);
        if (button) {
            button.textContent = 'Aggiungi';
            button.disabled = false;
        }
    }

    // Update product quantity
    function updateQuantity(productId, newQuantity) {
        const item = ShopState.cart.find(item => item.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                saveCart();
                updateCartUI();
            }
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('bioarchitettura-cart', JSON.stringify(ShopState.cart));
    }

    // Update cart UI
    function updateCartUI() {
        updateCartCount();
        updateCartItems();
        updateCartTotal();
    }

    // Update cart count badge
    function updateCartCount() {
        if (elements.cartCount) {
            const totalItems = ShopState.cart.reduce((sum, item) => sum + item.quantity, 0);
            elements.cartCount.textContent = totalItems;
            elements.cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Update cart items list
    function updateCartItems() {
        if (!elements.cartItems) return;

        if (ShopState.cart.length === 0) {
            elements.cartItems.innerHTML = `
                <div class="cart-empty">
                    Il tuo carrello è vuoto
                </div>
            `;
            return;
        }

        const html = ShopState.cart.map(item => createCartItemHTML(item)).join('');
        elements.cartItems.innerHTML = html;
        
        // Bind cart item controls
        bindCartItemControls();
    }

    // Create cart item HTML
    function createCartItemHTML(item) {
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    ${item.icon}
                </div>
                
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                    
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-action="decrease" data-item-id="${item.id}">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" data-action="increase" data-item-id="${item.id}">+</button>
                        </div>
                        
                        <button class="remove-item" data-item-id="${item.id}" aria-label="Rimuovi dal carrello">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Bind cart item control events
    function bindCartItemControls() {
        // Quantity buttons
        const quantityBtns = document.querySelectorAll('.quantity-btn');
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', handleQuantityChange);
        });

        // Remove buttons
        const removeBtns = document.querySelectorAll('.remove-item');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', handleRemoveItem);
        });
    }

    // Handle quantity changes
    function handleQuantityChange(e) {
        e.preventDefault();
        
        const itemId = e.target.dataset.itemId;
        const action = e.target.dataset.action;
        const item = ShopState.cart.find(item => item.id === itemId);
        
        if (item) {
            const newQuantity = action === 'increase' 
                ? item.quantity + 1 
                : item.quantity - 1;
            
            updateQuantity(itemId, newQuantity);
        }
    }

    // Handle remove item
    function handleRemoveItem(e) {
        e.preventDefault();
        
        const itemId = e.target.dataset.itemId;
        removeFromCart(itemId);
        
        showNotification('Prodotto rimosso dal carrello', 'info');
    }

    // Update cart total
    function updateCartTotal() {
        if (elements.cartTotal) {
            const total = ShopState.cart.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0);
            elements.cartTotal.textContent = `€${total.toFixed(2)}`;
        }
        
        // Enable/disable checkout button
        if (elements.checkoutBtn) {
            elements.checkoutBtn.disabled = ShopState.cart.length === 0;
        }
    }

    // Toggle cart sidebar
    function toggleCart() {
        if (ShopState.isCartOpen) {
            closeCart();
        } else {
            openCart();
        }
    }

    // Open cart sidebar
    function openCart() {
        ShopState.isCartOpen = true;
        if (elements.cartOverlay) elements.cartOverlay.classList.add('active');
        if (elements.cartSidebar) elements.cartSidebar.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        if (elements.cartClose) {
            elements.cartClose.focus();
        }
    }

    // Close cart sidebar
    function closeCart() {
        ShopState.isCartOpen = false;
        if (elements.cartOverlay) elements.cartOverlay.classList.remove('active');
        if (elements.cartSidebar) elements.cartSidebar.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Handle keyboard navigation
    function handleKeyboard(e) {
        // Close cart on Escape
        if (e.key === 'Escape' && ShopState.isCartOpen) {
            closeCart();
        }
    }

    // Proceed to checkout
    function proceedToCheckout() {
        if (ShopState.cart.length === 0) {
            showNotification('Il carrello è vuoto', 'error');
            return;
        }

        // For demo purposes, show checkout modal
        showCheckoutModal();
    }

    // Show checkout modal (simplified version)
    function showCheckoutModal() {
        const modal = document.createElement('div');
        modal.className = 'checkout-modal';
        modal.innerHTML = `
            <div class="checkout-modal-content" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                max-width: 500px;
                width: 90%;
                z-index: 2000;
            ">
                <h2 style="margin-bottom: 1rem; color: var(--primary-green);">🛒 Checkout</h2>
                <p style="margin-bottom: 1.5rem; color: var(--stone-gray-dark);">
                    Per completare l'acquisto, sarai reindirizzato al nostro sistema di pagamento sicuro.
                </p>
                
                <div style="background: var(--cream-white); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem;">Riepilogo Ordine:</h3>
                    ${ShopState.cart.map(item => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>${item.title} (x${item.quantity})</span>
                            <span>€${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                    <hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--stone-gray-light);">
                    <div style="display: flex; justify-content: space-between; font-weight: bold;">
                        <span>Totale:</span>
                        <span style="color: var(--primary-green);">€${ShopState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-secondary" onclick="this.closest('.checkout-modal').remove()" style="flex: 1;">
                        Annulla
                    </button>
                    <button class="btn btn-primary" onclick="completeCheckout()" style="flex: 1;">
                        Procedi al Pagamento
                    </button>
                </div>
            </div>
        `;

        // Add overlay
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Complete checkout (demo function)
    window.completeCheckout = function() {
        // Remove modal
        document.querySelector('.checkout-modal')?.remove();
        
        // Clear cart
        ShopState.cart = [];
        saveCart();
        updateCartUI();
        closeCart();
        
        // Show success message
        showNotification('Ordine completato con successo! Riceverai una conferma via email.', 'success');
        
        // Re-render products to reset button states
        renderProducts();
    };

    // Notification system (reuse from main.js or create simplified version)
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            ">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Chiudi notifica" style="
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0.8;
                    line-height: 1;
                ">&times;</button>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
            color: '#FEFEFE',
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '1000',
            maxWidth: '400px',
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
                notification.remove();
            }
        }, 5000);

        document.body.appendChild(notification);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShop);
    } else {
        initShop();
    }

    // Export for external use
    window.BioarchitetturaShop = {
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        getCart: () => ShopState.cart,
        clearCart: () => {
            ShopState.cart = [];
            saveCart();
            updateCartUI();
        }
    };

})();