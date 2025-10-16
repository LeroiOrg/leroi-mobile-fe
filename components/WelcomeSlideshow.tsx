import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const ICON_SIZE = 80;
const ICON_COLOR = '#FFFFFF';

const Feature1Icon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 1024 1024" fill={ICON_COLOR}>
    <Path d="M197.769 791.767l60.672-286.853c2.341-11.066-4.733-21.934-15.799-24.275s-21.934 4.733-24.275 15.799l-60.672 286.853c-2.341 11.066 4.733 21.934 15.799 24.275s21.934-4.733 24.275-15.799zm571.063-286.786l61.778 287.068c2.38 11.058 13.273 18.093 24.33 15.713s18.093-13.273 15.713-24.33l-61.778-287.068c-2.38-11.058-13.273-18.093-24.33-15.713s-18.093 13.273-15.713 24.33z"/>
    <Path d="M967.45 386.902L535.9 208.126c-10.609-4.399-30.569-4.442-41.207-.088L57.821 386.901l436.881 178.857c10.624 4.355 30.583 4.313 41.207-.085L967.45 386.901zM551.583 603.516c-20.609 8.533-51.787 8.599-72.409.145L24.437 417.494c-32.587-13.359-32.587-47.847.009-61.188l454.73-186.174c20.641-8.448 51.818-8.382 72.407.156l448.836 185.936c32.466 13.442 32.466 47.913.004 61.354l-448.84 185.938zm288.673 166.569c-98 57.565-209.669 88.356-325.888 88.356-116.363 0-228.162-30.866-326.246-88.564-9.749-5.735-22.301-2.481-28.036 7.268s-2.481 22.301 7.268 28.036c104.336 61.377 223.297 94.22 347.014 94.22 123.564 0 242.386-32.763 346.634-93.998 9.753-5.729 13.015-18.279 7.286-28.032s-18.279-13.015-28.032-7.286z"/>
    <Path d="M983.919 383.052v296.233c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V383.052c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z"/>
  </Svg>
);

const Feature2Icon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 30.725 30.725" fill={ICON_COLOR}>
    <Path d="M30.718,26.476l0.007-19.877c-0.003-0.611-0.499-1.107-1.109-1.107H15.597c-0.433-0.01-0.771-0.807-0.771-1.111V4.254c0-0.648-0.528-1.182-1.18-1.182h-7.46c-0.651,0-1.178,0.533-1.178,1.182v0.127c0,0.309-0.341,1.117-0.784,1.117h0.013c-0.604,0.008-1.094,0.5-1.094,1.105l0.005,5.754H0.763c0,0-1.056-0.057-0.683,1.199l2.516,12.92c0,0.65,0.453,1.176,1.104,1.176h26.474C30.824,27.652,30.718,26.476,30.718,26.476z M29.359,14.021l-0.014,12.975l-2.502-13.908c-0.212-0.764-1.075-0.711-1.075-0.711H4.51V7.963h24.85v6.058H29.359z"/>
  </Svg>
);

const Feature3Icon = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 512 512" fill={ICON_COLOR}>
    <Path d="M456.333,425.571H55.667C36.551,425.571,21,410.02,21,390.904v-30.333c0-2.762,2.239-5,5-5h460c2.762,0,5,2.238,5,5v30.333C491,410.02,475.448,425.571,456.333,425.571z M31,365.571v25.333c0,13.602,11.065,24.667,24.667,24.667h400.667c13.602,0,24.667-11.065,24.667-24.667v-25.333H31z"/>
    <Path d="M486,365.571H26c-2.761,0-5-2.238-5-5v-223.5c0-22.883,18.617-41.5,41.5-41.5h174.002c2.761,0,5,2.239,5,5s-2.239,5-5,5H62.5c-17.369,0-31.5,14.131-31.5,31.5v218.5h450v-218.5c0-17.369-14.131-31.5-31.5-31.5H335.497c-2.762,0-5-2.239-5-5s2.238-5,5-5H449.5c22.883,0,41.5,18.617,41.5,41.5v223.5C491,363.333,488.762,365.571,486,365.571z"/>
    <Path d="M177.508,214.063c-1.307,0-2.584-0.513-3.536-1.464c-1.301-1.301-1.782-3.21-1.253-4.972l21.213-70.71c0.238-0.793,0.668-1.514,1.253-2.099L311.858,18.145c7.555-7.555,17.6-11.716,28.283-11.716c10.685,0,20.729,4.161,28.284,11.716c7.556,7.555,11.717,17.6,11.717,28.284c0,10.685-4.161,20.729-11.717,28.285L251.754,191.386c-0.585,0.585-1.306,1.016-2.099,1.253l-70.71,21.213C178.472,213.995,177.988,214.063,177.508,214.063z M203.147,140.997l-18.182,60.609l60.609-18.183L361.355,67.642c5.666-5.667,8.787-13.2,8.787-21.213c0-8.013-3.121-15.547-8.787-21.213c-5.666-5.667-13.2-8.787-21.214-8.787c-8.013,0-15.547,3.121-21.213,8.787L203.147,140.997z"/>
    <Path d="M216.398,167.913c-5.762,0-11.523-2.193-15.91-6.579c-8.772-8.773-8.772-23.047,0-31.82c1.952-1.952,5.118-1.952,7.071,0c1.953,1.953,1.953,5.118,0,7.071c-4.874,4.874-4.874,12.804,0,17.678s12.804,4.874,17.678,0c1.954-1.952,5.119-1.951,7.071,0c1.953,1.953,1.953,5.119,0,7.071C227.922,165.72,222.16,167.913,216.398,167.913z"/>
    <Path d="M241.147,192.673c-6.01,0-11.66-2.341-15.91-6.59s-6.59-9.9-6.59-15.91c0-6.01,2.341-11.661,6.59-15.91l62.228-62.227c1.951-1.952,5.119-1.952,7.07,0c1.953,1.953,1.953,5.119,0,7.071l-62.227,62.227c-2.361,2.361-3.662,5.5-3.662,8.839c0,3.338,1.3,6.478,3.662,8.838c2.361,2.361,5.5,3.662,8.838,3.662c3.339,0,6.478-1.3,8.839-3.662c1.952-1.952,5.119-1.952,7.071,0c1.953,1.953,1.953,5.118,0.001,7.071C252.808,190.332,247.157,192.673,241.147,192.673z"/>
    <Path d="M350.749,90.32c-1.279,0-2.56-0.488-3.535-1.464l-49.498-49.498c-1.953-1.953-1.953-5.119,0-7.071c1.951-1.952,5.119-1.952,7.07,0l49.498,49.498c1.953,1.953,1.953,5.119,0,7.071C353.309,89.832,352.028,90.32,350.749,90.32z"/>
    <Path d="M366,315.571h-80c-16.542,0-30-13.458-30-30s13.458-30,30-30h110c11.028,0,20-8.972,20-20v-1.508c0-11.028-8.972-20-20-20H177.508c-2.761,0-5-2.239-5-5s2.239-5,5-5H396c16.542,0,30,13.458,30,30v1.508c0,16.542-13.458,30-30,30H286c-11.028,0-20,8.972-20,20s8.972,20,20,20h80c2.762,0,5,2.238,5,5S368.762,315.571,366,315.571z"/>
    <Path d="M176,320.571H26c-2.761,0-5-2.238-5-5s2.239-5,5-5h150c2.761,0,5,2.238,5,5S178.761,320.571,176,320.571z"/>
    <Path d="M176,290.571H26c-2.761,0-5-2.238-5-5s2.239-5,5-5h150c2.761,0,5,2.238,5,5S178.761,290.571,176,290.571z"/>
    <Path d="M176,260.571H26c-2.761,0-5-2.238-5-5c0-2.761,2.239-5,5-5h150c2.761,0,5,2.239,5,5C181,258.333,178.761,260.571,176,260.571z"/>
    <Path d="M311,485.571H201c-2.761,0-5-2.238-5-5v-60c0-2.762,2.239-5,5-5h110c2.762,0,5,2.238,5,5v60C316,483.333,313.762,485.571,311,485.571z M206,475.571h100v-50H206V475.571z"/>
    <Path d="M286,485.571h-60c-2.761,0-5-2.238-5-5v-60c0-2.762,2.239-5,5-5h60c2.762,0,5,2.238,5,5v60C291,483.333,288.762,485.571,286,485.571z M231,475.571h50v-50h-50V475.571z"/>
    <Path d="M326,505.571H186c-8.271,0-15-6.729-15-15s6.729-15,15-15h140c8.271,0,15,6.729,15,15S334.271,505.571,326,505.571z M186,485.571c-2.757,0-5,2.243-5,5s2.243,5,5,5h140c2.757,0,5-2.243,5-5s-2.243-5-5-5H186z"/>
  </Svg>
);

const slides = [
  {
    title: "Bienvenido a Leroi",
    subtitle: "Tu asistente de aprendizaje personalizado",
    description: "Convierte tus documentos en rutas de aprendizaje personalizadas y optimiza tu tiempo de estudio.",
    image: require('../assets/images/gif.gif'),
  },
  {
    title: "Asistente de aprendizaje",
    subtitle: "Automatización inteligente",
    description: "Leroi automatiza la creación de planes de estudio, reduciendo significativamente el tiempo dedicado a planificar qué y cómo estudiar.",
    icon: <Feature1Icon />,
  },
  {
    title: "Organizador",
    subtitle: "Estructura lógica",
    description: "Leroi identifica y organiza subtemas jerárquicamente, proporcionando un camino lógico y progresivo para el aprendizaje.",
    icon: <Feature2Icon />,
  },
  {
    title: "Personalizador experto",
    subtitle: "Contenido adaptado",
    description: "Leroi permite a los usuarios cargar sus documentos y generar rutas de aprendizaje adaptadas a ese contenido específico.",
    icon: <Feature3Icon />,
  },
];

interface WelcomeSlideshowProps {
  onComplete: () => void;
}

export default function WelcomeSlideshow({ onComplete }: WelcomeSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
      router.push('/register');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipSlideshow = () => {
    onComplete();
    router.push('/(tabs)');
  };

  const slide = slides[currentSlide];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={skipSlideshow}>
        <Text style={styles.skipText}>Saltar</Text>
      </TouchableOpacity>

      <View style={styles.slideContainer}>
        <View style={styles.iconContainer}>
          {slide.image ? (
            <Image source={slide.image} style={styles.slideImage} resizeMode="contain" />
          ) : (
            <View style={styles.featureIconContainer}>
              {slide.icon}
            </View>
          )}
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot
              ]}
            />
          ))}
        </View>

        <View style={styles.navigationButtons}>
          {currentSlide > 0 && (
            <TouchableOpacity style={styles.prevButton} onPress={prevSlide}>
              <Text style={styles.prevButtonText}>Anterior</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
            <Text style={styles.nextButtonText}>
              {currentSlide === slides.length - 1 ? 'Comenzar' : 'Siguiente'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  skipText: {
    color: '#A1A1AA',
    fontSize: 16,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#101838',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2D3A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  slideImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#835BFC',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'System',
  },
  description: {
    fontSize: 16,
    color: '#A1A1AA',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    fontFamily: 'System',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#835BFC',
    width: 24,
  },
  navigationButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  prevButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2A2D3A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  prevButtonText: {
    color: '#A1A1AA',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#835BFC',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 2,
    alignItems: 'center',
    shadowColor: '#835BFC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});