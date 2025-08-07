import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 

  ScrollView, 
  TouchableOpacity,
  Dimensions,
  StatusBar 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ReelsScreen() {
  const [currentReel, setCurrentReel] = useState(0);

  // Mock reels data
  const reels = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    username: `user${i + 1}`,
    description: `This is reel number ${i + 1} with some description text that might be longer...`,
    likes: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 1000),
    shares: Math.floor(Math.random() * 500),
    isLiked: false,
    isFollowing: i % 2 === 0,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ScrollView 
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.y / height);
          setCurrentReel(newIndex);
        }}
      >
        {reels.map((reel, index) => (
          <View key={reel.id} style={styles.reelContainer}>
            {/* Video Background */}
            <View style={[styles.videoBackground, { backgroundColor: `hsl(${index * 60}, 50%, 30%)` }]}>
              <View style={styles.videoPlaceholder}>
                <Text style={styles.playIcon}>▶</Text>
                <Text style={styles.videoText}>Reel Video {index + 1}</Text>
              </View>
            </View>

            {/* Top Header */}
            <View style={styles.topHeader}>
              <Text style={styles.reelsTitle}>Reels</Text>
              <TouchableOpacity style={styles.cameraButton}>
                <Text style={styles.cameraIcon}>📷</Text>
              </TouchableOpacity>
            </View>

            {/* Side Actions */}
            <View style={styles.sideActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>🤍</Text>
                <Text style={styles.actionCount}>{reel.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionCount}>{reel.comments}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📤</Text>
                <Text style={styles.actionCount}>{reel.shares}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>⋯</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.profilePicture}>
                <Text style={styles.profileIcon}>👤</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Content */}
            <View style={styles.bottomContent}>
              <View style={styles.userInfo}>
                <Text style={styles.username}>@{reel.username}</Text>
                {!reel.isFollowing && (
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Follow</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <Text style={styles.description} numberOfLines={2}>
                {reel.description}
              </Text>
              
              <View style={styles.musicInfo}>
              
                <Text style={styles.musicText}>Original audio - {reel.username}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width: width,
    height: height,
    position: 'relative',
  },
  videoBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 12,
  },
  videoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  topHeader: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  reelsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  cameraButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 20,
  },
  sideActions: {
    position: 'absolute',
    right: 12,
    bottom: 100,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 8,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileIcon: {
    fontSize: 16,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 80,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  musicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  musicText: {
    color: '#fff',
    fontSize: 12,
    fontStyle: 'italic',
  },
});