// BharatBazaar - Product Catalog Management
// This file demonstrates the product catalog structure

// Mock Data - Products
const products = [
    { id: 1, name: "Basmati Rice (5kg)", seller: "Sharma General Store", price: 200, icon: "🍚", sellerId: 1, category: "grocery" },
    { id: 2, name: "Toor Dal (1kg)", seller: "Sharma General Store", price: 75, icon: "🫘", sellerId: 1, category: "grocery" },
    { id: 3, name: "Paracetamol Tablets", seller: "Patel Medical", price: 12, icon: "💊", sellerId: 2, category: "pharmacy" },
    { id: 4, name: "First Aid Kit", seller: "Patel Medical", price: 200, icon: "🩹", sellerId: 2, category: "pharmacy" },
    { id: 5, name: "Samsung Mobile", seller: "Kumar Electronics", price: 15000, icon: "📱", sellerId: 3, category: "electronics" },
    { id: 6, name: "LED TV 32inch", seller: "Kumar Electronics", price: 18000, icon: "📺", sellerId: 3, category: "electronics" },
    { id: 7, name: "Cotton Shirt", seller: "Fashion Hub", price: 499, icon: "👕", sellerId: 4, category: "clothing" },
    { id: 8, name: "Designer Saree", seller: "Fashion Hub", price: 2499, icon: "🥻", sellerId: 4, category: "clothing" },
    { id: 9, name: "Chicken Biryani", seller: "Spice Kitchen", price: 180, icon: "🍛", sellerId: 5, category: "restaurant" },
    { id: 10, name: "Paneer Thali", seller: "Spice Kitchen", price: 150, icon: "🍽️", sellerId: 5, category: "restaurant" }
];

// Mock Data - Sellers
const sellers = [
    { 
        id: 1, 
        name: "Sharma General Store", 
        type: "grocery", 
        lat: 28.6129, 
        lng: 77.2295, 
        phone: "+91 98765 43210", 
        rating: 4.5, 
        verified: true, 
        distance: 0.2 
    },
    { 
        id: 2, 
        name: "Patel Medical", 
        type: "pharmacy", 
        lat: 28.6149, 
        lng: 77.2195, 
        phone: "+91 98765 43211", 
        rating: 4.8, 
        verified: true, 
        distance: 0.5 
    },
    { 
        id: 3, 
        name: "Kumar Electronics", 
        type: "electronics", 
        lat: 28.6189, 
        lng: 77.2390, 
        phone: "+91 98765 43212", 
        rating: 4.3, 
        verified: true, 
        distance: 0.8 
    },
    { 
        id: 4, 
        name: "Fashion Hub", 
        type: "clothing", 
        lat: 28.6109, 
        lng: 77.2195, 
        phone: "+91 98765 43213", 
        rating: 4.6, 
        verified: false, 
        distance: 1.2 
    },
    { 
        id: 5, 
        name: "Spice Kitchen", 
        type: "restaurant", 
        lat: 28.6159, 
        lng: 77.2295, 
        phone: "+91 98765 43214", 
        rating: 4.7, 
        verified: true, 
        distance: 0.4 
    }
];

// Shop Types Configuration
const shopTypes = [
    { type: "grocery", icon: "🛒", label_en: "Grocery", label_hi: "किराना" },
    { type: "pharmacy", icon: "💊", label_en: "Pharmacy", label_hi: "फार्मेसी" },
    { type: "electronics", icon: "📱", label_en: "Electronics", label_hi: "इलेक्ट्रॉनिक्स" },
    { type: "clothing", icon: "👕", label_en: "Clothing", label_hi: "कपड़े" },
    { type: "restaurant", icon: "🍽️", label_en: "Restaurant", label_hi: "रेस्तरां" },
    { type: "hardware", icon: "🔧", label_en: "Hardware", label_hi: "हार्डवेयर" }
];

// Product Categories
const categories = [
    { id: 'grocery', name: 'Grocery', icon: '🛒' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'restaurant', name: 'Food', icon: '🍽️' },
    { id: 'hardware', name: 'Hardware', icon: '🔧' }
];

// Catalog Functions
function getProductById(id) {
    return products.find(p => p.id === id);
}

function getSellerById(id) {
    return sellers.find(s => s.id === id);
}

function getProductsBySeller(sellerId) {
    return products.filter(p => p.sellerId === sellerId);
}

function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.seller.toLowerCase().includes(lowerQuery)
    );
}

function filterProductsByPrice(minPrice, maxPrice) {
    return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
}

function sortProducts(products, sortBy) {
    switch(sortBy) {
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'name':
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        default:
            return products;
    }
}

// Price Comparison
function calculatePriceComparison(basePrice) {
    return {
        storeVisit: Math.round(basePrice * 0.95), // 5% discount
        onlineDelivery: basePrice,
        marketPrice: Math.round(basePrice * 1.22) // 22% markup
    };
}

// Seller Functions
function getNearbySellers(maxDistance) {
    return sellers.filter(s => s.distance <= maxDistance);
}

function getSellersByType(type) {
    return sellers.filter(s => s.type === type);
}

function getVerifiedSellers() {
    return sellers.filter(s => s.verified);
}
