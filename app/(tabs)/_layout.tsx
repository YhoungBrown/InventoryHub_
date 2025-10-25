import { Tabs } from 'expo-router';
import React from 'react';


import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const { theme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? 'light'].tint,
        headerShown: false,
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addProduct"
        options={{
          title: 'Add Product',
          tabBarIcon: ({ color }) => <Ionicons name="add" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

      
