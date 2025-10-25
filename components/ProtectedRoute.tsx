import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { validateToken } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await validateToken();
      setIsValid(valid);
      
      if (!valid) {
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