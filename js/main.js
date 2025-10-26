

// Global State
let currentLanguage = 'en';
let cart = [];
let wishlist = [];
let compareList = [];
let map = null;
let markers = null;
let userLocation = { lat: 28.6139, lng: 77.2090 };

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    renderSellers();
    renderProducts();
    updateCartBadge();
    updateWishlistBadge();
});

// Map Initialization
function initMap() {
    map = L.map('map').setView([userLocation.lat, userLocation.lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    markers = L.markerClusterGroup();
    addMarkersToMap();
}

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartBadge();
    showToast('Added to cart!', 'success');
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

// Wishlist Management
function toggleWishlistItem(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.findIndex(w => w.id === productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(product);
        showToast('Added to wishlist!', 'success');
    }
    
    updateWishlistBadge();
}

function updateWishlistBadge() {
    document.getElementById('wishlistBadge').textContent = wishlist.length;
}

// Product Rendering
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card animate-in';
    card.innerHTML = `
        <div class="product-icon">${product.icon}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-seller">${product.seller}</div>
        <div class="product-price">₹${product.price}</div>
        <button class="btn-primary" onclick="addToCart(${product.id})">
            🛒 Add to Cart
        </button>
    `;
    return card;
}

// Seller Rendering
function renderSellers() {
    const grid = document.getElementById('sellersGrid');
    grid.innerHTML = '';

    sellers.forEach(seller => {
        const card = createSellerCard(seller);
        grid.appendChild(card);
    });
}

function createSellerCard(seller) {
    const card = document.createElement('div');
    card.className = 'seller-card glass animate-in';
    card.innerHTML = `
        <div class="seller-type">${getShopIcon(seller.type)}</div>
        <div class="seller-name">${seller.name}</div>
        <div class="seller-info">
            <div>📍 ${seller.distance} km away</div>
            <div>⭐ ${seller.rating}</div>
        </div>
    `;
    card.onclick = () => openStoreDetail(seller.id);
    return card;
}

// Modal Management
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Show product details in modal
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div>${message}</div>`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Language Toggle
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    document.getElementById('langToggle').textContent = currentLanguage === 'en' ? 'हिं' : 'EN';
    showToast('Language switched!', 'info');
}

// Voice Search
function startVoiceSearch(type) {
    if (!('webkitSpeechRecognition' in window)) {
        showToast('Voice search not supported', 'error');
        return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = currentLanguage === 'en' ? 'en-IN' : 'hi-IN';
    recognition.start();
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        if (type === 'product') {
            document.getElementById('searchProducts').value = transcript;
            filterProducts();
        }
    };
}

// Filter Functions
function filterProducts() {
    const query = document.getElementById('searchProducts').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.seller.toLowerCase().includes(query)
    );
    renderFilteredProducts(filtered);
}

function filterSellers() {
    const radiusFilter = document.getElementById('radiusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    let filtered = sellers;
    
    if (radiusFilter !== 'all') {
        filtered = filtered.filter(s => s.distance <= parseFloat(radiusFilter));
    }
    
    if (typeFilter !== 'all') {
        filtered = filtered.filter(s => s.type === typeFilter);
    }
    
    renderFilteredSellers(filtered);
}

// ONDC Integration
function syncONDC() {
    showToast('Syncing to ONDC network...', 'info');
    setTimeout(() => {
        showToast('✅ Synced successfully!', 'success');
    }, 2000);
}

// Utility Functions
function getShopIcon(type) {
    const icons = {
        grocery: '🛒',
        pharmacy: '💊',
        electronics: '📱',
        clothing: '👕',
        restaurant: '🍽️',
        hardware: '🔧'
    };
    return icons[type] || '🏪';
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}
