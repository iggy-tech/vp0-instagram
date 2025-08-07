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
import { useRouter } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import StoryViewer from '@/components/story-viewer';
import CommentsModal from '@/components/comments-modal';
import CarouselPost from '@/components/carousel-post';
import SingleMedia from '@/components/single-media';
import StoriesSection from '@/components/stories-section';
import SuggestedUsers from '@/components/suggested-users';
import { renderTextWithHashtags } from '@/utils/text-utils';
import { storyUsers, suggestedUsers, feedPosts } from '@/data/mock-data';

// Helper function to format like counts
const formatLikes = (count) => {
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
  const [selectedPostId, setSelectedPostId] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [mutedVideos, setMutedVideos] = useState(new Set());

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

  const openStoryViewer = (userIndex) => {
    setSelectedUserIndex(userIndex);
    setSelectedStoryIndex(0);
    setStoryViewerVisible(true);
  };

  const closeStoryViewer = () => {
    setStoryViewerVisible(false);
  };

  const openComments = (postId) => {
    setSelectedPostId(postId);
    setCommentsModalVisible(true);
  };

  const closeComments = () => {
    setCommentsModalVisible(false);
  };

  const toggleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const toggleBookmark = (postId) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (newBookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
  };

  const toggleMute = (videoId) => {
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
            <TouchableOpacity style={styles.iconButton}>
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
                <Image 
                  source={{ uri: post.avatar }} 
                  style={styles.postAvatar}
                  onError={() => console.log('Post avatar failed to load')}
                />
                <View style={styles.postUserDetails}>
                  <View style={styles.usernameRow}>
                    <Text style={styles.postUsername}>{post.username}</Text>
                    {post.isVerified && (
                      <AntDesign name="checkcircle" size={14} color="#0095F6" style={{ marginLeft: 4 }} />
                    )}
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
                post={post}
                mutedVideos={mutedVideos}
                toggleMute={toggleMute}
              />
            )}

            {/* Post Actions */}
            <View style={styles.postActionsBar}>
              <View style={styles.leftActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => toggleLike(post.id)}
                >
                  <AntDesign 
                    name={likedPosts.has(post.id) ? "heart" : "hearto"} 
                    size={24} 
                    color={likedPosts.has(post.id) ? "#FF3040" : "#000"} 
                  />
                </TouchableOpacity>
                <Text style={styles.engagementCount}>
                  {formatLikes(post.likes + (likedPosts.has(post.id) ? 1 : 0))}
                </Text>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => openComments(post.id)}
                >
                  <Feather name="message-circle" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.engagementCount}>
                  {formatLikes(post.comments)}
                </Text>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Feather name="send" size={24} color="#000" />
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
                  name={bookmarkedPosts.has(post.id) ? "bookmark" : "bookmark"} 
                  size={24} 
                  color="#000" 
                  fill={bookmarkedPosts.has(post.id) ? "#000" : "none"}
                />
              </TouchableOpacity>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
              <View style={styles.captionContainer}>
                <Text>
                  <Text style={styles.captionUsername}>{post.username}</Text>
                  <Text style={styles.captionText}> </Text>
                  {renderTextWithHashtags(post.caption, styles.captionText, styles.hashtag)}
                </Text>
              </View>
              <Text style={styles.postTimestamp}>{post.timestamp} ago</Text>
            </View>
          </View>
        ))}
      </ScrollView>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
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
    height: 30,
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
    marginRight: 8,
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