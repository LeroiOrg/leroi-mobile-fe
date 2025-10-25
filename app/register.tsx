import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Modal, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { registerStyles as styles } from '../styles/registerStyles';
import API_CONFIG, { buildURL, getHeaders } from '@/config/api';

const API_BASE_URL = API_CONFIG.baseURL;
const API_KEY = API_CONFIG.apiKey;

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
    aceptaTerminos: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          'x-api-key': API_KEY || ''
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

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!formData.nombres || !formData.apellidos || !formData.email || !formData.contraseña || !formData.confirmarContraseña) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Por favor, ingresa un email válido');
      return false;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    
    if (!passwordRegex.test(formData.contraseña)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
      return false;
    }
    
    if (!formData.aceptaTerminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const emailCheckResponse = await fetch(`${API_BASE_URL}/users_authentication_path/check-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY || ''
          },
          body: JSON.stringify({ email: formData.email }),
        });

        if (!emailCheckResponse.ok) {
          const errorData = await emailCheckResponse.json();
          throw new Error(errorData.detail || 'Error al verificar el correo electrónico');
        }

        const emailCheckData = await emailCheckResponse.json();
        if (emailCheckData.exists) {
          Alert.alert('Error', 'Este correo electrónico ya está registrado');
          return;
        }

        const code = generateVerificationCode();
        setUserEmail(formData.email);

        await sendVerificationEmail(formData.email, code);

        setVerificationCode(code);
        setShowVerificationModal(true);
        
        Alert.alert('Éxito', 'Código de verificación enviado a tu correo');
      } catch (error) {
        Alert.alert('Error', 'Error al enviar el código de verificación');
        console.error('Error al enviar el código de verificación:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsSubmittingCode(true);
      const response = await fetch(`${API_BASE_URL}/users_authentication_path/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY || ''
        },
        body: JSON.stringify({ email: userEmail, code: userInputCode })
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Código de verificación correcto');
        setShowVerificationModal(false);
        await handleRegister();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.detail || 'Código de verificación incorrecto o expirado');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al verificar el código');
      console.error('Error al verificar el código:', error);
    } finally {
      setIsSubmittingCode(false);
    }
  };

  const handleRegister = async () => {
    const userData = {
      name: formData.nombres,
      last_name: formData.apellidos,
      email: formData.email,
      password: formData.contraseña,
      provider: 'email'
    };
    try {
      const response = await fetch(`${API_BASE_URL}/users_authentication_path/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY || ''
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al registrar el usuario');
      }
      router.push('/login');

    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  };

  const handleGoogleSignup = async () => {
    Alert.alert('Próximamente', 'Google Sign-In estará disponible en la próxima versión');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.registerBox}>
          <Text style={styles.title}>Regístrate</Text>
          <Text style={styles.subtitle}>Ingresa tus datos</Text>
          
          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Ingresa tu nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombres"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.nombres}
                onChangeText={(text) => handleChange('nombres', text)}
              />
            </View>
            
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Ingresa tus apellidos</Text>
              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.apellidos}
                onChangeText={(text) => handleChange('apellidos', text)}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ingresa tu correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ingresa tu contraseña</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Contraseña"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.contraseña}
                onChangeText={(text) => handleChange('contraseña', text)}
                secureTextEntry={!showPassword}
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

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirma tu contraseña</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Repite tu contraseña"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.confirmarContraseña}
                onChangeText={(text) => handleChange('confirmarContraseña', text)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsGroup}>
            <TouchableOpacity
              style={styles.termsLabel}
              onPress={() => handleChange('aceptaTerminos', !formData.aceptaTerminos)}
            >
              <View style={[styles.checkbox, formData.aceptaTerminos && styles.checkboxChecked]}>
                {formData.aceptaTerminos && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.termsText}>
                Acepto los{' '}
                <Text
                  style={styles.termsLink}
                  onPress={() => setShowTermsModal(true)}
                >
                  términos y condiciones
                </Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.haveAccount}>
              <Text style={styles.haveAccountText}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.loginLink}>Iniciar sesión</Text>
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
                {isSubmitting ? 'Registrando...' : 'Continuar'}
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
                {isLoading ? 'Cargando...' : 'Regístrate con Google'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>

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

      <Modal visible={showTermsModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Términos y condiciones</Text>
            <ScrollView style={styles.termsScroll}>
              <Text style={styles.termsFullText}>
                LEROI es una plataforma web diseñada para generar rutas de aprendizaje personalizadas a partir de documentos cargados por los usuarios, 
                quienes son totalmente responsables del contenido que suben y de su uso, debiendo cumplir con todas las leyes y regulaciones aplicables. LEROI en ningún caso se hace responsable del uso indebido de la plataforma, incluyendo, pero no limitado a, la generación, difusión o acceso a información que incite o facilite actividades ilegales, peligrosas o que atenten contra la seguridad pública.
                La plataforma y sus contenidos son propiedad de LEROI, y su uso indebido está prohibido. 
                LEROI no se hace responsable por daños indirectos derivados del uso de la plataforma. 
                LEROI puede modificar los servicios o los términos en cualquier momento, notificando a los usuarios registrados.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => setShowTermsModal(false)}
            >
              <Text style={styles.verifyButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}