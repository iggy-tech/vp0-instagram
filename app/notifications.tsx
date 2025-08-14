import React, { useState } from 'react';
import {
  View,

  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { Text } from '@/components/text';


export default function NotificationsScreen() {
  const router = useRouter();
  const [followingUsers, setFollowingUsers] = useState(new Set(['podi_9sd', 'farod_syul']));

  const handleBackPress = () => {
    router.back();
  };

  // Mock notifications data
  const notifications = [
    // Yesterday
    {
      id: 1,
      type: 'follow',
      username: 'geuiremok',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      message: 'started following you.',
      time: '23h',
      section: 'Yesterday'
    },
    {
      id: 2,
      type: 'suggestion',
      username: 'code_with_kam',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      message: 'You have 4 mutuals.',
      time: '1d',
      section: 'Yesterday',
      isSuggestion: true
    },
    // Last 7 days
    {
      id: 3,
      type: 'follow',
      username: 'realbluroofingservices',
      avatar: 'https://images.unsplash.com/photo-1519115226133-94046df0e272?q=80&w=664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      message: 'started following you.',
      time: '5d',
      section: 'Last 7 days'
    },
    // Last 30 days
    {
      id: 4,
      type: 'follow',
      username: 'lokni90',
      avatar: 'https://images.unsplash.com/photo-1754597302822-4b96f3442d3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      message: 'started following you.',
      time: '1w',
      section: 'Last 30 days'
    },
    {
      id: 5,
      type: 'follow',
      username: 'sandro_tenoli',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      message: 'started following you.',
      time: '1w',
      section: 'Last 30 days',
      isFollowing: true
    },
    {
      id: 6,
      type: 'follow',
      username: 'warpo8c',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      message: 'started following you.',
      time: '1w',
      section: 'Last 30 days'
    },
    {
      id: 7,
      type: 'suggestion',
      username: 'lib123untouched',
      avatar: null,
      message: '',
      time: '2w',
      section: 'Last 30 days',
      isSuggestion: true
    },
    {
      id: 8,
      type: 'threads',
      username: 'ajmerglavas',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      message: 'and 8 others are on Threads, an Instagram app. See what they\'re saying.',
      time: '2w',
      section: 'Last 30 days',
      hasThreadsIcon: true
    },
    {
      id: 9,
      type: 'follow',
      username: 'jeremi_reid',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      message: 'started following you.',
      time: '2w',
      section: 'Last 30 days',
      isFollowing: true
    },
    {
      id: 10,
      type: 'like',
      username: 'chris.wieder, olo271111',
      avatar: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=100&h=100&fit=crop&crop=face',
      message: 'and 34 others liked your post.',
      time: '3w',
      section: 'Last 30 days',
      postImage: 'https://images.unsplash.com/photo-1551334787-21e6bd5e0db1?w=100&h=100&fit=crop'
    }
  ];

  const handleFollowPress = (username:any) => {
    setFollowingUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(username)) {
        newSet.delete(username);
      } else {
        newSet.add(username);
      }
      return newSet;
    });
  };

  const renderNotificationItem = (notification:any) => {
    const isFollowing = followingUsers.has(notification.username);

    return (
      <View key={notification.id} style={styles.notificationItem}>
        <View style={styles.avatarContainer}>
          {notification.avatar ? (
            <Image source={{ uri: notification.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.defaultAvatar}>
              <Feather name="user" size={24} color="#999" />
            </View>
          )}
          {notification.isSuggestion && (
            <View style={styles.suggestionBorder} />
          )}
          {notification.hasThreadsIcon && (
            <View style={styles.threadsIcon}>
              <Text style={styles.threadsText}>@</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.notificationText}>
              <Text style={styles.username}>{notification.username}</Text>
              {notification.message && <Text style={styles.message}> {notification.message}</Text>}
            </Text>
            <Text style={styles.timeText}>{notification.time}</Text>
          </View>

          {notification.isSuggestion && (
            <Text style={styles.suggestionLabel}>New follow suggestion:</Text>
          )}
        </View>

        <View style={styles.actionContainer}>
          {notification.type === 'follow' || notification.type === 'suggestion' ? (
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton
              ]}
              onPress={() => handleFollowPress(notification.username)}
            >
              <Text style={[
                styles.followButtonText,
                isFollowing && styles.followingButtonText
              ]}>
                {isFollowing ? 'Following' : notification.isSuggestion ? 'Follow' : 'Follow back'}
              </Text>
            </TouchableOpacity>
          ) : notification.postImage ? (
            <Image source={{ uri: notification.postImage }} style={styles.postThumbnail} />
          ) : null}
        </View>
      </View>
    );
  };

  interface GroupedNotifications {
    [key: string]: typeof notifications;
  }

  const groupedNotifications = notifications.reduce<GroupedNotifications>((acc, notification) => {
    const section = notification.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(notification);
    return acc;
  }, {});

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>john_smit3</Text>
          <View style={styles.onlineIndicator} />
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedNotifications).map(([section, items]) => (
          <View key={section}>
            <Text style={styles.sectionHeader}>{section}</Text>
            {items.map(renderNotificationItem)}
          </View>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -32, // Compensate for back button
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C851',
    marginLeft: 6,
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  defaultAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  
  },
  threadsIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  threadsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  suggestionLabel: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 2,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 18,
  },
  username: {
    fontWeight: '600',
    color: '#000',
  },
  message: {
    color: '#000',
  },
  timeText: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 2,
  },
  actionContainer: {
    marginLeft: 12,
  },
  followButton: {
    backgroundColor: '#0095f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: '#e4e6ea',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#000',
  },
  postThumbnail: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
});