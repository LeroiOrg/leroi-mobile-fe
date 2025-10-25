import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Linking, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { aboutStyles as styles } from '../styles/aboutStyles';

const teamMembers = [
  {
    name: 'Camila Amaya',
    github: 'https://github.com/CmilAmaya',
    image: require('../assets/images/camila.png')
  },
  {
    name: 'Cristian Barrera',
    github: 'https://github.com/Sebls',
    image: require('../assets/images/cris.jpg')
  },
  {
    name: 'Diego Alvarez',
    github: 'https://github.com/CmilAmaya',
    image: require('../assets/images/diego.jpg')
  },
  {
    name: 'Duvan Mondragon',
    github: 'https://github.com/amateusl',
    image: require('../assets/images/duvan.jpg')
  },
  {
    name: 'Jhoan Franco',
    github: 'https://github.com/juarodriguezg',
    image: require('../assets/images/jhoan.jpg')
  },
  {
    name: 'Juan Ramirez',
    github: 'https://github.com/juarodriguezg',
    image: require('../assets/images/juan.jpg')
  },
  {
    name: 'Sergio Nova',
    github: 'https://github.com/juarodriguezg',
    image: require('../assets/images/nova.jpg')
  }
];

export default function AboutScreen() {
  const handleGithubPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar 
        backgroundColor="#835BFC" 
        barStyle="light-content"
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Acerca de Leroi</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Image 
              source={require('../assets/images/imagotipo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Vision y Mision */}
          <View style={styles.visionMissionSection}>
            <View style={styles.visionCard}>
              <Text style={styles.cardTitle}>Visión</Text>
              <Text style={styles.cardText}>
                Para 2030 LEROI aspira a ser la plataforma líder en la creación de caminos de aprendizaje, 
                facilitando el acceso al conocimiento académico. Inspirados por los valores de altruismo, 
                compromiso y responsabilidad para transformar la forma en que las personas organizan su aprendizaje.
              </Text>
            </View>

            <View style={styles.missionCard}>
              <Text style={styles.cardTitle}>Misión</Text>
              <Text style={styles.cardText}>
                LEROI proporciona una herramienta de creación de rutas de aprendizaje que sirven de guía 
                para formarse en temas basados en los documentos proporcionados por cada usuario, 
                facilitando su proceso de aprendizaje.
              </Text>
            </View>
          </View>

          {/* Team Section */}
          <View style={styles.teamSection}>
            <Text style={styles.sectionTitle}>Conoce al Equipo</Text>
            
            <View style={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <View key={index} style={styles.teamCard}>
                  <Image source={member.image} style={styles.teamPhoto} />
                  <View style={styles.teamInfo}>
                    <Text style={styles.teamName}>{member.name}</Text>
                    <TouchableOpacity 
                      style={styles.githubButton}
                      onPress={() => handleGithubPress(member.github)}
                    >
                      <Ionicons name="logo-github" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}