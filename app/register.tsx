import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
      <View style={[styles.lightOrb, styles.orb1]} />
      <View style={[styles.lightOrb, styles.orb2]} />
      <View style={[styles.lightOrb, styles.orb3]} />
      <View style={[styles.lightOrb, styles.orb4]} />
      <View style={[styles.lightOrb, styles.orb5]} />

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
              <TouchableOpacity onPress={() => router.push('/(tabs)')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
  },
  registerBox: {
    backgroundColor: 'rgba(30, 31, 38, 0.95)',
    borderRadius: 16,
    padding: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 16,
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  termsGroup: {
    marginBottom: 24,
  },
  termsLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6366f1',
  },
  termsText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  termsLink: {
    color: '#6366f1',
  },
  haveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  haveAccountText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginLink: {
    color: '#6366f1',
    fontSize: 14,
  },
  buttonContainer: {
    gap: 18,
  },
  submitButton: {
    backgroundColor: '#835BFC',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: 'rgba(131, 91, 252, 0.43)',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  lightOrb: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(165, 113, 255, 0.3)',
    borderRadius: 75,
    opacity: 0.5,
  },
  orb1: {
    top: '10%',
    left: '10%',
  },
  orb2: {
    top: '60%',
    right: '10%',
  },
  orb3: {
    bottom: '20%',
    left: '20%',
  },
  orb4: {
    bottom: '30%',
    right: '40%',
  },
  orb5: {
    top: '10%',
    right: '20%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    padding: 32,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#835BFC',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalText: {
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    color: '#835BFC',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  verificationInput: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#835BFC',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  verifyButton: {
    flex: 1,
    backgroundColor: '#835BFC',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  termsScroll: {
    maxHeight: 200,
    marginBottom: 16,
  },
  termsFullText: {
    color: '#CCCCCC',
    textAlign: 'justify',
    lineHeight: 20,
  },
});