
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- ASSETS ---
// Descomenta estas líneas cuando tengas las imágenes en la carpeta /assets/images
// const feature1 = require('../../assets/images/feature-1.png');
// const feature2 = require('../../assets/images/feature-2.png');
// const feature3 = require('../../assets/images/feature-3.png');
// const gif = require('../../assets/images/gif.gif');

const faqData = [
    {
      question: "¿Cómo funciona?",
      answer: "Leroi analiza el contenido de los documentos subidos por los usuarios y genera un roadmap de aprendizaje jerárquico basado en los temas y subtemas identificados. Utiliza procesamiento de lenguaje natural para extraer conceptos clave y organizarlos en una secuencia lógica de aprendizaje."
    },
    {
      question: "¿Qué tipo de documentos puedo subir?",
      answer: "Leroi acepta documentos en formato PDF. Se recomienda que los documentos contengan texto estructurado y contengan pocas imagenes, esto con el fin de obtener una mejor interpretación y generar roadmaps más precisos."
    },
    {
      question: "¿Puedo personalizar los roadmaps generados?",
      answer: "Por ahora no, pero estamos trabajando para que los usuarios puedan ajustar los roadmaps generados por Leroi."
    },
    {
      question: "¿Mi cuenta ha sido suspendida o eliminada?",
      answer: "Si tu cuenta ha sido suspendida o eliminada, puede deberse a una infracción de nuestras políticas. Recuerda que subir archivos con contenido sensible o malicioso puede llevar a la eliminación de la cuenta. Si crees que esto ha ocurrido por error, puedes ponerte en contacto con nuestro equipo de soporte."
    },
    {
      question: "¿Por qué mi cuenta fue suspendida después de varios intentos fallidos de inicio de sesión?",
      answer: "Por razones de seguridad, si introduces varias veces una contraseña incorrecta, tu cuenta puede ser suspendida temporalmente. Te recomendamos esperar unos minutos e intentar nuevamente o restablecer tu contraseña si no la recuerdas. Si el problema persiste, contacta con nuestro equipo de soporte."
    },
    {
      question: "¿Puedo compartir los roadmaps generados?",
      answer: "Sí, puedes compartir los roadmaps generados con otros usuarios al exportarlos en formato PDF, PNG o JSON para su consulta offline."
    },
    {
      question: "¿Qué hago si mi documento no se procesa correctamente?",
      answer: "Si tu documento no se procesa correctamente, verifica que esté en formato PDF y que el texto sea legible. Si el problema persiste, prueba con otro documento o contacta con nuestro equipo de soporte."
    },
    {
      question: "¿Cómo funciona la compra de créditos en la pasarela de pago?",
      answer: "Los usuarios pueden comprar créditos a través de nuestra pasarela de pago segura. Ofrecemos tres paquetes de créditos, cada uno con diferentes cantidades de créditos disponibles. Una vez realizada la compra, los créditos se añaden automáticamente a tu cuenta y puedes utilizarlos para procesar documentos dentro de Leroi."
    },
    {
      question: "¿Cómo se calcula el costo en créditos para procesar un documento?",
      answer: "El costo en créditos para procesar un documento se basa en la cantidad y complejidad del contenido en sus páginas. Si un documento tiene solo texto, el costo será menor, mientras que si contiene imágenes de alta calidad o expresiones matemáticas en LaTeX muy pesadas, el costo aumentará debido a la mayor carga de procesamiento."
    },
    {
      question: "¿Qué elementos pueden aumentar el costo en créditos al procesar un documento?",
      answer: "Elementos como imágenes de alta resolución, gráficos detallados, ecuaciones complejas en LaTeX o documentos extensos pueden incrementar el costo en créditos. Recomendamos cargar documentos con pocas imagenes o expresiones muy complejas para evitar un procesamiento innecesariamente costoso."
    },
    {
      question: "¿Puedo obtener un estimado del costo en créditos antes de procesar un documento?",
      answer: "Sí, antes de confirmar el procesamiento de un documento, Leroi te mostrará un estimado del costo en créditos basado en la cantidad de páginas y la complejidad del contenido. De esta manera, puedes decidir si deseas continuar o ajustar el documento antes de procesarlo."
    },
    {
      question: "¿Los créditos tienen fecha de expiración?",
      answer: "No, los créditos comprados no tienen fecha de expiración. Puedes utilizarlos cuando lo necesites sin preocuparte por perderlos con el tiempo."
    },
    {
      question: "¿Puedo solicitar un reembolso si no utilizo mis créditos?",
      answer: "No ofrecemos reembolsos por créditos no utilizados. Sin embargo, puedes usarlos en cualquier momento, ya que no tienen fecha de expiración."
    }
];

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hook Section */}
      <View style={styles.hookSection}>
          <View style={styles.gifPlaceholder}>
            <Text style={styles.gifPlaceholderText}>🎬 Tutorial GIF</Text>
          </View>
          <Text style={styles.h1}>Convierte tus documentos en rutas de aprendizaje personalizadas</Text>
          <Link href={isAuthenticated ? "/(tabs)/explore" : "/(tabs)/explore"} asChild>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>{isAuthenticated ? "Generar ruta de aprendizaje" : "Sube tu primer documento"}</Text>
            </TouchableOpacity>
          </Link>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.h2}>Conoce lo que es LEROI</Text>
        <Text style={styles.definition}>
          Leroi es una plataforma de aprendiz diseñada para optimizar la planificación y organización del estudio. 
          Automatiza la creación de planes de estudio, reduciendo el tiempo dedicado a estructurar qué y cómo aprender. 
          Además, identifica y jerarquiza subtemas para proporcionar un camino lógico en el aprendizaje. 
          Su capacidad de personalización permite a los usuarios cargar sus propios documentos generando rutas de estudio 
          adaptadas a su contenido específico.
        </Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              {/* <Image source={feature1} style={styles.featureIcon} resizeMode="contain" /> */}
            </View>
            <Text style={styles.h3}>Asistente de aprendizaje</Text>
            <Text style={styles.cardText}>
              Leroi automatiza la creación de planes de estudio, reduciendo significativamente el tiempo dedicado a planificar qué y cómo estudiar.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              {/* <Image source={feature2} style={styles.featureIcon} resizeMode="contain" /> */}
            </View>
            <Text style={styles.h3}>Organizador</Text>
            <Text style={styles.cardText}>
              Leroi identifica y organiza subtemas jerárquicamente, proporcionando un camino lógico y progresivo para el aprendizaje.
            </Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              {/* <Image source={feature3} style={styles.featureIcon} resizeMode="contain" /> */}
            </View>
            <Text style={styles.h3}>Personalizador experto</Text>
            <Text style={styles.cardText}>
              Leroi permite a los usuarios cargar sus documentos y generar rutas de aprendizaje adaptadas a ese contenido específico.
            </Text>
          </View>
        </View>
      </View>

      {/* Pricing Section */}
      <View style={styles.pricingSection}>
        <Text style={styles.h2}>Adquiere créditos</Text>
        <View style={styles.pricingContainer}>
          <View style={styles.pricingCard}>
            <Text style={styles.h3}>Principiante</Text>
            <Text style={styles.price}>250 créditos</Text>
            <View style={styles.list}>
                <Text style={styles.listItem}>✔️ Ideal para probar Leroi</Text>
                <Text style={styles.listItem}>✔️ Procesa muchos documentos pequeños</Text>
            </View>
            <Link href="/(tabs)/explore" asChild>
                <TouchableOpacity style={styles.ctaButton}>
                    <Text style={styles.ctaButtonText}>Comprar paquete</Text>
                </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.pricingCard}>
            <Text style={styles.h3}>Intermedio</Text>
            <Text style={styles.price}>750 créditos</Text>
             <View style={styles.list}>
                <Text style={styles.listItem}>✔️ Ideal para estudiantes</Text>
                <Text style={styles.listItem}>✔️ Suficiente para generar roadmaps con archivos medianamente grandes</Text>
            </View>
            <Link href="/(tabs)/explore" asChild>
                <TouchableOpacity style={styles.ctaButton}>
                    <Text style={styles.ctaButtonText}>Comprar paquete</Text>
                </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.pricingCard}>
            <Text style={styles.h3}>Avanzado</Text>
            <Text style={styles.price}>1500 créditos</Text>
             <View style={styles.list}>
                <Text style={styles.listItem}>✔️ Perfecto para autodidactas avanzados</Text>
                <Text style={styles.listItem}>✔️ Genera roadmaps con archivos grandes</Text>
            </View>
            <Link href="/(tabs)/explore" asChild>
                <TouchableOpacity style={styles.ctaButton}>
                    <Text style={styles.ctaButtonText}>Comprar paquete</Text>
                </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.h2}>Preguntas frecuentes</Text>
        <View style={styles.faqContainer}>
            {faqData.map((item, index) => (
                <TouchableOpacity key={index} style={styles.faqCard} onPress={() => toggleAnswer(index)} activeOpacity={0.8}>
                    <Text style={styles.h4}>{item.question}</Text>
                    {activeIndex === index && <Text style={styles.faqAnswer}>{item.answer}</Text>}
                </TouchableOpacity>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

// --- STYLESHEET ---

// Colores que coinciden con la versión web
const colors = {
  background: '#0A0A0A', // Fondo más oscuro como en web
  primary: '#A571FF', // Color primario lavanda de la web
  foreground: '#FFFFFF',
  card: '#1A1A1A', // Tarjetas más oscuras
  hover: '#8B5CF6', // Color de hover más suave
  buttonHover: '#7C3AED', // Color de hover para botones
  text: '#E5E7EB', // Texto más claro
  textSecondary: '#9CA3AF', // Texto secundario
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Sections
  hookSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 100,
    minHeight: Dimensions.get('window').height * 0.8,
    position: 'relative',
  },
  featuresSection: {
    padding: 20,
    paddingVertical: 60,
    backgroundColor: colors.background,
  },
  pricingSection: {
    padding: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  faqSection: {
    padding: 20,
    paddingVertical: 60,
    backgroundColor: colors.background,
  },

  // GIF Placeholder
  gifPlaceholder: {
    width: 300,
    height: 200,
    backgroundColor: colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  gifPlaceholderText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Typography
  h1: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 36,
  },
  h2: {
    textAlign: 'center',
    color: colors.foreground,
    fontSize: 32, // 2rem
    fontWeight: 'bold',
    marginBottom: 40,
  },
  h3: {
    color: '#fff',
    fontSize: 24, // 1.5rem
    fontWeight: 'bold',
    marginBottom: 12,
  },
   h4: {
    fontSize: 18, // ~1.1rem
    fontWeight: '600',
    color: '#fff', 
    marginBottom: 5, // Espacio si la respuesta está visible
  },
  definition: {
    marginHorizontal: 20,
    marginBottom: 48,
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 16,
  },

  // CTA Button
  ctaButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.hover,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: colors.hover,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Feature Cards
  featuresContainer: {
    gap: 24,
    paddingHorizontal: 16,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  featureIconContainer: { // Renombrado de .feature-icon
    width: 64, // 4rem
    height: 64, // 4rem
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    // El filtro de CSS no se puede traducir directamente.
    // Deberás usar un ícono de color claro.
  },
  featureIcon: {
      width: 40,
      height: 40,
  },
  cardText: {
    color: colors.text,
    fontSize: 16, // 1rem
    textAlign: 'center',
    lineHeight: 24,
  },

  // Pricing Cards
  pricingContainer: {
    gap: 20,
    width: '100%',
    paddingHorizontal: 16,
  },
  pricingCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
    minHeight: 280,
  },
  price: {
    fontSize: 40, // 2.5rem
    marginVertical: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
      alignItems: 'flex-start',
      marginVertical: 20,
      gap: 10,
  },
  listItem: {
    fontSize: 16, // 1rem
    color: 'white',
  },

  // FAQ
  faqContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
  faqCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  faqAnswer: {
    fontSize: 16,
    color: colors.text,
    marginTop: 12,
    lineHeight: 24,
  }
});
