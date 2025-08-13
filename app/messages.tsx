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
import { conversations } from '@/data/conversations-data';

export default function MessagesPage() {
  const router = useRouter();

  const navigateToChat = (chatId: string, username: string) => {
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