import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Modal, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { registerStyles as styles } from '../styles/registerStyles';
import { storage } from '../utils/storage';
import API_CONFIG, { buildURL, getHeaders } from '@/config/api';

const API_BASE_URL = API_CONFIG.baseURL;
const API_KEY = API_CONFIG.apiKey;
const MOBILE_APP_KEY = API_CONFIG.mobileAppKey;

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordSubmitting, setIsForgotPasswordSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);

  // Función auxiliar para generar un código de verificación
  const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Función para enviar el correo de verificación
  const sendVerificationEmail = async (email: string, code: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users_authentication_path/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY || '',
          'X-Mobile-App-Key': MOBILE_APP_KEY || ''
        },
        body: JSON.stringify({
          email: email,
          code: code
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al enviar el código de verificación');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error al enviar el email:', error);
      throw error;
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${API_BASE_URL}/users_authentication_path/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': API_KEY || '',
            'X-Mobile-App-Key': MOBILE_APP_KEY || ''
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || errorData.message || 'Error en el login');
        }

        const data = await response.json();

        // Verificar si se requiere 2FA
        if (data.status === '2fa_required') {
          setUserEmail(formData.email);
          await storage.setUserEmail(formData.email);
          await storage.set2FAStatus(true);
          const code = generateVerificationCode();
          await sendVerificationEmail(formData.email, code);
          setVerificationCode(code);
          setShowVerificationModal(true);
          Alert.alert('Éxito', 'Código de verificación enviado a tu correo');
        } else {
          // Si no se requiere 2FA, guardar el token y redirigir
          const token = data.access_token;
          await storage.setUserEmail(formData.email);
          await storage.set2FAStatus(false);
          await storage.setToken(token);
          router.replace('/(tabs)');
        }

      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Función para verificar el código de verificación
  const handleVerifyCode = async () => {
    try {
      setIsSubmittingCode(true);

      const verifyCodeResponse = await fetch(`${API_BASE_URL}/users_authentication_path/verify-2fa-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY || '',
          'X-Mobile-App-Key': MOBILE_APP_KEY || ''
        },
        body: JSON.stringify({
          email: userEmail,
          code: userInputCode,
        }),
      });

      if (!verifyCodeResponse.ok) {
        const errorData = await verifyCodeResponse.json();
        throw new Error(errorData.detail || 'Código de verificación incorrecto');
      }

      const verifyCodeData = await verifyCodeResponse.json();
      const token = verifyCodeData.access_token;
      await storage.setToken(token);

      setShowVerificationModal(false);
      router.replace('/(tabs)');

    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubmittingCode(false);
    }
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogleSignup = async () => {
    Alert.alert('Próximamente', 'Google Sign-In estará disponible en la próxima versión');
  };

  // Función para validar el formulario
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return false;
    }
    return true;
  };

  // Función para manejar el "Olvidé mi contraseña"
  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico');
      return;
    }
    if (!forgotPasswordEmail.includes('@')) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }

    setIsForgotPasswordSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users_authentication_path/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': API_KEY || '',
          'X-Mobile-App-Key': MOBILE_APP_KEY || ''
        },
        body: JSON.stringify({ email: forgotPasswordEmail })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }
      
      setForgotPasswordEmail('');
      setShowForgotPassword(false);
      Alert.alert('Éxito', 'Correo enviado correctamente');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsForgotPasswordSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.registerBox}>
          <Text style={styles.title}>Inicia sesión</Text>
          <Text style={styles.subtitle}>Ingresa tus datos</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ingresa tu correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              autoCorrect={false}
              importantForAutofill="yes"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ingresa tu contraseña</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Contraseña"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
                autoComplete="password"
                textContentType="password"
                autoCorrect={false}
                importantForAutofill="yes"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsGroup}>
            <View style={styles.haveAccount}>
              <Text style={styles.haveAccountText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.loginLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.haveAccount, { marginTop: 8 }]}>
              <TouchableOpacity onPress={() => setShowForgotPassword(true)}>
                <Text style={styles.loginLink}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Iniciando sesión...' : 'Continuar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignup}
              disabled={isLoading}
            >
              <Image
                source={require('../assets/images/google.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>
                {isLoading ? 'Cargando...' : 'Inicia sesión con Google'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showForgotPassword} transparent animationType="fade">
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingresa tu correo asociado a tu cuenta</Text>
            <TextInput
              style={styles.forgotPasswordInput}
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={forgotPasswordEmail}
              onChangeText={setForgotPasswordEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowForgotPassword(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleForgotPassword}
                disabled={isForgotPasswordSubmitting}
              >
                <Text style={styles.verifyButtonText}>
                  {isForgotPasswordSubmitting ? 'Enviando...' : 'Enviar'}
                </Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal visible={showVerificationModal} transparent animationType="fade">
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verifica tu correo</Text>
            <Text style={styles.modalText}>Enviamos un código de verificación a:</Text>
            <Text style={styles.emailText}>{userEmail}</Text>
            <TextInput
              style={styles.verificationInput}
              placeholder="* * * * * *"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              maxLength={6}
              value={userInputCode}
              onChangeText={setUserInputCode}
              editable={!isSubmittingCode}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowVerificationModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerifyCode}
                disabled={isSubmittingCode}
              >
                <Text style={styles.verifyButtonText}>
                  {isSubmittingCode ? 'Verificando...' : 'Verificar'}
                </Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}