import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeToggle } from './ThemeToggle';
import { Colors } from '@/constants/Colors';

interface NavbarProps {
  t?: {
    nav: {
      about: string;
      credits: string;
      faq: string;
      contact: string;
      login: string;
      signup: string;
      roadmap: string;
    };
  };
}

const defaultTranslations = {
  nav: {
    about: "Quiénes somos",
    credits: "Créditos", 
    faq: "Preguntas frecuentes",
    contact: "Contacto",
    login: "Iniciar sesión",
    signup: "Registrarse",
    roadmap: "Roadmap",
  },
};

export default function Navbar({ t = defaultTranslations }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.container}>
        {/* Logo */}
        <TouchableOpacity 
          style={styles.logoContainer}
          onPress={() => router.push('/')}
        >
          <View style={styles.logoImageContainer}>
            <Image 
              source={require('../../assets/images/LOGO.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.logoText}>Leroi</Text>
        </TouchableOpacity>

        {/* Menu hamburguesa */}
        <TouchableOpacity 
          style={styles.hamburgerButton}
          onPress={toggleMenu}
        >
          <Ionicons 
            name={menuOpen ? "close" : "menu"} 
            size={24} 
            color={Colors.navbar.text} 
          />
        </TouchableOpacity>

        {/* Enlaces de navegación */}
        {menuOpen && (
          <View style={styles.mobileMenu}>
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="information-circle-outline" size={20} color={Colors.navbar.text} />
              <Text style={styles.navText}>{t.nav.about}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="trophy-outline" size={20} color={Colors.navbar.text} />
              <Text style={styles.navText}>{t.nav.credits}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="help-circle-outline" size={20} color={Colors.navbar.text} />
              <Text style={styles.navText}>{t.nav.faq}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="mail-outline" size={20} color={Colors.navbar.text} />
              <Text style={styles.navText}>{t.nav.contact}</Text>
            </TouchableOpacity>

            {isAuthenticated && (
              <TouchableOpacity style={styles.navItem}>
                <Ionicons name="map-outline" size={20} color={Colors.navbar.text} />
                <Text style={styles.navText}>{t.nav.roadmap}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Botones de autenticación y tema */}
        <View style={styles.authButtons}>
          {isAuthenticated ? (
            <>
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => router.push('/profile')}
              >
                <Ionicons name="person-outline" size={24} color={Colors.navbar.text} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={20} color={Colors.navbar.text} />
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={styles.authButton}
                onPress={() => router.push('/login')}
              >
                <Ionicons name="log-in-outline" size={20} color={Colors.navbar.text} />
                <Text style={styles.buttonText}>{t.nav.login}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.authButton}
                onPress={() => router.push('/register')}
              >
                <Ionicons name="person-add-outline" size={20} color={Colors.navbar.text} />
                <Text style={styles.buttonText}>{t.nav.signup}</Text>
              </TouchableOpacity>
            </>
          )}
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Colors.navbar.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.navbar.border,
    paddingTop: 44, // Para el status bar
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImageContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.navbar.primary + '90',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoImage: {
    width: 20,
    height: 20,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.navbar.text,
  },
  hamburgerButton: {
    padding: 8,
  },
  mobileMenu: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: Colors.navbar.background,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.navbar.border,
    zIndex: 1000,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  navText: {
    color: Colors.navbar.text,
    fontSize: 16,
    marginLeft: 12,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileButton: {
    padding: 8,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  buttonText: {
    color: Colors.navbar.text,
    fontSize: 14,
    fontWeight: '500',
  },
});