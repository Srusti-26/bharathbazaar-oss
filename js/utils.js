// BharatBazaar - Utility Functions
// This file demonstrates helper functions and utilities

// Translation System
const translations = {
    appName: { en: "BharatBazaar", hi: "भारतबाज़ार" },
    discover: { en: "Discover", hi: "खोजें" },
    products: { en: "Products", hi: "उत्पाद" },
    impact: { en: "Impact", hi: "प्रभाव" },
    addToCart: { en: "Add to Cart", hi: "कार्ट में जोड़ें" },
    checkout: { en: "Checkout", hi: "चेकआउट" },
    search: { en: "Search", hi: "खोजें" }
};

function translate(key, lang) {
    return translations[key] ? translations[key][lang] : key;
}

// Distance Calculation (Haversine Formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Time Estimation
function estimateTime(distance, mode) {
    const speeds = {
        walk: 5,    // km/h
        cycle: 15,  // km/h
        drive: 30   // km/h
    };
    
    const speed = speeds[mode] || speeds.walk;
    const timeInHours = distance / speed;
    const timeInMinutes = Math.round(timeInHours * 60);
    
    return timeInMinutes;
}

// Price Formatting
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

function calculateSavings(originalPrice, discountedPrice) {
    const savings = originalPrice - discountedPrice;
    const percentage = Math.round((savings / originalPrice) * 100);
    return { amount: savings, percentage };
}

// Date/Time Utilities
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function isStoreOpen(openTime, closeTime) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [openHour, openMin] = openTime.split(':').map(Number);
    const [closeHour, closeMin] = closeTime.split(':').map(Number);
    
    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;
    
    return currentTime >= openMinutes && currentTime <= closeMinutes;
}

// Local Storage Management
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

function clearLocalStorage(key) {
    try {
        if (key) {
            localStorage.removeItem(key);
        } else {
            localStorage.clear();
        }
        return true;
    } catch (e) {
        console.error('Error clearing localStorage:', e);
        return false;
    }
}

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

function validatePincode(pincode) {
    const re = /^[1-9][0-9]{5}$/;
    return re.test(pincode);
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Array Utilities
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

function unique(array) {
    return [...new Set(array)];
}

// String Utilities
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncate(str, length) {
    return str.length > length ? str.substring(0, length) + '...' : str;
}

// Number Utilities
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// ONDC Integration Helpers
function generateONDCId() {
    return 'ONDC-' + Date.now() + '-' + randomInt(1000, 9999);
}

function formatONDCCatalog(products) {
    return products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        seller_id: p.sellerId,
        available: true
    }));
}

// Geolocation Helpers
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }),
            error => reject(error)
        );
    });
}

// Analytics Helpers
function trackEvent(category, action, label) {
    console.log('Event:', { category, action, label });
    // Integration with analytics service would go here
}

function trackPageView(page) {
    console.log('Page View:', page);
    // Integration with analytics service would go here
}
