import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  StatusBar 
} from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 2) / 3; // 3 columns with 1px gaps

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('posts');

  // Mock profile data
  const profileData = {
    username: 'your_username',
    displayName: 'Your Display Name',
    bio: 'This is your bio section where you can write about yourself 📸✨',
    website: 'www.yourwebsite.com',
    followers: 1234,
    following: 567,
    posts: 89,
  };

  // Mock posts data
  const posts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    type: i % 5 === 0 ? 'video' : 'image',
  }));

  const tabs = [
    { id: 'posts', icon: '⊞', name: 'Posts' },
    { id: 'reels', icon: '▶', name: 'Reels' },
    { id: 'tagged', icon: '👤', name: 'Tagged' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>🔒</Text>
        </TouchableOpacity>
        <Text style={styles.username}>{profileData.username}</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            {/* Profile Picture */}
            <TouchableOpacity style={styles.profilePicture}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>{profileData.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>{profileData.followers.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.statItem}>
                <Text style={styles.statNumber}>{profileData.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.bioSection}>
            <Text style={styles.displayName}>{profileData.displayName}</Text>
            <Text style={styles.bio}>{profileData.bio}</Text>
            <Text style={styles.website}>{profileData.website}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactIcon}>👤</Text>
            </TouchableOpacity>
          </View>

          {/* Story Highlights */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsContainer}>
            <TouchableOpacity style={styles.newHighlight}>
              <View style={styles.newHighlightCircle}>
                <Text style={styles.plusIcon}>+</Text>
              </View>
              <Text style={styles.highlightLabel}>New</Text>
            </TouchableOpacity>
            
            {Array.from({ length: 4 }, (_, i) => (
              <TouchableOpacity key={i} style={styles.highlight}>
                <View style={styles.highlightCircle}>
                  <Text style={styles.highlightIcon}>📷</Text>
                </View>
                <Text style={styles.highlightLabel}>Highlight {i + 1}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text style={[styles.tabIcon, selectedTab === tab.id && styles.activeTabIcon]}>
                {tab.icon}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {posts.map((post, index) => (
            <TouchableOpacity key={post.id} style={styles.postItem}>
              <View style={[styles.postPlaceholder, { backgroundColor: `hsl(${index * 20}, 50%, 80%)` }]}>
                {post.type === 'video' && (
                  <View style={styles.videoIndicator}>
                    <Text style={styles.videoIcon}>▶</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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
    borderBottomColor: '#E5E5E7',
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 18,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  profilePicture: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  profileIcon: {
    fontSize: 36,
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
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  bioSection: {
    marginBottom: 16,
  },
  displayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginBottom: 4,
  },
  website: {
    fontSize: 14,
    color: '#0066CC',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  contactButton: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIcon: {
    fontSize: 14,
  },
  highlightsContainer: {
    paddingVertical: 16,
  },
  newHighlight: {
    alignItems: 'center',
    marginRight: 16,
  },
  newHighlightCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  plusIcon: {
    fontSize: 24,
    color: '#8E8E93',
  },
  highlight: {
    alignItems: 'center',
    marginRight: 16,
  },
  highlightCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  highlightIcon: {
    fontSize: 20,
  },
  highlightLabel: {
    fontSize: 12,
    color: '#000',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E7',
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
  tabIcon: {
    fontSize: 18,
    color: '#8E8E93',
  },
  activeTabIcon: {
    color: '#000',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
  },
  postItem: {
    width: itemWidth,
    height: itemWidth,
  },
  postPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  videoIcon: {
    color: '#fff',
    fontSize: 12,
  },
});