import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from '@/components/text';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import { feedPosts } from '@/data/mock-data';

// Mock user data - in a real app this would come from an API
const getUserData = (accountId: string) => {
  // Find the user from posts or create mock data
  const userPost = feedPosts.find(post => post.username === accountId);
  
  if (userPost) {
    return {
      id: accountId,
      username: userPost.username,
      displayName: userPost.username,
      avatar: userPost.avatar,
      isVerified: userPost.isVerified || false,
      bio: `📍 Based in the city\n✨ Creating content\n🎯 Follow for more`,
      website: 'linktr.ee/' + userPost.username,
      posts: feedPosts.filter(post => post.username === accountId).length,
      followers: Math.floor(Math.random() * 5000) + 1000,
      following: Math.floor(Math.random() * 1000) + 500,
      isFollowing: false,
      highlights: [
        { id: '1', title: 'Travel', image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: '2', title: 'Food', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
        { id: '3', title: 'Life', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
      ],
      userPosts: feedPosts.filter(post => post.username === accountId)
    };
  }
  
  // Default user data if not found
  return {
    id: accountId,
    username: accountId,
    displayName: accountId,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isVerified: false,
    bio: `Welcome to my profile!\n✨ Creating amazing content\n📱 Follow for updates`,
    website: 'linktr.ee/' + accountId,
    posts: 5,
    followers: 3386,
    following: 3862,
    isFollowing: false,
    highlights: [
      { id: '1', title: 'ak', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
      { id: '2', title: '🚶', image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
      { id: '3', title: '📍', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    ],
    userPosts: [
      {
        id: '1',
        type: 'image',
        media: [{ type: 'image', url: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }]
      },
      {
        id: '2',
        type: 'carousel',
        media: [
          { type: 'image', url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
          { type: 'image', url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
        ]
      },
      {
        id: '3',
        type: 'image',
        media: [{ type: 'image', url: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }]
      },
      {
        id: '4',
        type: 'image',
        media: [{ type: 'image', url: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }]
      },
      {
        id: '5',
        type: 'carousel',
        media: [
          { type: 'image', url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
          { type: 'image', url: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
        ]
      }
    ]
  };
};

const formatCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export default function AccountProfile() {
  const router = useRouter();
  const { accountId } = useLocalSearchParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  
  const userData = getUserData(accountId as string);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{userData.username}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="bell" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="more-horizontal" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userData.avatar }} style={styles.profileImage} />
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userData.posts}</Text>
                <Text style={styles.statLabel}>posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{formatCount(userData.followers)}</Text>
                <Text style={styles.statLabel}>followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{formatCount(userData.following)}</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>

          {/* Bio Section */}
          <View style={styles.bioSection}>
            <View style={styles.nameRow}>
              <Text style={styles.displayName}>{userData.displayName}</Text>
              {userData.isVerified && (
                <AntDesign name="checkcircle" size={16} color="#0095F6" style={{ marginLeft: 4 }} />
              )}
            </View>
            <Text style={styles.bio}>{userData.bio}</Text>
            {userData.website && (
              <Text style={styles.website}>{userData.website}</Text>
            )}
          </View>

          {/* Followed by section */}
          <View style={styles.followedBySection}>
            <View style={styles.followedByAvatars}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' }}
                style={[styles.followedByAvatar, { zIndex: 3 }]} 
              />
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' }}
                style={[styles.followedByAvatar, { marginLeft: -10, zIndex: 2 }]} 
              />
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' }}
                style={[styles.followedByAvatar, { marginLeft: -10, zIndex: 1 }]} 
              />
            </View>
            <Text style={styles.followedByText}>
              Followed by <Text style={styles.followedByName}>almerglavas</Text>, <Text style={styles.followedByName}>m3rkom3tetic</Text> and <Text style={styles.followedByName}>15 others</Text>
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]} 
              onPress={toggleFollow}
            >
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
              {isFollowing && <Feather name="chevron-down" size={16} color="#000" style={{ marginLeft: 4 }} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreActionsButton}>
              <Feather name="user-plus" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsScroll}>
            {userData.highlights.map((highlight) => (
              <View key={highlight.id} style={styles.highlight}>
                <View style={styles.highlightImageContainer}>
                  <Image source={{ uri: highlight.image }} style={styles.highlightImage} />
                </View>
                <Text style={styles.highlightTitle}>{highlight.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, showGrid && styles.activeTab]}
            onPress={() => setShowGrid(true)}
          >
            <Feather name="grid" size={24} color={showGrid ? "#000" : "#8E8E93"} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, !showGrid && styles.activeTab]}
            onPress={() => setShowGrid(false)}
          >
            <Feather name="user" size={24} color={!showGrid ? "#000" : "#8E8E93"} />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {userData.userPosts.map((post, index) => (
            <View key={index} style={styles.gridItem}>
              <Image 
                source={{ uri: post.media[0].url }} 
                style={styles.gridImage}
              />
              {post.type === 'carousel' && (
                <View style={styles.carouselIndicator}>
                  <Feather name="copy" size={16} color="#fff" />
                </View>
              )}
            </View>
          ))}
        </View>
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
    borderBottomColor: '#DBDBDB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginRight: 28,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#000',
    marginTop: 2,
  },
  bioSection: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  displayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  bio: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
    marginBottom: 4,
  },
  website: {
    fontSize: 14,
    color: '#00376B',
  },
  followedBySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  followedByAvatars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  followedByAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  followedByText: {
    fontSize: 12,
    color: '#8E8E93',
    flex: 1,
  },
  followedByName: {
    fontWeight: '600',
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  followButton: {
    flex: 1,
    backgroundColor: '#0095F6',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  followingButton: {
    backgroundColor: '#EFEFEF',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#000',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  moreActionsButton: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightsSection: {
    paddingVertical: 16,
  },
  highlightsScroll: {
    paddingHorizontal: 16,
  },
  highlight: {
    alignItems: 'center',
    marginRight: 16,
    width: 64,
  },
  highlightImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    overflow: 'hidden',
  },
  highlightImage: {
    width: '100%',
    height: '100%',
  },
  highlightTitle: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -1,
  },
  gridItem: {
    width: '33.333%',
    aspectRatio: 1,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#fff',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  carouselIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});