import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import API_CONFIG, { buildURL, getHeaders } from '@/config/api';
import Constants from 'expo-constants';

export default function TestConnectionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setResults(prev => [...prev, `${icon} ${message}`]);
  };

  const testConnection = async () => {
    setResults([]);
    setIsLoading(true);

    try {
      // 1. Mostrar configuración
      addResult('=== CONFIGURACIÓN ===', 'info');
      addResult(`API URL: ${API_CONFIG.baseURL}`, 'info');
      addResult(`API Key: ${API_CONFIG.apiKey ? '***' + API_CONFIG.apiKey.slice(-4) : 'No configurada'}`, 'info');
      addResult(`Plataforma: ${Constants.platform?.android ? 'Android' : Constants.platform?.ios ? 'iOS' : 'Otro'}`, 'info');
      addResult(`Device: ${Constants.deviceName || 'Desconocido'}`, 'info');
      addResult('', 'info');

      // 2. Test de conectividad básica
      addResult('=== TEST 1: Conectividad Básica ===', 'info');
      const startTime = Date.now();
      
      try {
        const response = await fetch(API_CONFIG.baseURL, {
          method: 'GET',
          headers: getHeaders(),
        });
        
        const elapsed = Date.now() - startTime;
        addResult(`Tiempo de respuesta: ${elapsed}ms`, 'success');
        addResult(`Status HTTP: ${response.status}`, response.ok ? 'success' : 'error');
        
      } catch (error: any) {
        addResult(`Error de red: ${error.message}`, 'error');
        addResult('Posibles causas:', 'info');
        addResult('  - API no está corriendo', 'info');
        addResult('  - Firewall bloqueando conexión', 'info');
        addResult('  - URL incorrecta', 'info');
        addResult('  - Cleartext traffic bloqueado', 'info');
      }

      addResult('', 'info');

      // 3. Test de endpoint específico (si existe)
      addResult('=== TEST 2: Endpoint de Usuario ===', 'info');
      try {
        const userEndpoint = buildURL('/users_authentication_path/user-profile');
        addResult(`URL: ${userEndpoint}`, 'info');
        
        const response = await fetch(userEndpoint, {
          method: 'GET',
          headers: getHeaders(),
        });

        addResult(`Status: ${response.status}`, response.ok ? 'success' : 'error');
        
        if (response.ok) {
          const data = await response.json();
          addResult('Respuesta recibida correctamente', 'success');
        } else {
          addResult('Endpoint respondió con error', 'error');
        }
        
      } catch (error: any) {
        addResult(`Error: ${error.message}`, 'error');
      }

      addResult('', 'info');

      // 4. Información de debugging
      addResult('=== INFORMACIÓN DE DEBUGGING ===', 'info');
      addResult(`React Native: ${Constants.expoVersion || 'N/A'}`, 'info');
      addResult(`Expo SDK: ${Constants.expoConfig?.sdkVersion || 'N/A'}`, 'info');
      addResult(`App Version: ${Constants.expoConfig?.version || 'N/A'}`, 'info');

    } catch (error: any) {
      addResult(`Error inesperado: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Test de Conexión API</Text>
        <Text style={styles.subtitle}>Verifica la conectividad con el backend</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={testConnection}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="play-circle" size={24} color="#fff" />
              <Text style={styles.buttonText}>Iniciar Test</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {results.length === 0 ? (
          <Text style={styles.emptyText}>
            Presiona el botón para iniciar el test de conexión
          </Text>
        ) : (
          results.map((result, index) => (
            <Text key={index} style={styles.resultText}>
              {result}
            </Text>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040819',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#835BFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  resultText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 4,
    lineHeight: 18,
  },
});
