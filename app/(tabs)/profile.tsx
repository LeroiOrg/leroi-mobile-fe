import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { profileStyles as styles } from '../../styles/profileStyles';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  credits: number;
  roadmapsCreated: number;
  TFA_enabled: boolean;
}

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Datos simulados para desarrollo
  const mockUserData: UserData = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@ejemplo.com',
    credits: 750,
    roadmapsCreated: 5,
    TFA_enabled: false
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simular carga de datos
        setTimeout(() => {
          setUserData(mockUserData);
          setLoading(false);
        }, 1000);
        
        // TODO: Implementar llamada real al backend
        // const token = await AsyncStorage.getItem('token');
        // if (!token) {
        //   router.replace('/login');
        //   return;
        // }
        // const response = await fetch(`${backendUrl}/users_authentication_path/user-profile`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const data = await response.json();
        // setUserData(data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleToggle2FA = (value: boolean) => {
    Alert.alert(
      'Autenticación de doble factor',
      `¿Estás seguro de que deseas ${value ? 'activar' : 'desactivar'} la autenticación de doble factor?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setUserData(prev => prev ? { ...prev, TFA_enabled: value } : null);
            Alert.alert('Éxito', `Autenticación de doble factor ${value ? 'activada' : 'desactivada'} correctamente.`);
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Editar perfil', 'Función de edición en desarrollo');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás seguro de que deseas borrar tu cuenta? Esta acción no se puede deshacer, y perderás el saldo de créditos que tengas en la cuenta.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente');
            // TODO: Implementar eliminación real y logout
          }
        }
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleViewRoadmaps = () => {
    Alert.alert('Roadmaps', 'Navegando a roadmaps creados...');
    // TODO: Navegar a pantalla de roadmaps creados
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar los datos del usuario</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mi perfil</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={60} color="#fff" />
          </View>
        </View>

        {/* Información Personal */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-outline" size={24} color="#835BFC" />
            <Text style={styles.cardTitle}>Información personal</Text>
          </View>
          
          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <Text style={styles.fieldValue}>{userData.firstName}</Text>
          </View>
          
          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Apellido:</Text>
            <Text style={styles.fieldValue}>{userData.lastName}</Text>
          </View>
          
          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>{userData.email}</Text>
          </View>
        </View>

        {/* Saldo de Créditos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="card-outline" size={24} color="#835BFC" />
            <Text style={styles.cardTitle}>Saldo de créditos</Text>
          </View>
          <Text style={styles.creditsAmount}>{userData.credits}</Text>
        </View>

        {/* Roadmaps Creados */}
        <View style={styles.card}>
          <View style={styles.cardHeaderWithCount}>
            <View style={styles.cardHeader}>
              <Ionicons name="map-outline" size={24} color="#835BFC" />
              <Text style={styles.cardTitle}>Roadmaps creados</Text>
            </View>
            <Text style={styles.roadmapsCount}>{userData.roadmapsCreated}</Text>
          </View>
          
          {userData.roadmapsCreated > 0 && (
            <TouchableOpacity style={styles.viewRoadmapsButton} onPress={handleViewRoadmaps}>
              <Text style={styles.viewRoadmapsButtonText}>Ver Roadmaps</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Configuración de Seguridad */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-outline" size={24} color="#835BFC" />
            <Text style={styles.cardTitle}>Configuración de seguridad</Text>
          </View>
          
          <View style={styles.securityItem}>
            <View style={styles.securityInfo}>
              <Text style={styles.securityTitle}>Autenticación de doble factor</Text>
              <Text style={styles.securityDescription}>Añade una capa extra de seguridad a tu cuenta</Text>
            </View>
            <Switch
              value={userData.TFA_enabled}
              onValueChange={handleToggle2FA}
              trackColor={{ false: '#4b5563', true: '#835BFC' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Acciones de Cuenta */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="settings-outline" size={24} color="#835BFC" />
            <Text style={styles.cardTitle}>Acciones de cuenta</Text>
          </View>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={20} color="#835BFC" />
            <Text style={styles.actionButtonText}>Modificar datos</Text>
            <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDeleteAccount}>
            <Ionicons name="trash-outline" size={20} color="#f44336" />
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Borrar cuenta</Text>
            <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
          </TouchableOpacity>
        </View>

        {/* Quiénes somos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#835BFC" />
            <Text style={styles.cardTitle}>Información</Text>
          </View>
          
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/about')}>
            <Ionicons name="people-outline" size={20} color="#835BFC" />
            <Text style={styles.actionButtonText}>Quiénes somos</Text>
            <Ionicons name="chevron-forward" size={20} color="#A1A1AA" />
          </TouchableOpacity>
        </View>

        {/* Cerrar Sesión */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#f44336" />
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}