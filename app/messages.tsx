import React from 'react';
import {
  View,
 
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Text } from '@/components/text';
import { useRouter, Stack } from 'expo-router';

import { Feather } from '@expo/vector-icons';

export default function MessagesPage() {
  const router = useRouter();

  const conversations = [
    {
      id: 'alex-johnson',
      username: 'Alex Johnson',
      lastMessage: 'Thanks for sharing that article',
      timestamp: '2m',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      unread: true,
    },
    {
      id: 'sarah-williams',
      username: 'Sarah Williams',
      lastMessage: 'Sounds good, see you tomorrow',
      timestamp: '15m',
      avatar: 'https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      unread: false,
    },
    {
      id: 'mike-chen',
      username: 'Mike Chen',
      lastMessage: 'Got it, will review and get back to you',
      timestamp: '1h',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      unread: false,
    },
    {
      id: 'team-workspace',
      username: 'Team Workspace',
      lastMessage: 'Meeting notes have been shared',
      timestamp: '3h',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      unread: false,
    },
    {
      id: 'emma-davis',
      username: 'Emma Davis',
      lastMessage: 'Perfect, let\'s move forward with this',
      timestamp: '5h',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      unread: false,
    },
    {
      id: 'project-team',
      username: 'Project Team',
      lastMessage: 'Updated timeline is ready for review',
      timestamp: '1d',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      unread: false,
    },
    {
      id: 'david-smith',
      username: 'David Smith',
      lastMessage: 'Delivery confirmed for Friday',
      timestamp: '2d',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      unread: false,
    },
    {
      id: 'lisa-brown',
      username: 'Lisa Brown',
      lastMessage: 'Thank you for the quick response',
      timestamp: '3d',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      unread: false,
    },
  ];

  const navigateToChat = (chatId:any, username:any) => {
    router.push(`/chat/${chatId}?username=${encodeURIComponent(username)}`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="chevron-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Messages</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="video" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="edit-3" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Search messages</Text>
          </View>
        </View>

        {/* Messages Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Conversations */}
        <ScrollView style={styles.conversationsList} showsVerticalScrollIndicator={false}>
          {conversations.map((conversation) => (
            <TouchableOpacity 
              key={conversation.id} 
              style={styles.conversationItem}
              onPress={() => navigateToChat(conversation.id, conversation.username)}
            >
              <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.username}>{conversation.username}</Text>
                  <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                </View>
                <Text style={[
                  styles.lastMessage,
                  conversation.unread && styles.unreadMessage
                ]}>
                  {conversation.lastMessage}
                </Text>
              </View>
              <View style={styles.conversationRight}>
                {conversation.unread && <View style={styles.unreadDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#8E8E93',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  sectionAction: {
    fontSize: 16,
    color: '#007AFF',
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  timestamp: {
    fontSize: 14,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 15,
    color: '#8E8E93',
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '500',
    color: '#000',
  },
  conversationRight: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});

