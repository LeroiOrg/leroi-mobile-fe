import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProtectedRoute>
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
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="credits"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="dollarsign.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="roadmap"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
      </Tabs>
    </ProtectedRoute>
  );
}
