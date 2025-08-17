/**
 * Shop Functionality for Bioarchitettura®
 * E-commerce features and cart management
 */

// Shopping cart state
let cart = [];
let cartTotal = 0;

// Product catalog
const products = {
    'abbonamento-annuale': {
        name: 'Abbonamento Annuale',
        price: 45,
        type: 'abbonamento'
    },
    'abbonamento-digital': {
        name: 'Abbonamento Digital',
        price: 30,
        type: 'abbonamento'
    },
    'abbonamento-regalo': {
        name: 'Abbonamento Regalo',
        price: 50,
        type: 'abbonamento'
    },
    'ebook-materiali': {
        name: 'Ebook: Materiali Bio-based',
        price: 25,
        type: 'ebook'
    },
    'ebook-bioclimatica': {
        name: 'Ebook: Progettazione Bioclimatica',
        price: 20,
        type: 'ebook'
    },
    'ebook-casa-passiva': {
        name: 'Ebook: Casa Passiva',
        price: 18,
        type: 'ebook'
    }
};

// Initialize shop functionality
document.addEventListener('DOMContentLoaded', function() {
    initShop();
    initCategoryTabs();
    initCart();
    initCheckout();
});

/**
 * Initialize Shop
 */
function initShop() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(productId, price);
        });
    });

    // Load cart from localStorage
    loadCartFromStorage();
}

/**
 * Category Tabs
 */
function initCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentSections = document.querySelectorAll('.shop-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            contentSections.forEach(section => {
                if (section.id === category) {
                    section.style.display = 'block';
                    // Animate in
                    section.style.opacity = '0';
                    setTimeout(() => {
                        section.style.opacity = '1';
                    }, 50);
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Cart Management
 */
function initCart() {
    const cartTrigger = document.getElementById('cart-trigger');
    const shoppingCart = document.getElementById('shopping-cart');
    const cartClose = document.getElementById('cart-close');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Toggle cart
    cartTrigger.addEventListener('click', function() {
        shoppingCart.classList.toggle('active');
    });

    // Close cart
    cartClose.addEventListener('click', function() {
        shoppingCart.classList.remove('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(event) {
        if (!shoppingCart.contains(event.target) && !cartTrigger.contains(event.target)) {
            shoppingCart.classList.remove('active');
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            openCheckoutModal();
        }
    });
}

/**
 * Add Item to Cart
 */
function addToCart(productId, price) {
    const product = products[productId];
    if (!product) return;

    // Check if item already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        showNotification('Prodotto già presente nel carrello', 'info');
        return;
    }

    // Add to cart
    const cartItem = {
        id: productId,
        name: product.name,
        price: price,
        type: product.type
    };

    cart.push(cartItem);
    updateCartDisplay();
    saveCartToStorage();
    
    // Show notification
    showNotification(`${product.name} aggiunto al carrello!`, 'success');
    
    // Add visual feedback to button
    const button = document.querySelector(`[data-product="${productId}"]`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Aggiunto!';
        button.style.background = 'var(--forest-green)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    }
}

/**
 * Remove Item from Cart
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Prodotto rimosso dal carrello', 'info');
}

/**
 * Update Cart Display
 */
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Update cart count
    cartCount.textContent = cart.length;
    
    // Calculate total
    cartTotal = cart.reduce((total, item) => total + item.price, 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Il carrello è vuoto</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">€${item.price}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    // Update cart trigger visibility
    const cartTrigger = document.getElementById('cart-trigger');
    if (cart.length > 0) {
        cartTrigger.style.display = 'flex';
    } else {
        cartTrigger.style.display = 'none';
    }
}

/**
 * Checkout Modal
 */
function initCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    const modalClose = document.getElementById('modal-close');
    const checkoutForm = document.getElementById('checkout-form');

    // Close modal
    modalClose.addEventListener('click', function() {
        closeCheckoutModal();
    });

    // Close modal when clicking outside
    checkoutModal.addEventListener('click', function(event) {
        if (event.target === checkoutModal) {
            closeCheckoutModal();
        }
    });

    // Handle form submission
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        processOrder();
    });

    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            updatePaymentInfo(this.value);
        });
    });
}

/**
 * Open Checkout Modal
 */
function openCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');

    // Update order summary
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name}</span>
            <span>€${item.price}</span>
        </div>
    `).join('');
    
    orderTotal.textContent = cartTotal.toFixed(2);

    // Show modal
    checkoutModal.classList.add('active');
    
    // Focus first input
    const firstInput = checkoutModal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

/**
 * Close Checkout Modal
 */
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.remove('active');
}

/**
 * Update Payment Info
 */
function updatePaymentInfo(paymentMethod) {
    // This would typically update payment fields based on method
    console.log('Payment method selected:', paymentMethod);
    
    // Add visual feedback
    const paymentLabels = document.querySelectorAll('.payment-method');
    paymentLabels.forEach(label => {
        const radio = label.querySelector('input[type="radio"]');
        if (radio.value === paymentMethod) {
            label.style.borderColor = 'var(--forest-green)';
            label.style.backgroundColor = 'var(--light-green)';
        } else {
            label.style.borderColor = 'var(--light-gray)';
            label.style.backgroundColor = 'transparent';
        }
    });
}

/**
 * Process Order
 */
function processOrder() {
    const formData = new FormData(document.getElementById('checkout-form'));
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            zip: formData.get('zip')
        },
        payment: formData.get('payment'),
        items: cart,
        total: cartTotal,
        orderDate: new Date().toISOString()
    };

    // Validate form
    if (!validateOrderForm(orderData)) {
        return;
    }

    // Simulate order processing
    showLoadingState();
    
    setTimeout(() => {
        // Simulate successful order
        completeOrder(orderData);
    }, 2000);
}

/**
 * Validate Order Form
 */
function validateOrderForm(orderData) {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zip'];
    
    for (let field of required) {
        if (!orderData.customer[field] || orderData.customer[field].trim() === '') {
            showNotification(`Il campo ${field} è obbligatorio`, 'error');
            return false;
        }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.customer.email)) {
        showNotification('Inserisci un indirizzo email valido', 'error');
        return false;
    }

    return true;
}

/**
 * Show Loading State
 */
function showLoadingState() {
    const submitButton = document.querySelector('#checkout-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Elaborazione...';
    
    // Store original text for restoration
    submitButton.dataset.originalText = originalText;
}

/**
 * Complete Order
 */
function completeOrder(orderData) {
    // Save order to localStorage (in a real app, this would go to a server)
    const orderId = 'BIO-' + Date.now();
    const order = {
        id: orderId,
        ...orderData
    };
    
    localStorage.setItem(`order_${orderId}`, JSON.stringify(order));

    // Clear cart
    cart = [];
    updateCartDisplay();
    saveCartToStorage();

    // Close modal
    closeCheckoutModal();

    // Show success message
    showOrderSuccess(orderId);
}

/**
 * Show Order Success
 */
function showOrderSuccess(orderId) {
    const successModal = document.createElement('div');
    successModal.className = 'checkout-modal active';
    successModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Ordine Completato!</h3>
            </div>
            <div class="modal-body" style="text-align: center; padding: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--forest-green); margin-bottom: 1rem;"></i>
                <h4>Grazie per il tuo ordine!</h4>
                <p>Il tuo ordine #${orderId} è stato ricevuto e sarà processato entro 24 ore.</p>
                <p>Riceverai una conferma via email con i dettagli dell'ordine.</p>
                <button class="btn btn-primary" onclick="this.closest('.checkout-modal').remove()">
                    Continua Shopping
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (successModal.parentElement) {
            successModal.remove();
        }
    }, 10000);
}

/**
 * Storage Functions
 */
function saveCartToStorage() {
    localStorage.setItem('bioarchitettura_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('bioarchitettura_cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartDisplay();
    }
}

/**
 * Utility Functions
 */
function formatPrice(price) {
    return `€${price.toFixed(2)}`;
}

function generateOrderId() {
    return 'BIO-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Analytics Tracking (placeholder)
 */
function trackPurchase(orderData) {
    // This would typically send data to Google Analytics or other tracking service
    console.log('Purchase tracked:', orderData);
}

function trackAddToCart(productId, productName, price) {
    // Track add to cart events
    console.log('Add to cart tracked:', { productId, productName, price });
}

/**
 * SEO and Structured Data
 */
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Bioarchitettura® Shop",
        "description": "Abbonamenti, ebooks e pubblicazioni per professionisti dell'architettura sostenibile",
        "url": window.location.origin + window.location.pathname
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Initialize structured data
document.addEventListener('DOMContentLoaded', addStructuredData);

/**
 * Accessibility Enhancements
 */
function initAccessibility() {
    // Add ARIA labels to cart items
    const updateCartAccessibility = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach((item, index) => {
            item.setAttribute('role', 'listitem');
            item.setAttribute('aria-label', `Prodotto ${index + 1} nel carrello`);
        });
    };

    // Update accessibility when cart changes
    const originalUpdateCart = updateCartDisplay;
    updateCartDisplay = function() {
        originalUpdateCart();
        updateCartAccessibility();
    };

    // Keyboard navigation for cart
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const shoppingCart = document.getElementById('shopping-cart');
            const checkoutModal = document.getElementById('checkout-modal');
            
            if (shoppingCart.classList.contains('active')) {
                shoppingCart.classList.remove('active');
            }
            
            if (checkoutModal.classList.contains('active')) {
                closeCheckoutModal();
            }
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);