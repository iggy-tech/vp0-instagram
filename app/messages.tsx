import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function MessagesPage() {
  const router = useRouter();

  const conversations = [
    {
      id: '1',
      username: 'john_doe',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '2m',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      unread: true,
    },
    {
      id: '2',
      username: 'sarah_wilson',
      lastMessage: 'Thanks for the recommendation!',
      timestamp: '1h',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b469?w=150&h=150&fit=crop&crop=face',
      unread: false,
    },
    {
      id: '3',
      username: 'mike_photo',
      lastMessage: 'Love your latest post 📸',
      timestamp: '3h',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      unread: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <Text style={styles.newMessageIcon}>✎</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search</Text>
        </View>
      </View>

      {/* Conversations */}
      <ScrollView style={styles.conversationsList}>
        {conversations.map((conversation) => (
          <TouchableOpacity key={conversation.id} style={styles.conversationItem}>
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
            {conversation.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 20,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  newMessageButton: {
    padding: 8,
  },
  newMessageIcon: {
    fontSize: 18,
    color: '#000',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#8E8E93',
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  timestamp: {
    fontSize: 14,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#000',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0095F6',
  },
});