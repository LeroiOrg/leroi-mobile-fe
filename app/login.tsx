import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { registerStyles as styles } from '../styles/registerStyles';

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPasswordSubmitting, setIsForgotPasswordSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setUserEmail(formData.email);
        setShowVerificationModal(true);
        setIsSubmitting(false);
        Alert.alert('Éxito', 'Código de verificación enviado a tu correo');
      }, 1000);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      setShowVerificationModal(false);
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      router.push('/(tabs)');
    } else {
      Alert.alert('Error', 'Código de verificación incorrecto');
    }
  };

  const handleForgotPassword = () => {
    if (!forgotPasswordEmail) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico');
      return;
    }
    
    setIsForgotPasswordSubmitting(true);
    setTimeout(() => {
      setForgotPasswordEmail('');
      setShowForgotPassword(false);
      setIsForgotPasswordSubmitting(false);
      Alert.alert('Éxito', 'Correo enviado correctamente');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
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

            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Inicia sesión con Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={showForgotPassword} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingresa tu correo asociado a tu cuenta</Text>
            <TextInput
              style={styles.verificationInput}
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
      </Modal>

      <Modal visible={showVerificationModal} transparent animationType="fade">
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
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowVerificationModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
                <Text style={styles.verifyButtonText}>Verificar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}