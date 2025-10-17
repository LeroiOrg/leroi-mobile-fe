import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { router, Stack } from 'expo-router';
import { pricingStyles as styles } from '../styles/pricingStyles';

export default function PaymentSuccessScreen() {
  const handleViewProfile = () => {
    router.push('/(tabs)/profile');
  };

  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  const handleCreateRoadmap = () => {
    router.push('/roadmap');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.pricingContainerP}>
        <View style={styles.pricingBoxP}>
          {/* Icono de éxito */}
          <View style={styles.successIcon}>
            <View style={styles.checkmarkCircle}>
              <Text style={{ color: '#fff', fontSize: 40, fontWeight: 'bold', fontFamily: 'LexendDeca-Bold' }}>✓</Text>
            </View>
          </View>

          {/* Título y mensaje principal */}
          <Text style={styles.pricingTitleP}>
            ¡Pago Exitoso!
          </Text>
          
          <Text style={styles.successDetails}>
            Tus créditos han sido añadidos a tu cuenta.
          </Text>

          {/* Botones de acción */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={handleCreateRoadmap}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>
                Crear un roadmap
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={handleViewProfile}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>
                Ver mi perfil
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
              <Text style={styles.boldText}>Tu transacción se completó de forma segura. </Text>
              Recibirás un email de confirmación en los próximos minutos.
            </Text>
          </View>

          {/* Timestamp */}
          <View style={styles.timestamp}>
            <Text style={styles.timestampText}>
              Pago procesado: {new Date().toLocaleString('es-ES')}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}