import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Switch, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { profileStyles as styles } from '../../styles/profileStyles';
import { storage } from '../../utils/storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

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
  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [new2FAStatus, setNew2FAStatus] = useState(false);
  const [editData, setEditData] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = await storage.getToken();
      
      if (!authToken) {
        router.replace('/login');
        return;
      }

      try {
        // Obtener los datos del usuario
        const userResponse = await fetch(`${API_BASE_URL}/users_authentication_path/user-profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            'x-api-key': API_KEY || ''
          },
        });

        if (!userResponse.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const userData = await userResponse.json();
        
        // Si el endpoint no devuelve el estado correcto de 2FA, usar el guardado localmente
        const stored2FAStatus = await storage.get2FAStatus();
        const userDataWithCorrect2FA = {
          ...userData.data,
          TFA_enabled: userData.data.TFA_enabled !== undefined ? userData.data.TFA_enabled : stored2FAStatus
        };
        
        setUserData(userDataWithCorrect2FA);

        // Obtener los roadmaps del usuario
        const roadmapsResponse = await fetch(`${API_BASE_URL}/users_authentication_path/user-roadmaps`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            'x-api-key': API_KEY || ''
          },
        });

        if (!roadmapsResponse.ok) {
          throw new Error("Error al obtener los roadmaps del usuario");
        }

        const roadmapsData = await roadmapsResponse.json();
        setUserRoadmaps(roadmapsData.data);

      } catch (error) {
        console.error(error);
        router.replace('/login');
      }
    };

    fetchUserData();
  }, []);

  // Función para manejar el cambio en el checkbox de 2FA
  const handleToggle2FA = (newStatus: boolean) => {
    setNew2FAStatus(newStatus);
    setShow2FAModal(true);
  };

  // Función para confirmar el cambio de 2FA
  const confirmToggle2FA = async () => {
    try {
      const authToken = await storage.getToken();
      
      const response = await fetch(`${API_BASE_URL}/users_authentication_path/update-2fa`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          'x-api-key': API_KEY || ''
        },
        body: JSON.stringify({ is_2fa_enabled: new2FAStatus }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado de 2FA");
      }

      // Actualizar el estado local y guardado con el nuevo valor de 2FA
      setUserData(prev => prev ? { ...prev, TFA_enabled: new2FAStatus } : null);
      await storage.set2FAStatus(new2FAStatus);
      Alert.alert('Éxito', `Autenticación de doble factor ${new2FAStatus ? "activada" : "desactivada"} correctamente.`);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Error', "Hubo un error al actualizar la autenticación de doble factor.");
    } finally {
      setShow2FAModal(false);
    }
  };

  const handleDeleteAccount = async () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    const authToken = await storage.getToken();
    
    if (!authToken) {
      router.replace('/login');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/users_authentication_path/delete-user/${encodeURIComponent(userData?.email || '')}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            'x-api-key': API_KEY || ''
          },
        }
      );

      if (!response.ok) {
        let errorMsg = "Error al borrar la cuenta";
        try {
          const errorData = await response.json();
          errorMsg = errorData.detail || errorMsg;
        } catch {}
        Alert.alert('Error', errorMsg);
        return;
      }

      Alert.alert('Éxito', "Cuenta eliminada correctamente");
      setTimeout(async () => {
        await storage.removeToken();
        router.replace('/login');
      }, 2000);
    } catch (error) {
      console.error("Error al borrar la cuenta:", error);
      Alert.alert('Error', "Hubo un error al intentar borrar la cuenta.");
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleSave = async () => {
    const trimmedData = {
      name: editData.firstName.trim(),
      last_name: editData.lastName.trim(),
      email: userData?.email?.trim(),
      provider: 'default'
    };

    try {
      const authToken = await storage.getToken();
      
      const response = await fetch(`${API_BASE_URL}/users_authentication_path/update-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          'x-api-key': API_KEY || ''
        },
        body: JSON.stringify(trimmedData),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert('Error', result.detail || "Error al actualizar los datos");
        return;
      }

      Alert.alert('Éxito', "Datos actualizados correctamente");
      setUserData(prev => prev ? { ...prev, firstName: editData.firstName, lastName: editData.lastName } : null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Error', 'Error al actualizar los datos');
    }
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
            await storage.removeToken();
            await storage.removeUserEmail();
            await storage.remove2FAStatus();
            router.replace('/login');
          }
        }
      ]
    );
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollContainer} 
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
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
          <Text style={styles.creditsAmount}>${userData.credits}</Text>
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
            <TouchableOpacity style={styles.viewRoadmapsButton}>
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
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => {
              setEditData({ firstName: userData.firstName, lastName: userData.lastName });
              setShowEditModal(true);
            }}
          >
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

        {/* Acerca de */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#835BFC" />
            <Text style={styles.cardTitle}>Información</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => router.push('/about')}
          >
            <Ionicons name="book-outline" size={20} color="#835BFC" />
            <Text style={styles.actionButtonText}>Acerca de Leroi</Text>
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

      {/* Modal de Confirmación para Eliminar Cuenta */}
      <Modal visible={showConfirmModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Eliminar cuenta</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro de que deseas borrar tu cuenta? Esta acción no se puede deshacer, y perderás el saldo de créditos que tengas en la cuenta.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowConfirmModal(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
                <Text style={styles.confirmButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Edición */}
      <Modal visible={showEditModal} transparent animationType="slide">
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.editModalContent}>
              <View style={styles.editModalHeader}>
                <Text style={styles.editModalTitle}>Editar datos</Text>
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={() => setShowEditModal(false)}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.editForm}>
                <View style={styles.editInputGroup}>
                  <Text style={styles.editInputLabel}>Nombre</Text>
                  <TextInput
                    style={styles.editInput}
                    value={editData.firstName}
                    onChangeText={(text) => setEditData(prev => ({ ...prev, firstName: text }))}
                    placeholder="Ingresa tu nombre"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
                
                <View style={styles.editInputGroup}>
                  <Text style={styles.editInputLabel}>Apellido</Text>
                  <TextInput
                    style={styles.editInput}
                    value={editData.lastName}
                    onChangeText={(text) => setEditData(prev => ({ ...prev, lastName: text }))}
                    placeholder="Ingresa tu apellido"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  />
                </View>
              </View>
              
              <View style={styles.editModalButtons}>
                <TouchableOpacity style={styles.editSaveButton} onPress={handleSave}>
                  <Text style={styles.editSaveButtonText}>Guardar cambios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editCancelButton} onPress={() => setShowEditModal(false)}>
                  <Text style={styles.editCancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal de Confirmación para 2FA */}
      <Modal visible={show2FAModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Autenticación de doble factor</Text>
            <Text style={styles.modalText}>
              ¿Estás seguro de que deseas {new2FAStatus ? "activar" : "desactivar"} la autenticación de doble factor?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShow2FAModal(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmToggle2FA}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}