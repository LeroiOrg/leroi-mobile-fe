import { View, Text, StyleSheet } from 'react-native';

export default function RoadmapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roadmap</Text>
      <Text style={styles.subtitle}>Tus rutas de aprendizaje</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A1A1AA',
  },
});