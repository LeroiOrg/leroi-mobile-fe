import { storage } from './storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const MOBILE_APP_KEY = process.env.EXPO_PUBLIC_MOBILE_APP_KEY;

export const validateToken = async () => {
  try {
    const token = await storage.getToken();
    if (!token) return false;

    const response = await fetch(`${API_BASE_URL}/users_authentication_path/validate-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY || '',
        'X-Mobile-App-Key': MOBILE_APP_KEY || ''
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

export const logout = async () => {
  await storage.removeToken();
  await AsyncStorage.removeItem('userEmail');
};