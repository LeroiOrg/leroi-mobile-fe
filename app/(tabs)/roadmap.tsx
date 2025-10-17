import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, Image, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { roadmapStyles as styles } from '../../styles/roadmapStyles';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from '../../utils/storage';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const PREPROCESSING_URL = process.env.EXPO_PUBLIC_PAYMENT_BE;
const LEARNING_URL = 'https://learning-path-be-1074530412091.us-east1.run.app';

export default function RoadmapScreen() {
  const [fileUploaded, setFileUploaded] = useState(null);
  const [showFileInfo, setShowFileInfo] = useState(false);
  const [previewCost, setPreviewCost] = useState('Calculando...');
  const [userCredits, setUserCredits] = useState('Cargando...');
  const [canUserPay, setCanUserPay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [fileData, setFileData] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showLoadingModal) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
      
      return () => {
        spinAnimation.stop();
        spinValue.setValue(0);
      };
    }
  }, [showLoadingModal, spinValue]);

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = await storage.getToken();
      if (!authToken) {
        router.push('/login');
        return;
      }

      try {
        const userResponse = await fetch(`${BACKEND_URL}/users_authentication_path/user-profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
        });

        if (!userResponse.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const userData = await userResponse.json();
        setUserData(userData.data);
      } catch (error) {
        console.error(error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, []);

  const convertToBase64 = (uri) => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result;
            const base64Data = base64String.split(',')[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };

  const getEmailFromToken = (token) => {
    try {
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '==='.slice((base64.length + 3) % 4);

      const payload = JSON.parse(atob(padded));
      return payload.email || payload.sub || null;
    } catch {
      return null;
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      const maxSize = 50 * 1024 * 1024;

      if (file.size > maxSize) {
        Alert.alert('Error', '¡El archivo supera nuestras capacidades de procesamiento! Prueba eliminando algunas páginas o imágenes del archivo...');
        return;
      }

      setShowLoadingModal(true);
      setLoadingText('Cargando documento 🧐');
      setFileUploaded(file);

      const base64Data = await convertToBase64(file.uri);
      const authToken = await storage.getToken();
      const email = getEmailFromToken(authToken);

      if (!email) {
        Alert.alert('Error', 'No se pudo obtener el correo del usuario.');
        return;
      }

      const dataToSend = {
        fileName: file.name,
        fileType: file.mimeType,
        fileSize: file.size,
        fileBase64: base64Data,
      };

      setFileData(dataToSend);

      // Get cost estimate
      const previewResponse = await fetch(`${PREPROCESSING_URL}/files/cost-estimates`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(dataToSend),
      });

      if (!previewResponse.ok) {
        throw new Error('Error al obtener la vista previa de costos');
      }

      const previewResult = await previewResponse.json();
      const credits_cost = previewResult.credits_cost || 1;
      const user_credits = userData?.credits || 0;

      setPreviewCost(`Costo: ${credits_cost.toLocaleString()} Créditos`);
      setUserCredits(`Actualmente tienes ${user_credits.toLocaleString()} créditos`);
      setCanUserPay(credits_cost > user_credits);
      setShowFileInfo(true);

      if (credits_cost > user_credits) {
        Alert.alert('Error', 'Créditos Insuficientes 😔');
      }

      // Analyze file for virus
      fetch(`${PREPROCESSING_URL}/files/analyses`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend),
      })
      .then(response => response.json())
      .then(result => {
        if (result.has_virus) {
          Alert.alert('Error', 'El archivo contiene virus. El usuario ha sido eliminado.');
        }
      })
      .catch(error => {
        console.error('Error al analizar el archivo:', error);
      });

    } catch (error) {
      console.error('Error al obtener la vista previa de costos:', error);
      Alert.alert('Error', 'Error al obtener el costo de procesamiento');
    } finally {
      setShowLoadingModal(false);
      setLoadingText('');
    }
  };

  const handleReset = () => {
    setFileUploaded(null);
    setShowFileInfo(false);
    setPreviewCost('Calculando...');
    setUserCredits('Cargando...');
  };

  const handleGenerateRoadmap = async () => {
    if (!fileData) {
      Alert.alert('Error', 'No has subido ningún archivo');
      return;
    }

    setShowFileInfo(false);
    setShowLoadingModal(true);
    setLoadingText('Buscando temas relacionados... 📈🧠📚');

    try {
      const authToken = await storage.getToken();
      const processResponse = await fetch(`${LEARNING_URL}/learning_path/documents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(fileData),
      });

      if (!processResponse.ok) {
        Alert.alert('Error', 'No puedes generar rutas de aprendizaje de temas sensibles');
        const errorData = await processResponse.json();
        throw new Error(errorData.detail);
      }

      const result = await processResponse.json();
      setTopics(result.themes);
      setShowTopicsModal(true);

    } catch (error) {
      console.error('Error en el proceso de IA:', error);
      Alert.alert('Error', 'Error al enviar los datos al backend');
    } finally {
      setShowLoadingModal(false);
      setLoadingText('');
    }
  };

  const updateUserCredits = async (amount) => {
    try {
      const authToken = await storage.getToken();
      const response = await fetch(`${BACKEND_URL}/users_authentication_path/user-credits/${encodeURIComponent(userData.email)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-api-key': API_KEY
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los créditos del usuario');
      }

      setUserData(prev => ({ ...prev, credits: prev.credits + amount }));
    } catch (error) {
      console.error('Error al actualizar créditos:', error);
    }
  };

  const extractJSON = (str) => {
    if (!str) {
      console.error('String vacío recibido');
      return null;
    }
    
    if (typeof str === 'object') {
      return str;
    }
    
    let cleaned = str.trim();
    cleaned = cleaned.replace(/^```(?:json|python|javascript|py)?\s*/i, '');
    cleaned = cleaned.replace(/```\s*$/g, '');
    
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) {
      console.error('No se encontraron llaves {} en el string');
      return null;
    }
    
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('Error al parsear JSON:', e);
      return null;
    }
  };

  const handleTopicSelect = async (topic) => {
    setShowTopicsModal(false);
    setShowLoadingModal(true);
    setLoadingText('Estamos creando tu ruta de aprendizaje 😁');
    
    try {
      const authToken = await storage.getToken();
      const response = await fetch(`${LEARNING_URL}/learning_path/roadmaps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-api-key': API_KEY
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el topic al backend');
      }

      const result = await response.json();
      
      const parseResult = extractJSON(result.roadmap);
      if (!parseResult) {
        throw new Error('No se pudo parsear el roadmap');
      }
      
      const parseSecondResult = extractJSON(result.extra_info);
      if (!parseSecondResult) {
        throw new Error('No se pudo parsear extra_info');
      }

      await updateUserCredits(-1);

      const relatedTopics = [
        'Programación en Python',
        'Algoritmos y Estructuras de Datos',
        'Bases de Datos SQL',
        'Redes de Computadores'
      ];
      
      router.push({
        pathname: '/generated-roadmap',
        params: {
          roadmapTopics: JSON.stringify(parseResult),
          roadmapInfo: JSON.stringify(parseSecondResult),
          relatedTopics: JSON.stringify(relatedTopics)
        }
      });
      
    } catch (error) {
      console.error('Error detallado al generar la ruta:', error);
      
      if (error instanceof SyntaxError) {
        Alert.alert('Error', 'Error al procesar la respuesta del servidor. El formato no es válido.');
      } else {
        Alert.alert('Error', 'No pudimos generar tu ruta de aprendizaje 😔');
      }
    } finally {
      setShowLoadingModal(false);
      setLoadingText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showFileInfo ? (
        <View style={styles.roadmapContainer}>
          <Text style={styles.title}>Sube un archivo para generar tu ruta de aprendizaje</Text>
          <TouchableOpacity style={styles.fileUpload} onPress={handleFileUpload}>
            <Image 
              source={require('../../assets/images/archivo.png')} 
              style={styles.uploadIcon} 
            />
            <Text style={styles.uploadText}>
              Arrastra y suelta tu archivo PDF aquí o haz clic para subirlo (Máx 50 MB)
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.fileInfoContainer}>
          <View style={styles.fileDetails}>
            <Text style={styles.fileDetailsTitle}>Detalles del Archivo</Text>
            <Text style={styles.fileInfo}>Nombre: {fileUploaded.name}</Text>
            <Text style={styles.fileInfo}>
              Tamaño: {(fileUploaded.size / (1024 * 1024)).toFixed(2)} MB
            </Text>
            
            <View style={styles.creditsContainer}>
              <Text style={styles.creditsTitle}>Costo de procesamiento</Text>
              <Text style={styles.previewCost}>{previewCost}</Text>
              <Text style={styles.userCredits}>{userCredits}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={[styles.generateButton, canUserPay && styles.generateButtonDisabled]} 
                onPress={handleGenerateRoadmap}
                disabled={canUserPay}
              >
                <Text style={styles.generateButtonText}>
                  {isLoading ? 'Generando...' : 'Generar ruta de aprendizaje'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Subir otro archivo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pdfPreview}>
            <Text style={styles.uploadText}>Vista previa del PDF</Text>
          </View>
        </View>
      )}

      <TouchableOpacity 
        style={styles.helpIcon} 
        onPress={() => setShowHelpModal(true)}
      >
        <Image 
          source={require('../../assets/images/Tutorial_logo.png')} 
          style={styles.tutorialIcon} 
        />
      </TouchableOpacity>

      <Modal visible={showTopicsModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.topicsModal}>
            <Text style={styles.topicsTitle}>Temas detectados en tu archivo</Text>
            <ScrollView style={styles.topicsContainer}>
              {topics.map((topic, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.topicButton}
                  onPress={() => handleTopicSelect(topic)}
                >
                  <Text style={styles.topicButtonText}>{topic}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showLoadingModal} transparent animationType="fade">
        <View style={[styles.modalOverlay, styles.loadingModal]}>
          <View style={styles.loadingContent}>
            <Text style={styles.loadingText}>{loadingText}</Text>
            <Animated.View 
              style={[
                styles.spinner,
                { transform: [{ rotate: spinInterpolate }] }
              ]} 
            />
          </View>
        </View>
      </Modal>

      <Modal visible={showHelpModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.videoModal}>
            <Text style={styles.topicsTitle}>Tutorial</Text>
            <Text style={styles.uploadText}>Aquí iría el video tutorial</Text>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowHelpModal(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}