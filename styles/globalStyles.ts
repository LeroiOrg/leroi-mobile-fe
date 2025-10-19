// Constantes globales (equivalente a CSS variables)
export const SPACING = {
  xs: 4,    // 0.25rem
  sm: 8,    // 0.5rem
  md: 16,   // 1rem
  lg: 24,   // 1.5rem
  xl: 32,   // 2rem
};

export const RADIUS = {
  sm: 4,    // 0.25rem
  md: 8,    // 0.5rem
  lg: 16,   // 1rem
};

// Colores globales (tema oscuro por defecto)
export const COLORS = {
  // Colores base
  background: '#040819',        // hsl(222.2, 84%, 4.9%)
  foreground: '#FFFFFF',        // hsl(210, 40%, 98%)
  
  // Colores primarios y secundarios
  primary: '#1E1E2F',
  primaryForeground: '#FFFFFF',
  secondary: '#2A2D3A',         // hsl(217.2, 32.6%, 17.5%)
  secondaryForeground: '#FFFFFF',
  
  // Componentes UI
  card: '#101838',
  cardForeground: '#FFFFFF',
  popover: '#040819',
  popoverForeground: '#FFFFFF',
  muted: '#2A2D3A',
  mutedForeground: '#A1A1AA',   // hsl(215, 20.2%, 65.1%)
  accent: '#2A2D3A',
  accentForeground: '#FFFFFF',
  
  // Colores de interacción
  hover: '#835BFC',
  buttonHover: '#6B4AD4',
  navbar: '#835BFCCC',
  
  // Bordes e inputs
  border: '#2A2D3A',
  input: '#2A2D3A',
  
  // Registro
  registerBackground: 'rgba(30, 31, 38, 0.95)',
};

// Fuentes
export const FONTS = {
  regular: 'LexendDeca-Regular',
  medium: 'LexendDeca-Medium',
  semiBold: 'LexendDeca-SemiBold',
  bold: 'LexendDeca-Bold',
};

// Tamaños de fuente comunes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 32,
  massive: 40,
};

// Estilos comunes para layouts
import { StyleSheet } from 'react-native';

export const LAYOUT_STYLES = StyleSheet.create({
  rootContentStyle: {
    backgroundColor: COLORS.background,
  },
  
  rootHeaderStyle: {
    backgroundColor: COLORS.background,
  },
});