import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { pricingStyles as styles } from '../styles/pricingStyles';

export default function PricingScreen() {
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState({
    credits: params.credits || '',
    acceptTerms: false,
  });
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Simulación de precios (en producción esto vendría del backend)
  const creditsPricing = {
    '250': 5.99,
    '750': 15.99,
    '1500': 29.99
  };

  useEffect(() => {
    if (formData.credits) {
      const cost = creditsPricing[formData.credits] || 0;
      setTotalCost(cost);
    }
  }, [formData.credits]);

  const handleCreditsChange = (credits: string) => {
    setFormData(prev => ({ ...prev, credits }));
  };

  const handleTermsToggle = (value: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: value }));
  };

  const validateForm = () => {
    if (!formData.credits || !creditsPricing[formData.credits]) {
      Alert.alert('Error', 'Por favor, selecciona una cantidad válida de créditos.');
      return false;
    }
    if (!formData.acceptTerms) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simular procesamiento de pago
      Alert.alert(
        'Procesando pago',
        'Redirigiendo a la plataforma de pago...',
        [
          {
            text: 'OK',
            onPress: () => {
              // Simular éxito del pago
              setTimeout(() => {
                Alert.alert(
                  'Pago exitoso',
                  `Has comprado ${formData.credits} créditos por $${totalCost} USD`,
                  [
                    {
                      text: 'Continuar',
                      onPress: () => router.back()
                    }
                  ]
                );
              }, 2000);
            }
          }
        ]
      );
      
      // TODO: Implementar integración real con pasarela de pago
      // const sessionId = await createSession(authToken, formData.credits, userEmail);
      // const paymentLink = await createPreference(sessionId, formData.credits, totalCost);
      // Linking.openURL(paymentLink);
      
    } catch (error) {
      console.error('Error en el pago:', error);
      Alert.alert('Error', 'Ocurrió un error al procesar el pago.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Comprar Créditos</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.pricingBox}>
            <Text style={styles.title}>Comprar Créditos</Text>

            {/* Selector de créditos */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Cantidad de créditos</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.credits}
                  onValueChange={handleCreditsChange}
                  style={styles.picker}
                  dropdownIconColor="#fff"
                >
                  <Picker.Item label="Elige una opción" value="" color="#999" />
                  <Picker.Item label="250 Créditos" value="250" color="#fff" />
                  <Picker.Item label="750 Créditos" value="750" color="#fff" />
                  <Picker.Item label="1500 Créditos" value="1500" color="#fff" />
                </Picker>
              </View>
            </View>

            {/* Precio total */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Precio total</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>
                  ${totalCost.toFixed(2)} USD
                </Text>
              </View>
            </View>

            {/* Términos y condiciones */}
            <View style={styles.termsContainer}>
              <View style={styles.termsRow}>
                <Switch
                  value={formData.acceptTerms}
                  onValueChange={handleTermsToggle}
                  trackColor={{ false: '#4b5563', true: '#835BFC' }}
                  thumbColor="#fff"
                />
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>Acepto los </Text>
                  <TouchableOpacity onPress={() => setShowTermsModal(true)}>
                    <Text style={styles.termsLink}>términos y condiciones</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Botón de compra */}
            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Procesando...' : 'Comprar Créditos'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal de términos */}
        {showTermsModal && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Términos y condiciones</Text>
              <ScrollView style={styles.modalTextContainer}>
                <Text style={styles.modalText}>
                  Al realizar un pago por medio de la pasarela de pago de Leroi, el usuario acepta que no se realizarán 
                  devoluciones bajo ninguna circunstancia. Leroi no se hace responsable por el uso que el usuario dé a 
                  los créditos adquiridos ni por cualquier transacción realizada a través de la plataforma. 
                  Toda responsabilidad de pago, incluyendo cargos, montos adeudados y cualquier otro compromiso financiero, 
                  recae exclusivamente en el usuario, quien deberá asegurarse de cumplir con sus obligaciones de pago de 
                  manera adecuada.
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowTermsModal(false)}
              >
                <Text style={styles.modalCloseButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}