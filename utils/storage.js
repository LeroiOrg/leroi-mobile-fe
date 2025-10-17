import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async setToken(token) {
    await AsyncStorage.setItem('token', token);
  },
  
  async getToken() {
    return await AsyncStorage.getItem('token');
  },
  
  async removeToken() {
    await AsyncStorage.removeItem('token');
  },
  
  async setUserEmail(email) {
    await AsyncStorage.setItem('userEmail', email);
  },
  
  async getUserEmail() {
    return await AsyncStorage.getItem('userEmail');
  },
  
  async removeUserEmail() {
    await AsyncStorage.removeItem('userEmail');
  },
  
  async set2FAStatus(status) {
    await AsyncStorage.setItem('user2FA', status.toString());
  },
  
  async get2FAStatus() {
    const status = await AsyncStorage.getItem('user2FA');
    return status === 'true';
  },
  
  async remove2FAStatus() {
    await AsyncStorage.removeItem('user2FA');
  }
};