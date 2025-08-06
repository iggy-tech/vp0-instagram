import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000', // Instagram uses black for active tabs
        tabBarInactiveTintColor: '#8E8E93', // Light gray for inactive tabs
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#E5E5E7',
            height: 84, // Standard Instagram tab bar height
          },
          default: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#E5E5E7',
            height: 60,
          },
        }),
        tabBarShowLabel: false, // Instagram doesn't show labels
      }}>
      
      {/* Home Feed */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name={focused ? "house.fill" : "house"} 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Search/Explore */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name={focused ? "magnifyingglass.circle.fill" : "magnifyingglass"} 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Create Post */}
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name={focused ? "plus.square.fill" : "plus.square"} 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Reels */}
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name={focused ? "play.rectangle.fill" : "play.rectangle"} 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name={focused ? "person.crop.circle.fill" : "person.crop.circle"} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}