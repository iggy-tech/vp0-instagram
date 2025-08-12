import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Octicons, Feather } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000', // Black for active tabs
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
            <Octicons
              size={24}
              name="home"
              color={focused ? '#000' : '#8E8E93'}
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
            <Octicons
              size={24}
              name="search"
              color={focused ? '#000' : '#8E8E93'}
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
            <Octicons
              size={24}
              name="plus-circle"
              color={focused ? '#000' : '#8E8E93'}
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
            <Octicons
              size={24}
              name="play"
              color={focused ? '#000' : '#8E8E93'}
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
            <Octicons
              size={24}
              name="person"
              color={focused ? '#000' : '#8E8E93'}
            />
          ),
        }}
      />
    </Tabs>
  );
}