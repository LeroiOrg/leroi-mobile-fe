import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Switch, Modal, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { pricingStyles as styles } from '../styles/pricingStyles';
import { storage } from '../utils/storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function PricingScreen() {
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState({
    credits: Array.isArray(params.credits) ? params.credits[0] || '' : params.credits || '',
    acceptTerms: false,
  });
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const fetchCreditsCost = async (amount: string) => {
    try {
      const query = `
        query GetPrice($credits: Int!) {
          price(credits: $credits) {
            credits
            cost
            currency
          }
        }`;

      const variables = { credits: parseInt(amount, 10) };

      const response = await fetch(`${API_BASE_URL}/payments-be`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'x-api-key': API_KEY || ''
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.data?.price) {
        return result.data.price.cost;
      } else {
        console.error('Error al calcular el costo:', result.errors || result);
        return null;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return null;
    }
  };

  useEffect(() => {
    const updateCostFromParams = async () => {
      if (params.credits) {
        const credits = Array.isArray(params.credits) ? params.credits[0] : params.credits;
        setFormData(prev => ({ ...prev, credits }));
        
        const totalCost = await fetchCreditsCost(credits);
        if (totalCost !== null) {
          setTotalCost(totalCost);
        }
      }
    };

    updateCostFromParams();
  }, [params.credits]);

  const handleCreditsChange = async (credits: string) => {
    setFormData(prev => ({ ...prev, credits }));
    
    if (credits) {
      const totalCost = await fetchCreditsCost(credits);
      if (totalCost !== null) {
        setTotalCost(totalCost);
      }
    } else {
      setTotalCost(0);
    }
  };

  const handleTermsToggle = (value: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: value }));
  };

  const createSession = async (authToken: string, credits: string, email: string) => {
    const query = `
      mutation CreateSession($authToken: String!, $credits: Int!, $email: String!) {
        createSession(authToken: $authToken, credits: $credits, email: $email) {
          sessionId
        }
      }
    `;

    const variables = { authToken, credits: parseInt(credits, 10), email };

    const response = await fetch(`${API_BASE_URL}/payments-be`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-api-key': API_KEY || ''
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    return result.data?.createSession?.sessionId || null;
  };

  const validateForm = () => {
    const creditsStr = Array.isArray(formData.credits) ? formData.credits[0] : formData.credits;
    if (!creditsStr || isNaN(parseInt(creditsStr)) || parseInt(creditsStr) <= 0) {
      Alert.alert('Error', 'Por favor, ingresa una cantidad válida de créditos.');
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
    setError(null);
    
    try {
      Alert.alert('Éxito', 'Redirigiendo a la plataforma de pago...');

      const authToken = await storage.getToken();
      const userEmail = await storage.getUserEmail();

      if (!authToken || !userEmail) {
        Alert.alert('Error', 'No se encontró información de autenticación');
        return;
      }

      // Obtener el precio desde GraphQL
      const creditsStr = Array.isArray(formData.credits) ? formData.credits[0] : formData.credits;
      const cost = await fetchCreditsCost(creditsStr);
      if (!cost) {
        Alert.alert('Error', 'No se pudo obtener el precio de los créditos.');
        return;
      }

      const sessionId = await createSession(authToken, creditsStr, userEmail);
      if (!sessionId) {
        Alert.alert('Error', 'No se pudo generar la sesión segura.');
        return;
      }

      // Mutación para crear preferencia de pago
      const query = `
        mutation CreatePref($input: PreferenceInput!) {
          createPreference(input: $input) {
            id
            initPoint
            sandboxInitPoint
          }
        }`;

      const variables = {
        input: {
          items: [
            {
              title: `${creditsStr} Créditos`,
              quantity: 1,
              unitPrice: cost,
              currencyId: "USD",
            },
          ],
          externalReference: `{"sessionId":"${sessionId}"}`,
        },
      };

      const response = await fetch(`${API_BASE_URL}/payments-be`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          'x-api-key': API_KEY || ''
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      const payment = result.data?.createPreference;
      if (payment) {
        console.log("Link de pago:", payment.initPoint);
        // Abrir el link de pago en el navegador
        await Linking.openURL(payment.initPoint);
      } else {
        console.error("Error en GraphQL:", result.errors);
        setError("Ocurrió un error al generar el enlace de pago.");
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      setError("Ocurrió un error al procesar la operación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Comprar Créditos</Text>
          </View>

          <ScrollView 
            style={styles.scrollContainer} 
            keyboardShouldPersistTaps="handled"
          >
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

              {/* Mensaje de error */}
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Modal de términos */}
          <Modal visible={showTermsModal} transparent animationType="fade">
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
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}