import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeStyles as styles } from '../../styles/homeStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

// --- CONSTANTS ---
// Spacing (matching web CSS variables)
const SPACING_XS = 4; // 0.25rem
const SPACING_SM = 8; // 0.5rem
const SPACING_MD = 16; // 1rem
const SPACING_LG = 24; // 1.5rem
const SPACING_XL = 32; // 2rem

// Border Radius (matching web CSS variables)
const RADIUS_SM = 4; // 0.25rem
const RADIUS_MD = 8; // 0.5rem
const RADIUS_LG = 16; // 1rem

// Icon and UI constants
const ICON_SIZE = 48;
const ICON_COLOR = '#FFFFFF';
const SCREEN_PADDING = SPACING_MD;
const CARD_PADDING = SPACING_LG;
const SECTION_PADDING_VERTICAL = 60;

// --- ASSETS ---
const gif = require('../../assets/images/gif.gif');
const imagotipo = require('../../assets/images/imagotipo.png');

// SVG Icons Components - Using original SVG files
const Feature1Icon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 1024 1024" fill={ICON_COLOR}>
    <Path d="M197.769 791.767l60.672-286.853c2.341-11.066-4.733-21.934-15.799-24.275s-21.934 4.733-24.275 15.799l-60.672 286.853c-2.341 11.066 4.733 21.934 15.799 24.275s21.934-4.733 24.275-15.799zm571.063-286.786l61.778 287.068c2.38 11.058 13.273 18.093 24.33 15.713s18.093-13.273 15.713-24.33l-61.778-287.068c-2.38-11.058-13.273-18.093-24.33-15.713s-18.093 13.273-15.713 24.33z"/>
    <Path d="M967.45 386.902L535.9 208.126c-10.609-4.399-30.569-4.442-41.207-.088L57.821 386.901l436.881 178.857c10.624 4.355 30.583 4.313 41.207-.085L967.45 386.901zM551.583 603.516c-20.609 8.533-51.787 8.599-72.409.145L24.437 417.494c-32.587-13.359-32.587-47.847.009-61.188l454.73-186.174c20.641-8.448 51.818-8.382 72.407.156l448.836 185.936c32.466 13.442 32.466 47.913.004 61.354l-448.84 185.938zm288.673 166.569c-98 57.565-209.669 88.356-325.888 88.356-116.363 0-228.162-30.866-326.246-88.564-9.749-5.735-22.301-2.481-28.036 7.268s-2.481 22.301 7.268 28.036c104.336 61.377 223.297 94.22 347.014 94.22 123.564 0 242.386-32.763 346.634-93.998 9.753-5.729 13.015-18.279 7.286-28.032s-18.279-13.015-28.032-7.286z"/>
    <Path d="M983.919 383.052v296.233c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V383.052c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z"/>
  </Svg>
);

const Feature2Icon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 30.725 30.725" fill={ICON_COLOR}>
    <Path d="M30.718,26.476l0.007-19.877c-0.003-0.611-0.499-1.107-1.109-1.107H15.597c-0.433-0.01-0.771-0.807-0.771-1.111V4.254
		c0-0.648-0.528-1.182-1.18-1.182h-7.46c-0.651,0-1.178,0.533-1.178,1.182v0.127c0,0.309-0.341,1.117-0.784,1.117h0.013
		c-0.604,0.008-1.094,0.5-1.094,1.105l0.005,5.754H0.763c0,0-1.056-0.057-0.683,1.199l2.516,12.92c0,0.65,0.453,1.176,1.104,1.176
		h26.474C30.824,27.652,30.718,26.476,30.718,26.476z M29.359,14.021l-0.014,12.975l-2.502-13.908
		c-0.212-0.764-1.075-0.711-1.075-0.711H4.51V7.963h24.85v6.058H29.359z"/>
  </Svg>
);

const Feature3Icon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 512 512" fill={ICON_COLOR}>
    <Path d="M456.333,425.571H55.667C36.551,425.571,21,410.02,21,390.904v-30.333c0-2.762,2.239-5,5-5h460      c2.762,0,5,2.238,5,5v30.333C491,410.02,475.448,425.571,456.333,425.571z M31,365.571v25.333      c0,13.602,11.065,24.667,24.667,24.667h400.667c13.602,0,24.667-11.065,24.667-24.667v-25.333H31z"/>
    <Path d="M486,365.571H26c-2.761,0-5-2.238-5-5v-223.5c0-22.883,18.617-41.5,41.5-41.5h174.002      c2.761,0,5,2.239,5,5s-2.239,5-5,5H62.5c-17.369,0-31.5,14.131-31.5,31.5v218.5h450v-218.5c0-17.369-14.131-31.5-31.5-31.5      H335.497c-2.762,0-5-2.239-5-5s2.238-5,5-5H449.5c22.883,0,41.5,18.617,41.5,41.5v223.5      C491,363.333,488.762,365.571,486,365.571z"/>
    <Path d="M177.508,214.063c-1.307,0-2.584-0.513-3.536-1.464c-1.301-1.301-1.782-3.21-1.253-4.972l21.213-70.71      c0.238-0.793,0.668-1.514,1.253-2.099L311.858,18.145c7.555-7.555,17.6-11.716,28.283-11.716      c10.685,0,20.729,4.161,28.284,11.716c7.556,7.555,11.717,17.6,11.717,28.284c0,10.685-4.161,20.729-11.717,28.285      L251.754,191.386c-0.585,0.585-1.306,1.016-2.099,1.253l-70.71,21.213C178.472,213.995,177.988,214.063,177.508,214.063z       M203.147,140.997l-18.182,60.609l60.609-18.183L361.355,67.642c5.666-5.667,8.787-13.2,8.787-21.213      c0-8.013-3.121-15.547-8.787-21.213c-5.666-5.667-13.2-8.787-21.214-8.787c-8.013,0-15.547,3.121-21.213,8.787L203.147,140.997z"/>
    <Path d="M216.398,167.913c-5.762,0-11.523-2.193-15.91-6.579c-8.772-8.773-8.772-23.047,0-31.82      c1.952-1.952,5.118-1.952,7.071,0c1.953,1.953,1.953,5.118,0,7.071c-4.874,4.874-4.874,12.804,0,17.678s12.804,4.874,17.678,0      c1.954-1.952,5.119-1.951,7.071,0c1.953,1.953,1.953,5.119,0,7.071C227.922,165.72,222.16,167.913,216.398,167.913z"/>
    <Path d="M241.147,192.673c-6.01,0-11.66-2.341-15.91-6.59s-6.59-9.9-6.59-15.91c0-6.01,2.341-11.661,6.59-15.91      l62.228-62.227c1.951-1.952,5.119-1.952,7.07,0c1.953,1.953,1.953,5.119,0,7.071l-62.227,62.227      c-2.361,2.361-3.662,5.5-3.662,8.839c0,3.338,1.3,6.478,3.662,8.838c2.361,2.361,5.5,3.662,8.838,3.662      c3.339,0,6.478-1.3,8.839-3.662c1.952-1.952,5.119-1.952,7.071,0c1.953,1.953,1.953,5.118,0.001,7.071      C252.808,190.332,247.157,192.673,241.147,192.673z"/>
    <Path d="M350.749,90.32c-1.279,0-2.56-0.488-3.535-1.464l-49.498-49.498c-1.953-1.953-1.953-5.119,0-7.071      c1.951-1.952,5.119-1.952,7.07,0l49.498,49.498c1.953,1.953,1.953,5.119,0,7.071C353.309,89.832,352.028,90.32,350.749,90.32z"/>
    <Path d="M366,315.571h-80c-16.542,0-30-13.458-30-30s13.458-30,30-30h110c11.028,0,20-8.972,20-20v-1.508      c0-11.028-8.972-20-20-20H177.508c-2.761,0-5-2.239-5-5s2.239-5,5-5H396c16.542,0,30,13.458,30,30v1.508      c0,16.542-13.458,30-30,30H286c-11.028,0-20,8.972-20,20s8.972,20,20,20h80c2.762,0,5,2.238,5,5S368.762,315.571,366,315.571z"/>
    <Path d="M176,320.571H26c-2.761,0-5-2.238-5-5s2.239-5,5-5h150c2.761,0,5,2.238,5,5      S178.761,320.571,176,320.571z"/>
    <Path d="M176,290.571H26c-2.761,0-5-2.238-5-5s2.239-5,5-5h150c2.761,0,5,2.238,5,5      S178.761,290.571,176,290.571z"/>
    <Path d="M176,260.571H26c-2.761,0-5-2.238-5-5c0-2.761,2.239-5,5-5h150c2.761,0,5,2.239,5,5      C181,258.333,178.761,260.571,176,260.571z"/>
    <Path d="M311,485.571H201c-2.761,0-5-2.238-5-5v-60c0-2.762,2.239-5,5-5h110c2.762,0,5,2.238,5,5v60     C316,483.333,313.762,485.571,311,485.571z M206,475.571h100v-50H206V475.571z"/>
    <Path d="M286,485.571h-60c-2.761,0-5-2.238-5-5v-60c0-2.762,2.239-5,5-5h60c2.762,0,5,2.238,5,5v60     C291,483.333,288.762,485.571,286,485.571z M231,475.571h50v-50h-50V475.571z"/>
    <Path d="M326,505.571H186c-8.271,0-15-6.729-15-15s6.729-15,15-15h140c8.271,0,15,6.729,15,15     S334.271,505.571,326,505.571z M186,485.571c-2.757,0-5,2.243-5,5s2.243,5,5,5h140c2.757,0,5-2.243,5-5s-2.243-5-5-5H186z"/>
  </Svg>
);

// --- COMPONENTS ---
interface FadeInTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: any;
}

const FadeInText: React.FC<FadeInTextProps> = ({ 
  children, 
  delay = 0, 
  duration = 800,
  style 
}) => {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(delay, withTiming(0, { duration }));
    opacity.value = withDelay(delay, withTiming(1, { duration }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.Text style={[style, animatedStyle]}>
      {children}
    </Animated.Text>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <View style={styles.featureIconContainer}>
      {icon}
    </View>
    <Text style={styles.h3}>{title}</Text>
    <Text style={styles.cardText}>{description}</Text>
  </View>
);

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  credits: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, credits }) => (
  <View style={styles.pricingCard}>
    <Text style={styles.h3}>{title}</Text>
    <Text style={styles.price}>{price}</Text>
    <View style={styles.list}>
      {features.map((feature, index) => (
        <Text key={index} style={styles.listItem}>✔️ {feature}</Text>
      ))}
    </View>
    <Link href="/(tabs)/credits" asChild>
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Comprar paquete</Text>
      </TouchableOpacity>
    </Link>
  </View>
);

// --- DATA ---
const featuresData = [
  {
    icon: <Feature1Icon />,
    title: "Asistente de aprendizaje",
    description: "Leroi automatiza la creación de planes de estudio, reduciendo significativamente el tiempo dedicado a planificar qué y cómo estudiar."
  },
  {
    icon: <Feature2Icon />,
    title: "Organizador",
    description: "Leroi identifica y organiza subtemas jerárquicamente, proporcionando un camino lógico y progresivo para el aprendizaje."
  },
  {
    icon: <Feature3Icon />,
    title: "Personalizador experto",
    description: "Leroi permite a los usuarios cargar sus documentos y generar rutas de aprendizaje adaptadas a ese contenido específico."
  }
];

const pricingData = [
  {
    title: "Principiante",
    price: "250 créditos",
    features: [
      "Ideal para probar Leroi",
      "Procesa muchos documentos pequeños"
    ],
    credits: 250
  },
  {
    title: "Intermedio",
    price: "750 créditos",
    features: [
      "Ideal para estudiantes",
      "Suficiente para generar roadmaps con archivos medianamente grandes"
    ],
    credits: 750
  },
  {
    title: "Avanzado",
    price: "1500 créditos",
    features: [
      "Perfecto para autodidactas avanzados",
      "Genera roadmaps con archivos grandes"
    ],
    credits: 1500
  }
];

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

  const resetSlideshow = async () => {
    await AsyncStorage.removeItem('hasLaunched');
    alert('Slideshow reseteado. Reinicia la app para verlo.');
  };

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
      {/* Hook Section */}
      <View style={styles.hookSection}>
          <Image source={imagotipo} style={styles.imagotipo} resizeMode="contain" />
          <Image source={gif} style={styles.hookGif} resizeMode="contain" />
          <FadeInText delay={200} style={styles.h1}>
            Convierte tus documentos en rutas de aprendizaje personalizadas
          </FadeInText>
          <Link href={isAuthenticated ? "/(tabs)/roadmap" : "/(tabs)/roadmap"} asChild>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>{isAuthenticated ? "Generar ruta de aprendizaje" : "Sube tu primer documento"}</Text>
            </TouchableOpacity>
          </Link>
          {/*
          <TouchableOpacity style={styles.resetButton} onPress={resetSlideshow}>
            <Text style={styles.resetButtonText}>Ver slideshow nuevamente</Text>
          </TouchableOpacity>
          
          <Link href="/payment-failure" asChild>
            <TouchableOpacity style={[styles.resetButton, { backgroundColor: '#ff6b6b', marginTop: 10 }]}>
              <Text style={styles.resetButtonText}>Ver página de fallo de pago</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/payment-success" asChild>
            <TouchableOpacity style={[styles.resetButton, { backgroundColor: '#835bfc', marginTop: 10 }]}>
              <Text style={styles.resetButtonText}>Ver página de éxito de pago</Text>
            </TouchableOpacity>
          </Link> */}
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <FadeInText delay={200} style={styles.h2}>
          Conoce lo que es LEROI
        </FadeInText>
        <Text style={styles.definition}>
          Leroi es una plataforma de aprendiz diseñada para optimizar la planificación y organización del estudio. 
          Automatiza la creación de planes de estudio, reduciendo el tiempo dedicado a estructurar qué y cómo aprender. 
          Además, identifica y jerarquiza subtemas para proporcionar un camino lógico en el aprendizaje. 
          Su capacidad de personalización permite a los usuarios cargar sus propios documentos generando rutas de estudio 
          adaptadas a su contenido específico.
        </Text>
        <View style={styles.featuresContainer}>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </View>
      </View>

      {/* Pricing Section */}
      <View style={styles.pricingSection}>
        <FadeInText delay={200} style={styles.h2}>
          Adquiere créditos
        </FadeInText>
        <View style={styles.pricingContainer}>
          {pricingData.map((pricing, index) => (
            <PricingCard
              key={index}
              title={pricing.title}
              price={pricing.price}
              features={pricing.features}
              credits={pricing.credits}
            />
          ))}
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <FadeInText delay={200} style={styles.h2}>
          Preguntas frecuentes
        </FadeInText>
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
    </SafeAreaView>
  );
}
