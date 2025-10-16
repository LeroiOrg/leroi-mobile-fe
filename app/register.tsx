import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { registerStyles as styles } from '../styles/registerStyles';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      Alert.alert('Éxito', 'Registro completado exitosamente');
      router.push('/(tabs)');
    } else {
      Alert.alert('Error', 'Código de verificación incorrecto');
    }
  };

  return (
    <View style={styles.container}>


      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Regístrate con Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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

      <Modal visible={showTermsModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Términos y condiciones</Text>
            <ScrollView style={styles.termsScroll}>
              <Text style={styles.termsFullText}>
                LEROI es una plataforma web diseñada para generar rutas de aprendizaje personalizadas a partir de documentos cargados por los usuarios, quienes son totalmente responsables del contenido que suben y de su uso, debiendo cumplir con todas las leyes y regulaciones aplicables. LEROI en ningún caso se hace responsable del uso indebido de la plataforma, incluyendo, pero no limitado a, la generación, difusión o acceso a información que incite o facilite actividades ilegales, peligrosas o que atenten contra la seguridad pública. La plataforma y sus contenidos son propiedad de LEROI, y su uso indebido está prohibido. LEROI no se hace responsable por daños indirectos derivados del uso de la plataforma. LEROI puede modificar los servicios o los términos en cualquier momento, notificando a los usuarios registrados.
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

