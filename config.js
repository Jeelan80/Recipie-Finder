// Configuration for Recipe Finder App
const config = {
    // Development configuration
    development: {
        backendURL: 'http://localhost:3000/api'
    },

    // Production configuration
    production: {
        backendURL: 'https://backend-arnnmmn98-jeelan80s-projects.vercel.app/api'
    }
};

// Auto-detect environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? config.development : config.production;

// Export configuration
window.APP_CONFIG = currentConfig;