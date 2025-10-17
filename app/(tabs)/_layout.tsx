import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TabLayout() {

  return (
    <ProtectedRoute>
      <View style={{ flex: 1, backgroundColor: '#0A0A0A' }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#835BFC',
          tabBarInactiveTintColor: '#A1A1AA',
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#333',
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 24,
            paddingTop: 8,
          },
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="credits"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <Ionicons name="card" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="roadmap"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <Ionicons name="map" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '',
            tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
          }}
        />
        </Tabs>
        </SafeAreaView>
      </View>
    </ProtectedRoute>
  );
}
