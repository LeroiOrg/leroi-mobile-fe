import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { creditsStyles as styles } from '../../styles/creditsStyles';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  credits: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, credits }) => (
  <View style={styles.pricingCard}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.price}>{price}</Text>
    <View style={styles.featuresList}>
      {features.map((feature, index) => (
        <Text key={index} style={styles.featureItem}>✔️ {feature}</Text>
      ))}
    </View>
    <TouchableOpacity 
      style={styles.buyButton}
      onPress={() => router.push({
        pathname: '/pricing',
        params: { credits: credits.toString() }
      })}
    >
      <Text style={styles.buyButtonText}>Comprar paquete</Text>
    </TouchableOpacity>
  </View>
);

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

export default function CreditsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
      <View style={styles.header}>
        <Text style={styles.title}>Adquiere créditos</Text>
        <Text style={styles.subtitle}>
          Elige el paquete que mejor se adapte a tus necesidades de aprendizaje
        </Text>
      </View>

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

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>¿Cómo funcionan los créditos?</Text>
        <Text style={styles.infoText}>
          Los créditos se utilizan para procesar tus documentos y generar rutas de aprendizaje personalizadas. 
          El costo depende del tamaño y complejidad del documento.
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}