import { storage } from './storage';
import { secureStorage } from './secureStorage';
import API_CONFIG, { buildURL, getHeaders } from '@/config/api';

const API_BASE_URL = API_CONFIG.baseURL;
const API_KEY = API_CONFIG.apiKey;

/**
 * Sistema de autenticación persistente con re-login automático
 * Usa cifrado nativo del dispositivo para guardar credenciales de forma segura
 */
export const persistentAuth = {
  /**
   * Guarda credenciales de forma cifrada después del login exitoso
   */
  async saveCredentials(email, password, has2FA = false) {
    try {
      await secureStorage.saveCredentials(email, password, has2FA);
      
      if (__DEV__) {
        console.log('🔐 Credenciales guardadas con cifrado AES-256');
      }
    } catch (error) {
      console.error('❌ Error guardando credenciales:', error);
    }
  },

  /**
   * Re-autentica automáticamente usando credenciales cifradas
   */
  async reAuthenticate() {
    try {
      // Obtener credenciales cifradas
      const credentials = await secureStorage.getCredentials();
      
      if (!credentials) {
        if (__DEV__) {
          console.log('⚠️ No hay credenciales guardadas para re-autenticar');
        }
        return null;
      }

      if (__DEV__) {
        console.log('🔄 Re-autenticando automáticamente (credenciales cifradas)...');
      }

      // Hacer login automático
      const response = await fetch(buildURL('/users_authentication_path/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      if (!response.ok) {
        if (__DEV__) {
          console.log('❌ Re-autenticación falló, limpiando credenciales');
        }
        // Si falla, limpiar credenciales (contraseña cambió o cuenta bloqueada)
        await this.clearCredentials();
        return null;
      }

      const data = await response.json();

      // Si requiere 2FA, no podemos continuar automáticamente
      if (data.requires_2fa) {
        if (__DEV__) {
          console.log('⚠️ Cuenta con 2FA - requiere intervención del usuario');
        }
        return { requires2FA: true, email: credentials.email };
      }

      // Guardar nuevo token
      await storage.setToken(data.access_token || data.token);
      await storage.setUserEmail(credentials.email);

      if (__DEV__) {
        console.log('✅ Re-autenticación exitosa - nuevo token guardado');
      }

      return {
        success: true,
        token: data.access_token || data.token
      };
    } catch (error) {
      console.error('❌ Error en re-autenticación:', error);
      return null;
    }
  },

  /**
   * Obtiene un token válido, re-autenticando si es necesario
   */
  async getValidToken() {
    // Primero intentar obtener token actual
    let token = await storage.getToken();
    
    if (token) {
      return token;
    }

    // Si no hay token, intentar re-autenticar
    if (__DEV__) {
      console.log('🔄 Token no disponible, intentando re-autenticación...');
    }

    const result = await this.reAuthenticate();
    
    if (result?.requires2FA) {
      // Caso especial: requiere 2FA
      return null;
    }

    return result?.token || null;
  },

  /**
   * Verifica si hay credenciales guardadas
   */
  async hasCredentials() {
    return await secureStorage.hasCredentials();
  },

  /**
   * Elimina credenciales cifradas
   */
  async clearCredentials() {
    await secureStorage.clearCredentials();
    
    if (__DEV__) {
      console.log('🗑️ Credenciales cifradas eliminadas');
    }
  },

  /**
   * Logout completo - elimina tokens Y credenciales cifradas
   */
  async logout() {
    // Limpiar tokens normales
    await storage.removeToken();
    await storage.removeUserEmail();
    await storage.remove2FAStatus();
    
    // Limpiar credenciales cifradas
    await this.clearCredentials();
    
    if (__DEV__) {
      console.log('👋 Logout completo - todos los datos eliminados');
    }
  }
};

/**
 * Cliente API con re-autenticación automática transparente
 */
export const persistentApiClient = {
  /**
   * Realiza una petición con manejo automático de token expirado
   */
  async fetch(endpoint, options = {}, retryCount = 0) {
    try {
      // Obtener token (re-autentica si es necesario)
      const token = await persistentAuth.getValidToken();
      
      if (!token) {
        if (__DEV__) {
          console.warn('⚠️ No hay token disponible');
        }
        throw new Error('No authenticated');
      }

      // Construir URL y headers
      const url = buildURL(endpoint);
      const headers = {
        ...getHeaders(token),
        ...(options.headers || {})
      };

      // Realizar petición
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Si es 401 y no hemos reintentado, re-autenticar y reintentar
      if (response.status === 401 && retryCount === 0) {
        if (__DEV__) {
          console.log('🔄 Token rechazado (401), re-autenticando...');
        }

        // Limpiar token actual
        await storage.removeToken();
        
        // Intentar re-autenticar
        const result = await persistentAuth.reAuthenticate();
        
        if (result?.success) {
          // Reintentar petición con nuevo token
          return this.fetch(endpoint, options, retryCount + 1);
        } else if (result?.requires2FA) {
          if (__DEV__) {
            console.log('⚠️ Requiere 2FA - no se puede re-autenticar automáticamente');
          }
          throw new Error('2FA_REQUIRED');
        } else {
          if (__DEV__) {
            console.log('❌ Re-autenticación falló - requiere login manual');
          }
          throw new Error('RE_AUTH_FAILED');
        }
      }

      return response;
    } catch (error) {
      console.error('❌ Error en petición API:', error);
      throw error;
    }
  },

  async get(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'GET' });
  },

  async post(endpoint, body, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  async put(endpoint, body, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  async patch(endpoint, body, options = {}) {
    return this.fetch(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  },

  async delete(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'DELETE' });
  }
};
