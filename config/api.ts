import Constants from 'expo-constants';

/**
 * Configuración centralizada de la API
 * Lee las variables de entorno desde app.config.js
 */
const API_CONFIG = {
  // URL base de la API
  baseURL: Constants.expoConfig?.extra?.apiUrl || process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000',
  
  // API Key
  apiKey: Constants.expoConfig?.extra?.apiKey || process.env.EXPO_PUBLIC_API_KEY || '',
  
  // Mobile App Key
  mobileAppKey: Constants.expoConfig?.extra?.mobileAppKey || process.env.EXPO_PUBLIC_MOBILE_APP_KEY || '',
  
  // Timeout por defecto (10 segundos)
  timeout: 10000,
  
  // Headers por defecto
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Logging para debugging (solo en desarrollo)
if (__DEV__) {
  console.log('🌐 API Configuration:');
  console.log('  - Base URL:', API_CONFIG.baseURL);
  console.log('  - API Key:', API_CONFIG.apiKey ? '***' + API_CONFIG.apiKey.slice(-4) : 'none');
  console.log('  - Mobile App Key:', API_CONFIG.mobileAppKey ? '***' + API_CONFIG.mobileAppKey.slice(-4) : 'none');
  console.log('  - Platform:', Constants.platform);
  console.log('  - Device:', Constants.deviceName);
} else {
  // En producción también loggeamos para debugging del APK
  console.log('🌐 API URL:', API_CONFIG.baseURL);
}

/**
 * Helper para construir URLs completas
 */
export const buildURL = (endpoint: string): string => {
  const base = API_CONFIG.baseURL.endsWith('/') 
    ? API_CONFIG.baseURL.slice(0, -1) 
    : API_CONFIG.baseURL;
  
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${base}${path}`;
};

/**
 * Helper para obtener headers con autenticación
 */
export const getHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = { ...API_CONFIG.headers };
  
  if (API_CONFIG.apiKey) {
    headers['X-Api-Key'] = API_CONFIG.apiKey;
  }
  
  if (API_CONFIG.mobileAppKey) {
    headers['X-Mobile-App-Key'] = API_CONFIG.mobileAppKey;
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export default API_CONFIG;
