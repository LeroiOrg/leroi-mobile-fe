import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { persistentAuth } from '../utils/persistentAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await persistentAuth.getValidToken();
        setIsValid(!!token);
        
        if (!token) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsValid(false);
        router.replace('/login');
      }
    };

    checkAuth();
  }, []);

  if (isValid === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>
          Cargando...
        </Text>
      </View>
    );
  }

  if (!isValid) {
    return null;
  }

  return <>{children}</>;
}