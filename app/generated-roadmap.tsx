import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import Svg, { Line } from 'react-native-svg';
import { Paths, File } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import generatedRoadmapStyles from '../styles/generatedRoadmapStyles';

// Constants
const styles = generatedRoadmapStyles;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const LEVEL_OFFSET = 150;
const NODE_WIDTH = 250;
const MESSAGE_TIMEOUT = 3000;

// Types
interface NodeData {
  label: string;
  color: string;
}

interface NodePosition {
  x: number;
  y: number;
}

interface Node {
  id: string;
  data: NodeData;
  position: NodePosition;
  type: 'topic' | 'subtopic' | 'subsubtopic';
}

interface Edge {
  id: string;
  source: string;
  target: string;
  sourcePos: NodePosition;
  targetPos: NodePosition;
}

interface SelectedNode {
  label: string;
  info: string;
}

export default function GeneratedRoadmapScreen() {
  const params = useLocalSearchParams();
  
  // Parse route params
  const roadmapTopics = useMemo(() => 
    params.roadmapTopics ? JSON.parse(params.roadmapTopics as string) : {},
    [params.roadmapTopics]
  );
  
  const roadmapInfo = useMemo(() => 
    params.roadmapInfo ? JSON.parse(params.roadmapInfo as string) : {},
    [params.roadmapInfo]
  );
  
  const relatedTopics = useMemo(() => 
    params.relatedTopics ? JSON.parse(params.relatedTopics as string) : [],
    [params.relatedTopics]
  );
  
  // Modal states
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Refs
  const roadmapRef = useRef(null);
  const pinchRef = useRef(null);

  // Zoom state
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [currentScale, setCurrentScale] = useState(1);

  // Node press handler
  const handleNodePress = useCallback((label: string) => {
    const info = roadmapInfo[label];
    let displayInfo = "Sin información disponible.";
    
    if (info) {
      if (Array.isArray(info)) {
        displayInfo = info.join("\n");
      } else if (typeof info === "object") {
        displayInfo = Object.entries(info)
          .map(([key, value]: [string, any]) => 
            `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
          )
          .join("\n");
      } else {
        displayInfo = info.toString();
      }
    }
    
    setSelectedNode({ label, info: displayInfo });
    setShowNodeModal(true);
  }, [roadmapInfo]);

  // Save message helper
  const showMessage = useCallback((message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), MESSAGE_TIMEOUT);
  }, []);

  // Download handlers
  const handleSaveRoadmap = useCallback(() => {
    showMessage('Roadmap guardado correctamente');
  }, [showMessage]);

  const downloadJSON = useCallback(async () => {
    try {
      const jsonData = JSON.stringify(roadmapTopics, null, 2);
      const file = new File(Paths.cache, 'roadmap.json');
      
      await file.write(jsonData);
      await Sharing.shareAsync(file.uri);
      
      showMessage('JSON descargado correctamente');
    } catch (error) {
      console.error('Error al descargar JSON:', error);
      Alert.alert('Error', 'No se pudo descargar el archivo JSON');
    }
  }, [roadmapTopics, showMessage]);

  const downloadImage = useCallback(async () => {
    try {
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
      showMessage('Imagen guardada en galería');
    } catch (error) {
      console.error('Error al guardar imagen:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen');
    }
  }, [showMessage]);

  const downloadPDF = useCallback(async () => {
    try {
      const uri = await captureRef(roadmapRef, {
        format: 'png',
        quality: 1,
      });

      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Compartir roadmap como imagen'
      });
      
      showMessage('Roadmap compartido como imagen');
    } catch (error) {
      console.error('Error al compartir:', error);
      Alert.alert('Error', 'No se pudo compartir el roadmap');
    }
  }, [showMessage]);

  const handleDownload = useCallback(async (format: string) => {
    setShowDownloadModal(false);
    
    try {
      switch (format) {
        case 'JSON':
          await downloadJSON();
          break;
        case 'Imagen':
          await downloadImage();
          break;
        case 'PDF':
          await downloadPDF();
          break;
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo descargar el archivo');
    }
  }, [downloadJSON, downloadImage, downloadPDF]);

  const handleGenerateQuestions = useCallback(() => {
    setShowQuestionsModal(false);
    Alert.alert('Preguntas generadas', 'Redirigiendo a la sección de preguntas...');
  }, []);

  // Zoom handlers
  const onPinchEvent = useCallback((event: any) => {
    'worklet';
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, event.nativeEvent.scale));
    scale.value = newScale;
    focalX.value = event.nativeEvent.focalX;
    focalY.value = event.nativeEvent.focalY;
    runOnJS(setCurrentScale)(newScale);
  }, []);

  const onPinchStateChange = useCallback((event: any) => {
    'worklet';
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const scaleChange = scale.value;
      translateX.value = translateX.value + (1 - scaleChange) * focalX.value;
      translateY.value = translateY.value + (1 - scaleChange) * focalY.value;
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    const newScale = Math.min(MAX_SCALE, currentScale + 0.3);
    scale.value = withSpring(newScale);
    setCurrentScale(newScale);
  }, [currentScale]);

  const handleZoomOut = useCallback(() => {
    const newScale = Math.max(MIN_SCALE, currentScale - 0.3);
    scale.value = withSpring(newScale);
    setCurrentScale(newScale);
  }, [currentScale]);

  const handleResetZoom = useCallback(() => {
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    setCurrentScale(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ]
  }));

  // Generate nodes and edges from roadmap data
  const generateNodesAndEdges = useCallback((): { nodes: Node[], edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let idCounter = 0;

    if (!roadmapTopics) {
      return { nodes, edges };
    }

    Object.keys(roadmapTopics).forEach((topicKey) => {
      const topicNode: Node = {
        id: `topic-${idCounter++}`,
        data: { label: topicKey, color: '#ffca00' },
        position: { x: 50, y: 500 },
        type: 'topic',
      };
      nodes.push(topicNode);

      const topic = roadmapTopics[topicKey];
      let currentSubtopicY = 50;

      Object.keys(topic).forEach((subtopicKey) => {
        const subtopicNode: Node = {
          id: `subtopic-${idCounter++}`,
          data: { label: subtopicKey, color: '#96E6B3' },
          position: { x: 50 + NODE_WIDTH, y: currentSubtopicY },
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
        
        topic[subtopicKey].forEach((subSubtopic: string) => {
          const subSubtopicNode: Node = {
            id: `subSubtopic-${idCounter++}`,
            data: { label: subSubtopic, color: '#FF92E6' },
            position: { x: 50 + NODE_WIDTH * 2, y: currentSubSubtopicY },
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
          
          currentSubSubtopicY += 100;
        });
        
        const subtopicHeight = Math.max(100, topic[subtopicKey].length * 100);
        currentSubtopicY += subtopicHeight + 40;
      });
    });

    return { nodes, edges };
  }, [roadmapTopics]);

  const { nodes, edges } = useMemo(() => generateNodesAndEdges(), [generateNodesAndEdges]);

  // Render node component
  const renderNode = useCallback((node: Node) => {
    const nodeStyle = 
      node.type === 'topic' 
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
        <Text style={styles.nodeText}>
          {node.data.label}
        </Text>
      </TouchableOpacity>
    );
  }, [handleNodePress]);

  // Render edge component
  const renderEdge = useCallback((edge: Edge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return null;

    const x1 = sourceNode.position.x + (sourceNode.type === 'topic' ? 200 : 180);
    const y1 = sourceNode.position.y + (sourceNode.type === 'topic' ? 45 : 35);
    const x2 = targetNode.position.x;
    const y2 = targetNode.position.y + (targetNode.type === 'subsubtopic' ? 32 : 35);

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
  }, [nodes]);

  // Get roadmap title
  const roadmapTitle = useMemo(() => {
    if (roadmapTopics && Object.keys(roadmapTopics).length > 0) {
      return Object.keys(roadmapTopics)[0];
    }
    return 'Ruta de Aprendizaje';
  }, [roadmapTopics]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{roadmapTitle}</Text>
      </View>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.View style={{ flex: 1 }}>
            <ScrollView 
              style={styles.roadmapContainer}
              showsVerticalScrollIndicator={true}
              bounces={true}
              alwaysBounceVertical={true}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                bounces={true}
                alwaysBounceHorizontal={true}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <Animated.View 
                  ref={roadmapRef} 
                  style={[
                    styles.flowContainer,
                    animatedStyle
                  ]}
                >
                  {/* SVG para las líneas */}
                  <Svg style={styles.svgContainer}>
                    {edges.map(renderEdge)}
                  </Svg>
                  
                  {/* Nodos */}
                  {nodes.map(renderNode)}
                </Animated.View>
              </ScrollView>
            </ScrollView>
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>

      {/* Indicador de zoom */}
      <View style={styles.zoomIndicator}>
        <Text style={styles.zoomIndicatorText}>
          Zoom: {(currentScale * 100).toFixed(0)}%
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
          <Ionicons name="remove" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleResetZoom}>
          <Ionicons name="expand" size={20} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
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