import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Aquí puedes agregar la lógica para cambiar el tema de la app
  };

  return (
    <TouchableOpacity 
      style={styles.themeToggle}
      onPress={toggleTheme}
    >
      <Ionicons 
        name={isDark ? "sunny-outline" : "moon-outline"} 
        size={24} 
        color={Colors.navbar.text} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
});