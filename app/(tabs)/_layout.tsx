import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';
import ProtectedRoute from '@/components/ProtectedRoute';
import { BlurView } from 'expo-blur';

export default function TabLayout() {

  return (
    <ProtectedRoute>
      <View style={{ flex: 1, backgroundColor: '#0A0A0A' }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            height: 85,
            paddingBottom: 25,
            paddingTop: 10,
            position: 'absolute',
            elevation: 0,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={80}
              tint="dark"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(131, 91, 252, 0.9)',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
                borderTopColor: '#6B47CC',
                borderTopWidth: 1,
              }}
            />
          ),
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          animation: 'shift',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: 12,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="credits"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: 12,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name={focused ? "card" : "card-outline"} size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="roadmap"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: 12,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name={focused ? "map" : "map-outline"} size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <View style={{
                backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: 12,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
              </View>
            ),
          }}
        />
        </Tabs>
        </SafeAreaView>
      </View>
    </ProtectedRoute>
  );
}
