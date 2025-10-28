import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Almacenamiento seguro con cifrado nativo del dispositivo
 * iOS: Keychain
 * Android: EncryptedSharedPreferences con AES-256
 */
export const secureStorage = {
  /**
   * Guarda un valor de forma segura y cifrada
   */
  async setSecureItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        // En web, usar localStorage (no es seguro, solo para desarrollo)
        if (__DEV__) {
          console.warn('⚠️ SecureStore no disponible en web, usando localStorage');
        }
        localStorage.setItem(key, value);
        return;
      }

      await SecureStore.setItemAsync(key, value);
      
      if (__DEV__) {
        console.log(`🔐 Dato cifrado guardado: ${key}`);
      }
    } catch (error) {
      console.error(`Error guardando ${key} en SecureStore:`, error);
      throw error;
    }
  },

  /**
   * Obtiene un valor cifrado
   */
  async getSecureItem(key) {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }

      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (error) {
      console.error(`Error obteniendo ${key} de SecureStore:`, error);
      return null;
    }
  },

  /**
   * Elimina un valor cifrado
   */
  async deleteSecureItem(key) {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
      }

      await SecureStore.deleteItemAsync(key);
      
      if (__DEV__) {
        console.log(`🗑️ Dato cifrado eliminado: ${key}`);
      }
    } catch (error) {
      console.error(`Error eliminando ${key} de SecureStore:`, error);
    }
  },

  /**
   * Guarda credenciales cifradas del usuario
   */
  async saveCredentials(email, password, has2FA = false) {
    try {
      // Guardar cada campo por separado y cifrado
      await this.setSecureItem('secure_user_email', email);
      await this.setSecureItem('secure_user_password', password);
      await this.setSecureItem('secure_user_2fa', has2FA.toString());
      
      if (__DEV__) {
        console.log('🔐✅ Credenciales guardadas de forma cifrada');
      }
    } catch (error) {
      console.error('❌ Error guardando credenciales:', error);
      throw error;
    }
  },

  /**
   * Obtiene credenciales cifradas del usuario
   */
  async getCredentials() {
    try {
      const email = await this.getSecureItem('secure_user_email');
      const password = await this.getSecureItem('secure_user_password');
      const has2FA = await this.getSecureItem('secure_user_2fa');

      if (!email || !password) {
        return null;
      }

      return {
        email,
        password,
        has2FA: has2FA === 'true'
      };
    } catch (error) {
      console.error('❌ Error obteniendo credenciales:', error);
      return null;
    }
  },

  /**
   * Elimina todas las credenciales cifradas
   */
  async clearCredentials() {
    try {
      await this.deleteSecureItem('secure_user_email');
      await this.deleteSecureItem('secure_user_password');
      await this.deleteSecureItem('secure_user_2fa');
      
      if (__DEV__) {
        console.log('🗑️ Credenciales cifradas eliminadas');
      }
    } catch (error) {
      console.error('❌ Error eliminando credenciales:', error);
    }
  },

  /**
   * Verifica si hay credenciales guardadas
   */
  async hasCredentials() {
    try {
      const email = await this.getSecureItem('secure_user_email');
      return !!email;
    } catch (error) {
      return false;
    }
  }
};
