import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/haptic-tab';
import ProtectedRoute from '@/components/ProtectedRoute';
import { BlurView } from 'expo-blur';
import { tabsLayoutStyles, TAB_COLORS } from '@/styles/tabsLayoutStyles';

export default function TabLayout() {

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: TAB_COLORS.activeTint,
          tabBarInactiveTintColor: TAB_COLORS.inactiveTint,
          tabBarStyle: tabsLayoutStyles.tabBarStyle,
          sceneStyle: tabsLayoutStyles.sceneStyle,
          tabBarBackground: () => (
            <BlurView
              intensity={TAB_COLORS.blurIntensity}
              tint={TAB_COLORS.blurTint}
              style={tabsLayoutStyles.blurViewStyle}
            />
          ),
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: false,
          tabBarItemStyle: tabsLayoutStyles.tabBarItemStyle,
          animation: 'shift',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <View style={[
                tabsLayoutStyles.tabIconContainer,
                focused ? tabsLayoutStyles.tabIconContainerFocused : tabsLayoutStyles.tabIconContainerUnfocused
              ]}>
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
              <View style={[
                tabsLayoutStyles.tabIconContainer,
                focused ? tabsLayoutStyles.tabIconContainerFocused : tabsLayoutStyles.tabIconContainerUnfocused
              ]}>
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
              <View style={[
                tabsLayoutStyles.tabIconContainer,
                focused ? tabsLayoutStyles.tabIconContainerFocused : tabsLayoutStyles.tabIconContainerUnfocused
              ]}>
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
              <View style={[
                tabsLayoutStyles.tabIconContainer,
                focused ? tabsLayoutStyles.tabIconContainerFocused : tabsLayoutStyles.tabIconContainerUnfocused
              ]}>
                <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
