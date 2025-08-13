import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { Text } from '@/components/text';
import { useRouter } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import StoryViewer from '@/components/story-viewer';
import CommentsModal from '@/components/comments-modal';
import ShareModal from '@/components/share-modal';
import CarouselPost from '@/components/carousel-post';
import SingleMedia from '@/components/single-media';
import StoriesSection from '@/components/stories-section';
import SuggestedUsers from '@/components/suggested-users';
import AnimatedHeart from '@/components/animated-heart';
import { renderTextWithHashtags } from '@/utils/text-utils';
import { storyUsers, suggestedUsers, feedPosts } from '@/data/mock-data';

// Helper function to format like counts
const formatLikes = (count: any) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export default function HomeScreen() {
  const router = useRouter();
  const [storyViewerVisible, setStoryViewerVisible] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set<string>());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set<string>());
  const [mutedVideos, setMutedVideos] = useState(new Set<string>());
  
  // Animation for overlay
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Convert story users to legacy format for display
  const stories = storyUsers.map(user => ({
    id: user.id,
    username: user.username,
    isYourStory: user.id === 'your-story',
    hasStory: user.stories.length > 0,
    image: user.avatar
  }));

  const navigateToMessages = () => {
    router.push('/messages');
  };

  const navigateToNotifications = () => {
    router.push('/notifications');
  };

  const navigateToProfile = (username: string) => {
    router.push(`/account/${username}`);
  };
  
  const openStoryViewer = (userIndex: any) => {
    setSelectedUserIndex(userIndex);
    setSelectedStoryIndex(0);
    setStoryViewerVisible(true);
  };

  const closeStoryViewer = () => {
    setStoryViewerVisible(false);
  };

  const openComments = (postId: any) => {
    setSelectedPostId(postId);
    setCommentsModalVisible(true);
    
    // Quick fade in animation
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 150, // Fast fade in
      useNativeDriver: true,
    }).start();
  };

  const closeComments = () => {
    // Quick fade out animation
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 100, // Even faster fade out
      useNativeDriver: true,
    }).start(() => {
      setCommentsModalVisible(false);
    });
  };

  const openShare = (postId: any) => {
    setSelectedPostId(postId);
    setShareModalVisible(true);
    
    // Quick fade in animation
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const closeShare = () => {
    // Quick fade out animation
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setShareModalVisible(false);
    });
  };

  const toggleLike = (postId: any) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const toggleBookmark = (postId: any) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (newBookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
  };

  const toggleMute = (videoId: any) => {
    const newMutedVideos = new Set(mutedVideos);
    if (newMutedVideos.has(videoId)) {
      newMutedVideos.delete(videoId);
    } else {
      newMutedVideos.add(videoId);
    }
    setMutedVideos(newMutedVideos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/logo/instagram.png')}
                style={styles.logoImage}
              />
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton} onPress={navigateToNotifications}>
                <AntDesign name="hearto" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={navigateToMessages}>
                <Feather name="send" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stories */}
          <StoriesSection stories={stories} onStoryPress={openStoryViewer} />

          {/* Suggested Users */}
          <SuggestedUsers users={suggestedUsers} />

          {/* Feed Posts */}
          {feedPosts.map((post) => (
            <View key={post.id} style={styles.feedPost}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <View style={styles.postUserInfo}>
                  <TouchableOpacity onPress={() => navigateToProfile(post.username)}>
                    <Image 
                      source={{ uri: post.avatar }} 
                      style={styles.postAvatar}
                      onError={() => console.log('Post avatar failed to load')}
                    />
                  </TouchableOpacity>
                  <View style={styles.postUserDetails}>
                    <View style={styles.usernameRow}>
                      <TouchableOpacity onPress={() => navigateToProfile(post.username)}>
                        <View style={styles.usernameContainer}>
                          <Text style={styles.postUsername}>{post.username}</Text>
                          {post.isVerified && (
                            <AntDesign name="checkcircle" size={14} color="#0095F6" style={{ marginLeft: 4 }} />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                    {post.suggestedText && (
                      <Text style={styles.suggestedText}>{post.suggestedText}</Text>
                    )}
                    {post.musicTitle && (
                      <View style={styles.musicInfo}>
                        <Text style={styles.musicTitle}>{post.musicTitle}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.followButtonSmall}>
                    <Text style={styles.followButtonSmallText}>Follow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreIcon}>⋯</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Post Media - Carousel or Single */}
              {post.type === 'carousel' ? (
                <CarouselPost 
                  post={post} 
                  likedPosts={likedPosts}
                  toggleLike={toggleLike}
                  mutedVideos={mutedVideos}
                  toggleMute={toggleMute}
                />
              ) : (
                <SingleMedia 
                  post={{
                    id: post.id,
                    media: post.media.map(item => ({
                      ...item,
                      type: item.type as 'image' | 'video'
                    }))
                  }}
                  mutedVideos={mutedVideos}
                  toggleMute={toggleMute}
                />
              )}

              {/* Post Actions */}
              <View style={styles.postActionsBar}>
                <View style={styles.leftActions}>
                  <AnimatedHeart
                    isLiked={likedPosts.has(post.id)}
                    onPress={() => toggleLike(post.id)}
                    size={24}
                  />
                  <Text style={styles.engagementCount}>
                    {formatLikes(post.likes + (likedPosts.has(post.id) ? 1 : 0))}
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => openComments(post.id)}
                  >
                    <Feather name="message-circle" size={22} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.engagementCount}>
                    {formatLikes(post.comments)}
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => openShare(post.id)}
                  >
                    <Feather name="send" size={20} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.engagementCount}>
                    {formatLikes(post.shares)}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.bookmarkButton}
                  onPress={() => toggleBookmark(post.id)}
                >
                  <Feather 
                    name="bookmark" 
                    size={24} 
                    color={bookmarkedPosts.has(post.id) ? "#000" : "#000"}
                    fill={bookmarkedPosts.has(post.id) ? "#000" : "none"}
                  />
                </TouchableOpacity>
              </View>

              {/* Post Info */}
              <View style={styles.postInfo}>
                <View style={styles.captionContainer}>
                  <Text>
                    <TouchableOpacity onPress={() => navigateToProfile(post.username)}>
                      <Text style={styles.captionUsername}>{post.username}</Text>
                    </TouchableOpacity>
                    <Text style={styles.captionText}> </Text>
                    {renderTextWithHashtags(post.caption, styles.captionText, styles.hashtag)}
                  </Text>
                </View>
                <Text style={styles.postTimestamp}>{post.timestamp} ago</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Overlay when comments or share modal are open */}
        {(commentsModalVisible || shareModalVisible) && (
          <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
        )}
      </View>

      {/* Modals */}
      <StoryViewer
        visible={storyViewerVisible}
        stories={storyUsers}
        initialStoryIndex={selectedStoryIndex}
        initialUserIndex={selectedUserIndex}
        onClose={closeStoryViewer}
      />

      <CommentsModal
        visible={commentsModalVisible}
        onClose={closeComments}
        postId={selectedPostId}
        comments={[]}
      />

      <ShareModal
        visible={shareModalVisible}
        onClose={closeShare}
        postId={selectedPostId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  mainContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    height: 40,
    width: 120,
  },
  dropdownIcon: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  feedPost: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  postUserDetails: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  suggestedText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  musicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  musicTitle: {
    fontSize: 12,
    color: '#000',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButtonSmall: {
    backgroundColor: '#0095F6',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 8,
  },
  followButtonSmallText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  moreIcon: {
    fontSize: 16,
    color: '#000',
  },
  postActionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionButton: {
    marginRight: 4,
  },
  engagementCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 16,
  },
  bookmarkButton: {
    // No special styling needed
  },
  postInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  captionContainer: {
    marginBottom: 8,
  },
  captionUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  captionText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  hashtag: {
    fontSize: 14,
    color: '#0095F6',
    fontWeight: '400',
  },
  viewComments: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  postTimestamp: {
    fontSize: 12,
    color: '#8E8E93',
    textTransform: 'uppercase',
  },
});