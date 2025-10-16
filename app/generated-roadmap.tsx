import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import Svg, { Line } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import generatedRoadmapStyles from '../styles/generatedRoadmapStyles';

const styles = generatedRoadmapStyles;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function GeneratedRoadmapScreen() {
  const params = useLocalSearchParams();
  const selectedTopic = params.topic as string;
  
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const roadmapRef = useRef(null);

  // Simular datos como en el archivo original
  const roadmapTopics = {
    [selectedTopic]: {
      'Fundamentos': ['Variables y tipos de datos', 'Estructuras de control', 'Funciones'],
      'Intermedio': ['Programación orientada a objetos', 'Manejo de archivos', 'Excepciones'],
      'Avanzado': ['Decoradores', 'Generadores', 'Metaclases']
    }
  };

  const [levelOffset] = useState(120);
  const [nodeWidth] = useState(220);

  const handleNodePress = (label) => {
    setSelectedNode({ label, info: `Información detallada sobre ${label}` });
    setShowNodeModal(true);
  };

  const handleSaveRoadmap = () => {
    setSaveMessage('Roadmap guardado correctamente');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDownload = async (format) => {
    setShowDownloadModal(false);
    
    try {
      if (format === 'JSON') {
        await downloadJSON();
      } else if (format === 'Imagen') {
        await downloadImage();
      } else if (format === 'PDF') {
        await downloadPDF();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo descargar el archivo');
    }
  };

  const downloadJSON = async () => {
    const jsonData = JSON.stringify(roadmapTopics, null, 2);
    const fileUri = FileSystem.documentDirectory + 'roadmap.json';
    
    await FileSystem.writeAsStringAsync(fileUri, jsonData);
    await Sharing.shareAsync(fileUri);
    
    setSaveMessage('JSON descargado correctamente');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const downloadImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesitan permisos para guardar la imagen');
      return;
    }

    const uri = await captureRef(roadmapRef, {
      format: 'png',
      quality: 1,
    });

    await MediaLibrary.saveToLibraryAsync(uri);
    setSaveMessage('Imagen guardada en galería');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const downloadPDF = async () => {
    // Capturar como imagen primero
    const uri = await captureRef(roadmapRef, {
      format: 'png',
      quality: 1,
    });

    // Compartir la imagen (en móvil no hay conversión directa a PDF)
    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: 'Compartir roadmap como imagen'
    });
    
    setSaveMessage('Roadmap compartido como imagen');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleGenerateQuestions = () => {
    setShowQuestionsModal(false);
    Alert.alert('Preguntas generadas', 'Redirigiendo a la sección de preguntas...');
  };

  // Generar nodos y edges como en el archivo original
  const generateNodesAndEdges = () => {
    const nodes = [];
    const edges = [];
    let idCounter = 0;

    if (roadmapTopics) {
      Object.keys(roadmapTopics).forEach((topicKey, topicIndex) => {
        const topicNode = {
          id: `topic-${idCounter++}`,
          data: { label: topicKey, color: '#ffca00' },
          position: { x: 50, y: 300 },
          type: 'topic',
        };
        nodes.push(topicNode);

        const topic = roadmapTopics[topicKey];
        let currentSubtopicY = 50;
        Object.keys(topic).forEach((subtopicKey, subtopicIndex) => {
          const subtopicNode = {
            id: `subtopic-${idCounter++}`,
            data: { label: subtopicKey, color: '#96E6B3' },
            position: { x: 50 + nodeWidth, y: currentSubtopicY },
            type: 'subtopic',
          };
          nodes.push(subtopicNode);
          edges.push({ 
            id: `e-${topicNode.id}-${subtopicNode.id}`, 
            source: topicNode.id, 
            target: subtopicNode.id,
            sourcePos: topicNode.position,
            targetPos: subtopicNode.position
          });

          let currentSubSubtopicY = currentSubtopicY;
          topic[subtopicKey].forEach((subSubtopic, index) => {
            const subSubtopicNode = {
              id: `subSubtopic-${idCounter++}`,
              data: { label: subSubtopic, color: '#FF92E6' },
              position: { x: 50 + nodeWidth * 2, y: currentSubSubtopicY },
              type: 'subsubtopic',
            };
            nodes.push(subSubtopicNode);
            edges.push({ 
              id: `e-${subtopicNode.id}-${subSubtopicNode.id}`, 
              source: subtopicNode.id, 
              target: subSubtopicNode.id,
              sourcePos: subtopicNode.position,
              targetPos: subSubtopicNode.position
            });
            currentSubSubtopicY += 80; // Espaciado entre sub-subtemas
          });
          
          // Calcular siguiente posición Y para subtopic
          const subtopicHeight = Math.max(80, topic[subtopicKey].length * 80);
          currentSubtopicY += subtopicHeight + 20; // Espaciado entre subtemas
        });
      });
    }

    return { nodes, edges };
  };

  const { nodes, edges } = generateNodesAndEdges();

  const renderNode = (node) => {
    const nodeStyle = node.type === 'topic' 
      ? [styles.topicNodeFlow, { backgroundColor: node.data.color }]
      : node.type === 'subtopic'
      ? [styles.subtopicNodeFlow, { backgroundColor: node.data.color }]
      : [styles.subSubtopicNodeFlow, { backgroundColor: node.data.color }];

    return (
      <TouchableOpacity
        key={node.id}
        style={[
          nodeStyle,
          {
            position: 'absolute',
            left: node.position.x,
            top: node.position.y,
          }
        ]}
        onPress={() => handleNodePress(node.data.label)}
      >
        <Text style={styles.nodeText}>{node.data.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderEdge = (edge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return null;

    const x1 = sourceNode.position.x + (sourceNode.type === 'topic' ? 180 : 160); // Borde derecho del nodo source
    const y1 = sourceNode.position.y + (sourceNode.type === 'topic' ? 40 : 30); // Centro vertical
    const x2 = targetNode.position.x; // Borde izquierdo del nodo target
    const y2 = targetNode.position.y + (targetNode.type === 'subsubtopic' ? 27 : 30);

    return (
      <Line
        key={edge.id}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#835BFC"
        strokeWidth="2"
      />
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ruta de Aprendizaje</Text>
      </View>

      <ScrollView 
        style={styles.roadmapContainer} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View ref={roadmapRef} style={styles.flowContainer}>
          {/* SVG para las líneas */}
          <Svg style={styles.svgContainer}>
            {edges.map(renderEdge)}
          </Svg>
          
          {/* Nodos */}
          {nodes.map(renderNode)}
        </View>
      </ScrollView>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleSaveRoadmap}>
          <Ionicons name="save" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={() => setShowDownloadModal(true)}>
          <Ionicons name="download" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={() => setShowQuestionsModal(true)}>
          <Ionicons name="help-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {saveMessage ? (
        <View style={styles.saveMessage}>
          <Text style={styles.saveMessageText}>{saveMessage}</Text>
        </View>
      ) : null}

      <Modal visible={showDownloadModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Seleccionar formato</Text>
            
            <TouchableOpacity style={styles.formatButton} onPress={() => handleDownload('JSON')}>
              <Text style={styles.formatButtonText}>JSON</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.formatButton} onPress={() => handleDownload('Imagen')}>
              <Text style={styles.formatButtonText}>Imagen</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.formatButton} onPress={() => handleDownload('PDF')}>
              <Text style={styles.formatButtonText}>PDF</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowDownloadModal(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showQuestionsModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>¿Quieres responder preguntas sobre los temas? 🧐</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.yesButton} onPress={handleGenerateQuestions}>
                <Text style={styles.yesButtonText}>Sí 😃</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.noButton} onPress={() => setShowQuestionsModal(false)}>
                <Text style={styles.noButtonText}>No 🙁</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showNodeModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.nodeModal}>
            <Text style={styles.nodeModalTitle}>{selectedNode?.label}</Text>
            <Text style={styles.nodeModalInfo}>{selectedNode?.info}</Text>
            
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowNodeModal(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </>
  );
}