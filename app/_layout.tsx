import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SystemUI from 'expo-system-ui';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import WelcomeSlideshow from '@/components/WelcomeSlideshow';
import { COLORS, LAYOUT_STYLES } from '@/styles/globalStyles';

// Tema personalizado de Leroi con fondo consistente
const LeroiTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: COLORS.background,
    card: COLORS.background,
    primary: COLORS.hover,
    text: COLORS.foreground,
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  
  const [fontsLoaded] = useFonts({
    'LexendDeca-Regular': require('../assets/fonts/LexendDeca-Regular.ttf'),
    'LexendDeca-Medium': require('../assets/fonts/LexendDeca-Medium.ttf'),
    'LexendDeca-SemiBold': require('../assets/fonts/LexendDeca-SemiBold.ttf'),
    'LexendDeca-Bold': require('../assets/fonts/LexendDeca-Bold.ttf'),
  });

  useEffect(() => {
    checkFirstLaunch();
    // Configurar el color de fondo del sistema
    SystemUI.setBackgroundColorAsync(COLORS.background);
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      setIsFirstLaunch(hasLaunched === null);
    } catch (error) {
      setIsFirstLaunch(true);
    }
  };

  const handleWelcomeComplete = async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error saving launch status:', error);
    }
  };

  if (isFirstLaunch === null || !fontsLoaded) {
    return null; // Loading
  }

  if (isFirstLaunch) {
    return (
      <>
        <WelcomeSlideshow onComplete={handleWelcomeComplete} />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <ThemeProvider value={LeroiTheme}>
      <Stack
        screenOptions={{
          contentStyle: LAYOUT_STYLES.rootContentStyle,
          headerStyle: LAYOUT_STYLES.rootHeaderStyle,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
