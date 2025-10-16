import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, Image, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { roadmapStyles as styles } from '../../styles/roadmapStyles';

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

  const handleFileUpload = () => {
    setFileUploaded({
      name: 'documento-ejemplo.pdf',
      size: 2.5 * 1024 * 1024
    });
    setPreviewCost('Costo: 5 Créditos');
    setUserCredits('Actualmente tienes 100 créditos');
    setCanUserPay(false);
    setShowFileInfo(true);
  };

  const handleReset = () => {
    setFileUploaded(null);
    setShowFileInfo(false);
    setPreviewCost('Calculando...');
    setUserCredits('Cargando...');
  };

  const handleGenerateRoadmap = () => {
    setShowFileInfo(false);
    setShowLoadingModal(true);
    setLoadingText('Buscando temas relacionados... 📈🧠📚');
    
    setTimeout(() => {
      setShowLoadingModal(false);
      setTopics([
        'Programación en Python',
        'Algoritmos y Estructuras de Datos',
        'Bases de Datos SQL',
        'Desarrollo Web'
      ]);
      setShowTopicsModal(true);
    }, 800);
  };

  const handleTopicSelect = (topic) => {
    setShowTopicsModal(false);
    setShowLoadingModal(true);
    setLoadingText('Estamos creando tu ruta de aprendizaje 😁');
    
    setTimeout(() => {
      setShowLoadingModal(false);
      router.push({
        pathname: '/generated-roadmap',
        params: { topic }
      });
    }, 1200);
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