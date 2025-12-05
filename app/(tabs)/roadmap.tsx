import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { roadmapStyles as styles } from '../../styles/roadmapStyles';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from '../../utils/storage';
<<<<<<< Updated upstream
import { persistentApiClient } from '../../utils/persistentAuth';
=======
import { persistentAuth } from '../../utils/persistentAuth';
>>>>>>> Stashed changes
import API_CONFIG, { buildURL, getHeaders } from '@/config/api';

const API_KEY = API_CONFIG.apiKey;
const BACKEND_URL = API_CONFIG.baseURL;


export default function RoadmapScreen() {
  const [fileUploaded, setFileUploaded] = useState<any>(null);
  const [showFileInfo, setShowFileInfo] = useState(false);
  const [previewCost, setPreviewCost] = useState('Calculando...');
  const [userCredits, setUserCredits] = useState('Cargando...');
  const [canUserPay, setCanUserPay] = useState(true);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [fileData, setFileData] = useState<any>(null);
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
      return () => spinAnimation.stop();
    }
  }, [showLoadingModal]);

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    const fetchUserData = async () => {
<<<<<<< Updated upstream
      try {
        const response = await persistentApiClient.get('/users_authentication_path/user-profile');
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
=======
      const authToken = await persistentAuth.getValidToken();
      if (!authToken) {
        router.push('/login');
        return;
      }

      try {
        const userResponse = await fetch(`${BACKEND_URL}/users_authentication_path/user-profile`, {
          method: 'GET',
          headers: {
            ...getHeaders(authToken)
          } as HeadersInit,
        });
>>>>>>> Stashed changes

        const userData = await response.json();
        setUserData(userData.data);
      } catch (error) {
        console.error(error);
        // Si falla, el persistentApiClient ya redirigió a login si es necesario
        const errorMessage = (error as Error).message;
        if (errorMessage === 'No authenticated' || errorMessage === 'RE_AUTH_FAILED') {
          router.push('/login');
        }
      }
    };

    fetchUserData();
  }, []);

  const convertToBase64 = (uri: string) => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String ? base64String.split(',')[1] : '';
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };

  const getEmailFromToken = (token: string) => {
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

      if (file.size && file.size > maxSize) {
        Alert.alert('Error', '¡El archivo supera nuestras capacidades de procesamiento! Prueba eliminando algunas páginas o imágenes del archivo...');
        return;
      }

      setShowLoadingModal(true);
      setLoadingText('Cargando documento 🧐');
      setFileUploaded(file);

      const base64Data = await convertToBase64(file.uri || '');
<<<<<<< Updated upstream
      // Usar email de userData en lugar de extraerlo del token
      const email = userData?.email;
=======
      const authToken = await persistentAuth.getValidToken();
      const email = getEmailFromToken(authToken || '');
>>>>>>> Stashed changes

      if (!email || !authToken) {
        Alert.alert('Error', 'No se pudo obtener el correo del usuario.');
        router.push('/login');
        return;
      }

      const dataToSend = {
        fileName: file.name,
        fileType: file.mimeType,
        fileSize: file.size || 0,
        fileBase64: base64Data,
      };

      setFileData(dataToSend);

<<<<<<< Updated upstream
      const previewResponse = await persistentApiClient.post('/files/cost-estimates', dataToSend);
=======
      const previewResponse = await fetch(`${BACKEND_URL}/files/cost-estimates`, {
        method: 'POST',
        headers: {
          ...getHeaders(authToken)
        } as HeadersInit,
        body: JSON.stringify(dataToSend),
      });
>>>>>>> Stashed changes

      if (!previewResponse.ok) throw new Error('Error al obtener la vista previa de costos');

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

      persistentApiClient.post('/files/analyses', dataToSend)
        .then(response => response.json())
        .then(result => {
          if (result.has_virus) {
            Alert.alert('Error', 'El archivo contiene virus. El usuario ha sido eliminado.');
          }
        })
        .catch(error => console.error('Error al analizar el archivo:', error));

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

    setShowLoadingModal(true);
    setLoadingText('Buscando temas relacionados... 📈🧠📚');

    try {
<<<<<<< Updated upstream
      console.log('🚀 URL que está usando:', `${BACKEND_URL}/learning_path/documents`);
      console.log('📦 Datos a enviar:', fileData);
      
      const processResponse = await persistentApiClient.post('/learning_path/documents', fileData);
=======
      const authToken = await persistentAuth.getValidToken();
      if (!authToken) {
        Alert.alert('Error', 'Sesión expirada');
        router.push('/login');
        return;
      }

      if (__DEV__) {
        console.log('📦 Enviando documento para procesamiento');
      }
      
      const processResponse = await fetch(`${BACKEND_URL}/learning_path/documents`, {
        method: 'POST',
        headers: {
          ...getHeaders(authToken)
        } as HeadersInit,
        body: JSON.stringify(fileData),
      });
>>>>>>> Stashed changes

      console.log('📡 Response status:', processResponse.status);
      const responseText = await processResponse.text();
      console.log('📄 Response text:', responseText);

      if (!processResponse.ok) {
        let errorMessage = 'Error del servidor';
        if (processResponse.status === 500) {
          errorMessage = 'Error interno del servidor. Por favor, inténtalo más tarde.';
        } else if (processResponse.status === 400) {
          errorMessage = 'No puedes generar rutas de aprendizaje de temas sensibles';
        }
        Alert.alert('Error', errorMessage);
        throw new Error(`HTTP ${processResponse.status}: ${responseText}`);
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        console.error('📄 Raw response:', responseText);
        throw new Error('La respuesta del servidor no es JSON válido');
      }

      console.log('✅ Parsed result:', result);
      setTopics(result.themes || []);
      setShowTopicsModal(true);

    } catch (error) {
      console.error('Error en el proceso de IA:', error);
      Alert.alert('Error', 'Error al enviar los datos al backend. Puedes intentarlo nuevamente.');
    } finally {
      setShowLoadingModal(false);
      setLoadingText('');
    }
  };

  const updateUserCredits = async (amount: number) => {
    try {
<<<<<<< Updated upstream
      const response = await persistentApiClient.patch(
        `/users_authentication_path/user-credits/${encodeURIComponent(userData?.email || '')}`,
        { amount }
      );
=======
      const authToken = await persistentAuth.getValidToken();
      if (!authToken) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${BACKEND_URL}/users_authentication_path/user-credits/${encodeURIComponent(userData?.email || '')}`, {
        method: 'PATCH',
        headers: {
          ...getHeaders(authToken)
        } as HeadersInit,
        body: JSON.stringify({ amount }),
      });
>>>>>>> Stashed changes

      if (!response.ok) throw new Error('Error al actualizar los créditos del usuario');

      setUserData((prev: any) => ({ ...prev, credits: prev.credits + amount }));
    } catch (error) {
      console.error('Error al actualizar créditos:', error);
    }
  };

  const extractJSON = (str: any) => {
    if (!str) return null;
    if (typeof str === 'object') return str;
    
    let cleaned = str.trim();
    cleaned = cleaned.replace(/^```(?:json|python|javascript|py)?\s*/i, '');
    cleaned = cleaned.replace(/```\s*$/g, '');
    
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1) return null;
    
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      return null;
    }
  };

  const handleTopicSelect = async (topic: string) => {
    setShowTopicsModal(false);
    setShowLoadingModal(true);
    setLoadingText('Estamos creando tu ruta de aprendizaje 😁');
    
    try {
<<<<<<< Updated upstream
      // Generate roadmap
      const response = await persistentApiClient.post('/learning_path/roadmaps', { topic });
=======
      const authToken = await persistentAuth.getValidToken();
      if (!authToken) {
        Alert.alert('Error', 'Sesión expirada');
        router.push('/login');
        return;
      }
      
      // Generate roadmap
      const response = await fetch(`${BACKEND_URL}/learning_path/roadmaps`, {
        method: 'POST',
        headers: {
          ...getHeaders(authToken)
        } as HeadersInit,
        body: JSON.stringify({ topic }),
      });
>>>>>>> Stashed changes

      if (!response.ok) throw new Error('Error al enviar el topic al backend');

      const result = await response.json();
      
      const roadmapData = typeof result.roadmap === 'string'
        ? JSON.parse(result.roadmap)
        : result.roadmap;

      const extraInfoData = typeof result.extra_info === 'string'
        ? JSON.parse(result.extra_info)
        : result.extra_info;

      await updateUserCredits(-1);

      // Get related topics
      const responseTopics = await persistentApiClient.post('/learning_path/related-topics', { topic });

      let relatedTopics = [];
      if (responseTopics.ok) {
        relatedTopics = await responseTopics.json();
      }
      
      router.push({
        pathname: '/generated-roadmap',
        params: {
          roadmapTopics: JSON.stringify(roadmapData),
          roadmapInfo: JSON.stringify(extraInfoData),
          relatedTopics: JSON.stringify(relatedTopics)
        }
      });
      
    } catch (error) {
      console.error('🚨 Error detallado al generar la ruta:', error);
      console.error('📜 Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      
      if (error instanceof SyntaxError) {
        Alert.alert('Error', 'Error al procesar la respuesta del servidor. El formato no es válido. Puedes intentarlo nuevamente.');
      } else {
        Alert.alert('Error', 'No pudimos generar tu ruta de aprendizaje 😔. Puedes intentarlo nuevamente.');
      }
      
      // Volver a mostrar el modal de temas para permitir reintentar
      setShowTopicsModal(true);
    } finally {
      setShowLoadingModal(false);
      setLoadingText('');
    }
  };

  // Función para navegar a roadmap de prueba
  const handleTestRoadmap = () => {
    const testData = {
      roadmapTopics: JSON.stringify({
        "Patrones de Arquitectura de Software": {
          "Fundamentos y Patrones Clásicos": [
            "Introducción a la Arquitectura de Software",
            "Patrón en Capas (Layered Pattern)",
            "Patrón Cliente-Servidor"
          ],
          "Patrones Orientados a Eventos": [
            "Arquitectura Dirigida por Eventos (EDA)",
            "Patrón de Sourcing de Eventos (Event Sourcing)",
            "Patrón CQRS"
          ],
          "Patrones de Comunicación e Integración": [
            "Patrón de Gateway de API (API Gateway)",
            "Patrón de Strangler Fig",
            "Patrón Anti-Corruption Layer"
          ],
          "Patrones de Presentación (UI)": [
            "Modelo-Vista-Controlador (MVC)",
            "Modelo-Vista-ViewModel (MVVM)",
            "Patrón de Micro Frontends"
          ],
          "Patrones de Resiliencia y Escalabilidad": [
            "Patrón Interruptor de Circuito (Circuit Breaker)",
            "Patrón de Reintentos (Retry Pattern)",
            "Patrón de Balanceo de Carga (Load Balancer)"
          ],
          "Patrones para Sistemas Distribuidos": [
            "Arquitectura de Microservicios",
            "Patrón de Broker de Mensajes (Message Broker)",
            "Patrón Publicador-Suscriptor (Pub/Sub)"
          ]
        }
      }),
      roadmapInfo: JSON.stringify({
        "Arquitectura Dirigida por Eventos (EDA)": {
          "descripcion": "Un estilo de arquitectura de software que utiliza eventos para desencadenar y comunicar entre servicios desacoplados. Es común en aplicaciones modernas construidas con microservicios. Los componentes del sistema reaccionan a eventos a medida que ocurren.",
          "link_real": "https://aws.amazon.com/es/event-driven-architecture/",
          "tiempo_estimado": "2 horas"
        },
        "Arquitectura de Microservicios": {
          "descripcion": "Enfoque arquitectónico que estructura una aplicación como una colección de servicios pequeños, autónomos y débilmente acoplados. Cada servicio es independiente, se centra en una capacidad de negocio y puede ser desplegado y escalado de forma individual.",
          "link_real": "https://martinfowler.com/articles/microservices.html",
          "tiempo_estimado": "2.5 horas"
        },
        "Fundamentos y Patrones Clásicos": {
          "descripcion": "Exploración de los patrones arquitectónicos fundamentales que han servido como base para el desarrollo de software durante décadas. Estos patrones establecen los cimientos para entender estructuras más complejas y modernas.",
          "link_real": "https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/",
          "tiempo_estimado": "4-6 horas"
        },
        "Introducción a la Arquitectura de Software": {
          "descripcion": "Define qué es la arquitectura de software, su importancia en el ciclo de vida del desarrollo y los conceptos clave como los atributos de calidad (o -ilities), las vistas arquitectónicas y el rol del arquitecto de software.",
          "link_real": "https://es.wikipedia.org/wiki/Arquitectura_de_software",
          "tiempo_estimado": "1 hora"
        },
        "Modelo-Vista-Controlador (MVC)": {
          "descripcion": "Separa una aplicación en tres componentes interconectados: el Modelo (datos y lógica de negocio), la Vista (representación de la UI) y el Controlador (maneja la entrada del usuario y actualiza el Modelo y la Vista). Es un patrón fundamental en el desarrollo web y de escritorio.",
          "link_real": "https://developer.mozilla.org/es/docs/Glossary/MVC",
          "tiempo_estimado": "2 horas"
        },
        "Modelo-Vista-ViewModel (MVVM)": {
          "descripcion": "Facilita la separación de la interfaz gráfica de usuario (la Vista) de la lógica de negocio y de presentación (el ViewModel). El ViewModel expone datos y comandos a los que la Vista se enlaza (data binding), reduciendo la necesidad de código de manipulación directa de la UI.",
          "link_real": "https://learn.microsoft.com/es-es/dotnet/architecture/maui/mvvm",
          "tiempo_estimado": "2 horas"
        },
        "Patrones Orientados a Eventos": {
          "descripcion": "Paradigmas centrados en la producción, detección, consumo y reacción a eventos (cambios de estado significativos). Estas arquitecturas promueven sistemas asíncronos, escalables y altamente desacoplados.",
          "link_real": "https://martinfowler.com/articles/201701-event-driven.html",
          "tiempo_estimado": "6-8 horas"
        },
        "Patrones de Arquitectura de Software": {
          "descripcion": "Estudio de los principios y soluciones estructurales de alto nivel para el diseño de sistemas de software. Abarca la organización de componentes, sus interrelaciones y las guías que gobiernan su diseño y evolución para cumplir con los atributos de calidad deseados (escalabilidad, rendimiento, mantenibilidad, etc.).",
          "link_real": "https://learn.microsoft.com/es-es/azure/architecture/guide/",
          "tiempo_estimado": "40-60 horas (curso completo)"
        },
        "Patrones de Comunicación e Integración": {
          "descripcion": "Soluciones para facilitar la comunicación y la integración entre diferentes partes de un sistema o entre sistemas distintos, especialmente en contextos de microservicios, sistemas legados y aplicaciones distribuidas.",
          "link_real": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/",
          "tiempo_estimado": "5-7 horas"
        },
        "Patrones de Presentación (UI)": {
          "descripcion": "Modelos de diseño enfocados en la organización del código de la interfaz de usuario (UI) para mejorar la mantenibilidad, la testabilidad y la separación de responsabilidades entre la lógica de la vista y la lógica de negocio.",
          "link_real": "https://addyosmani.com/resources/essentialjsdesignpatterns/book/#ui-patterns",
          "tiempo_estimado": "5-7 horas"
        },
        "Patrones de Resiliencia y Escalabilidad": {
          "descripcion": "Técnicas y diseños arquitectónicos cuyo objetivo es construir sistemas robustos capaces de soportar fallos (resiliencia) y de manejar un aumento en la carga de trabajo (escalabilidad) de manera eficiente.",
          "link_real": "https://learn.microsoft.com/es-es/azure/architecture/framework/resiliency/design-patterns",
          "tiempo_estimado": "5-7 horas"
        },
        "Patrones para Sistemas Distribuidos": {
          "descripcion": "Conjunto de patrones diseñados para abordar los desafíos inherentes a los sistemas que se ejecutan en múltiples nodos de red, como la comunicación, la tolerancia a fallos, la consistencia de datos y la escalabilidad.",
          "link_real": "https://aws.amazon.com/es/microservices/patterns/",
          "tiempo_estimado": "6-8 horas"
        },
        "Patrón Anti-Corruption Layer": {
          "descripcion": "Crea una capa de traducción entre un sistema nuevo y un sistema legado (o externo) para evitar que el modelo de dominio del sistema antiguo 'corrompa' o influya negativamente en el diseño del nuevo sistema. Esta capa aísla y adapta la comunicación entre ambos.",
          "link_real": "https://learn.microsoft.com/es-es/azure/architecture/patterns/anti-corruption-layer",
          "tiempo_estimado": "1.5 horas"
        },
        "Patrón CQRS": {
          "descripcion": "Command Query Responsibility Segregation (Segregación de Responsabilidad de Comando y Consulta). Separa el modelo de datos para las operaciones de escritura (Comandos) del modelo para las operaciones de lectura (Consultas). Esto permite optimizar cada modelo de forma independiente.",
          "link_real": "https://learn.microsoft.com/es-es/azure/architecture/patterns/cqrs",
          "tiempo_estimado": "2.5 horas"
        },
        "Patrón Cliente-Servidor": {
          "descripcion": "Modelo de aplicación distribuida que particiona las tareas entre los proveedores de un recurso o servicio, llamados servidores, y los solicitantes del servicio, llamados clientes. Es la base de la mayoría de las aplicaciones de red.",
          "link_real": "https://developer.mozilla.org/es/docs/Learn/Server-side/First_steps/Client-Server_overview",
          "tiempo_estimado": "1 hora"
        },
        "Patrón Interruptor de Circuito (Circuit Breaker)": {
          "descripcion": "Evita que una aplicación intente ejecutar repetidamente una operación que es propensa a fallar. Tras un número configurable de fallos, el 'circuito se abre' y las llamadas subsiguientes fallan inmediatamente, evitando sobrecargar un servicio degradado.",
          "link_real": "https://martinfowler.com/bliki/CircuitBreaker.html",
          "tiempo_estimado": "2 horas"
        },
        "Patrón Publicador-Suscriptor (Pub/Sub)": {
          "descripcion": "Patrón de mensajería donde los publicadores (emisores) no envían mensajes directamente a los suscriptores (receptores), sino que los categorizan en tópicos. Los suscriptores reciben todos los mensajes de los tópicos a los que están suscritos, permitiendo una comunicación uno a muchos y un gran desacoplamiento.",
          "link_real": "https://cloud.google.com/pubsub/docs/overview?hl=es",
          "tiempo_estimado": "2 horas"
        },
        "Patrón de Balanceo de Carga (Load Balancer)": {
          "descripcion": "Distribuye el tráfico de red entrante entre un grupo de servidores (un 'pool' o 'farm') para mejorar la capacidad de respuesta y la disponibilidad de las aplicaciones. Asegura que ningún servidor se vea sobrecargado.",
          "link_real": "https://www.cloudflare.com/es-es/learning/performance/what-is-load-balancing/",
          "tiempo_estimado": "1.5 horas"
        },
        "Patrón de Broker de Mensajes (Message Broker)": {
          "descripcion": "Utiliza un componente intermediario (el broker) para gestionar la comunicación asíncrona entre diferentes servicios. Los servicios envían mensajes a colas o tópicos en el broker, y otros servicios los consumen, desacoplando así al emisor del receptor.",
          "link_real": "https://www.ibm.com/es-es/cloud/learn/message-brokers",
          "tiempo_estimado": "2 horas"
        },
        "Patrón de Gateway de API (API Gateway)": {
          "descripcion": "Actúa como un único punto de entrada para un conjunto de microservicios. Se encarga de enrutar las peticiones, componer respuestas, aplicar políticas de seguridad (autenticación, autorización), limitar tasas de peticiones (rate limiting) y realizar tareas de monitorización.",
          "link_real": "https://aws.amazon.com/es/api-gateway/",
          "tiempo_estimado": "2 horas"
        },
        "Patrón de Micro Frontends": {
          "descripcion": "Extiende los conceptos de microservicios al frontend. Consiste en descomponer una aplicación web monolítica en piezas más pequeñas e independientes (micro frontends), que pueden ser desarrolladas, probadas y desplegadas de forma autónoma por diferentes equipos.",
          "link_real": "https://martinfowler.com/articles/micro-frontends.html",
          "tiempo_estimado": "2.5 horas"
        },
        "Patrón de Reintentos (Retry Pattern)": {
          "descripcion": "Permite a una aplicación manejar fallos transitorios (temporales) al reintentar una operación que ha fallado. Se suele combinar con estrategias de espera exponencial (exponential backoff) para no saturar el servicio al que se llama.",
          "link_real": "https://learn.microsoft.com/es-es/azure/architecture/patterns/retry",
          "tiempo_estimado": "1.5 horas"
        },
        "Patrón de Sourcing de Eventos (Event Sourcing)": {
          "descripcion": "En lugar de almacenar el estado actual de una entidad, se guarda la secuencia completa de eventos que han modificado su estado. El estado actual se puede reconstruir en cualquier momento reproduciendo los eventos, lo que proporciona un historial completo e inmutable.",
          "link_real": "https://martinfowler.com/eaaDev/EventSourcing.html",
          "tiempo_estimado": "2.5 horas"
        },
        "Patrón de Strangler Fig": {
          "descripcion": "Estrategia para migrar gradualmente un sistema monolítico a una nueva arquitectura (como microservicios). Se crea una nueva fachada (la 'parra') que intercepta las peticiones, redirigiendo el tráfico a nuevas implementaciones o al antiguo monolito, 'estrangulando' progresivamente al sistema legado.",
          "link_real": "https://martinfowler.com/bliki/StranglerFigApplication.html",
          "tiempo_estimado": "2 horas"
        },
        "Patrón en Capas (Layered Pattern)": {
          "descripcion": "Organiza el sistema en capas horizontales, donde cada capa tiene una responsabilidad específica (p. ej., Presentación, Lógica de Negocio, Acceso a Datos). Una capa solo puede comunicarse con la capa inmediatamente inferior, promoviendo la separación de conceptos.",
          "link_real": "https://learn.microsoft.com/es-es/azure/architecture/patterns/n-tier",
          "tiempo_estimado": "1.5 horas"
        }
      }),
      relatedTopics: JSON.stringify({
        "related_topics": [
          "Arquitectura de Microservicios",
          "Arquitectura Orientada a Eventos",
          "Patrón CQRS y Event Sourcing",
          "Arquitectura Monolítica vs Microservicios",
          "Arquitectura Limpia y Hexagonal",
          "Atributos de Calidad en Arquitectura"
        ]
      })
    };

    router.push({
      pathname: '/generated-roadmap',
      params: testData
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showFileInfo ? (
        <View style={styles.roadmapContainer}>
          <Text style={styles.title}>Sube un archivo para generar tu ruta de aprendizaje</Text>
          
          {/* Botón de prueba - TEMPORAL para desarrollo */}
          {/* <TouchableOpacity 
            style={styles.testButton} 
            onPress={handleTestRoadmap}
          >
            <Text style={styles.testButtonText}>Roadmap de Prueba</Text>
          </TouchableOpacity> */}
          
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
        <ScrollView 
          style={styles.fileInfoContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.pdfPreviewTop}>
            <Text style={styles.previewTitle}>Vista previa del PDF</Text>
            <View style={styles.pdfContainer}>
              <View style={styles.pdfPlaceholderContainer}>
                <Text style={styles.pdfIcon}>📄</Text>
                <Text style={styles.pdfPlaceholder}>{fileUploaded.name}</Text>
                <Text style={styles.pdfSize}>{((fileUploaded.size || 0) / (1024 * 1024)).toFixed(2)} MB</Text>
                <Text style={styles.pdfPreviewNote}>Archivo PDF cargado correctamente</Text>
              </View>
            </View>
          </View>

          <View style={styles.fileDetailsBottom}>
            <View style={styles.fileDetails}>
              <Text style={styles.fileDetailsTitle}>Detalles del archivo</Text>
              <Text style={styles.fileInfo}>Nombre: {fileUploaded.name}</Text>
              <Text style={styles.fileInfo}>Tamaño: {((fileUploaded.size || 0) / (1024 * 1024)).toFixed(2)} MB</Text>
              <Text style={styles.fileInfo}>Tipo: PDF</Text>
            </View>
            
            <View style={styles.creditsContainer}>
              <Text style={styles.creditsTitle}>Costo de procesamiento</Text>
              <Text style={styles.previewCost}>{previewCost}</Text>
              <Text style={styles.userCredits}>{userCredits}</Text>
            </View>

            <View style={styles.buttonsContainerHorizontal}>
              <TouchableOpacity 
                style={[styles.generateButton, canUserPay && styles.generateButtonDisabled]} 
                onPress={handleGenerateRoadmap}
                disabled={canUserPay}
              >
                <Text style={styles.generateButtonText}>
                  Generar ruta de aprendizaje
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Subir otro archivo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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