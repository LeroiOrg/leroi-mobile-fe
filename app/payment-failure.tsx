import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { pricingStyles as styles } from '../styles/pricingStyles';

export default function PaymentFailureScreen() {
  const handleRetryPayment = () => {
    router.push('/pricing');
  };

  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.pricingContainerP}>
        <View style={styles.pricingBoxP}>
            {/* Icono de error */}
            <View style={styles.errorIcon}>
              <View style={styles.errorCircle}>
                <Text style={{ color: '#fff', fontSize: 40, fontWeight: 'bold', fontFamily: 'LexendDeca-Bold' }}>!</Text>
              </View>
            </View>

            {/* Título y mensaje principal */}
            <Text style={styles.pricingTitleP}>
              ¡Oops! Algo salió mal
            </Text>
            
            <Text style={styles.failureDetails}>
              Tu pago no pudo ser procesado.
            </Text>

            {/* Botones de acción */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                onPress={handleRetryPayment}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>
                  Intentar de nuevo
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                onPress={handleGoHome}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>
                  Ir al inicio
                </Text>
              </TouchableOpacity>
            </View>

            {/* Información adicional */}
            <View style={styles.infoNote}>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>No se realizó ningún cargo a tu cuenta. </Text>
                {'\n'}Por favor, intenta nuevamente.
              </Text>
            </View>

            {/* Timestamp */}
            <View style={styles.timestamp}>
              <Text style={styles.timestampText}>
                Fecha del error: {new Date().toLocaleString('es-ES')}
              </Text>
            </View>
          </View>
      </SafeAreaView>
    </>
  );
}