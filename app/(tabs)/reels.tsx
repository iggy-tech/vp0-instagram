import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Animated,
  AppState
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Text } from '@/components/text';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ReelsScreen() {
  const [currentReel, setCurrentReel] = useState(0);
  const [likedReels, setLikedReels] = useState(new Set<number>());
  const [videosReady, setVideosReady] = useState(new Set<number>());
  const [isScreenFocused, setIsScreenFocused] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const heartAnimations = useRef<{[key: number]: Animated.Value}>({}).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Mock reels data with working video URLs
  const reels = [
    {
      id: 1,
      username: 'sarah_fitness',
      displayName: 'Sarah Johnson',
      description: 'Morning workout routine 💪',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      likes: '847K',
      comments: '5,123',
      shares: '76.2K',
      isFollowing: false,
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c041171b?w=100&h=100&fit=crop&crop=face',
      music: 'Original audio - sarah_fitness'
    },
    {
      id: 2,
      username: 'mike_adventures',
      displayName: 'Mike Chen',
      description: 'Amazing sunset views from the hike today 🌅',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      likes: '1.2M',
      comments: '8,947',
      shares: '145K',
      isFollowing: true,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      music: 'Nature sounds - relaxing'
    },
    {
      id: 3,
      username: 'alex_creates',
      displayName: 'Alex Martinez',
      description: 'Quick art tutorial for beginners ✨',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      likes: '623K',
      comments: '3,456',
      shares: '89.1K',
      isFollowing: false,
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      music: 'Creative vibes - upbeat'
    },
    {
      id: 4,
      username: 'emma_lifestyle',
      displayName: 'Emma Wilson',
      description: 'Morning coffee routine ☕',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      likes: '934K',
      comments: '6,782',
      shares: '112K',
      isFollowing: false,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      music: 'Chill morning - acoustic'
    },
    {
      id: 5,
      username: 'david_cooking',
      displayName: 'David Lee',
      description: 'Easy 5-minute pasta recipe 🍝',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      likes: '756K',
      comments: '4,321',
      shares: '98.3K',
      isFollowing: true,
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      music: 'Cooking beats - kitchen vibes'
    }
  ];

  // Create video players using useVideoPlayer hook properly (outside of any loops)
  const player1 = useVideoPlayer(reels[0]?.video, (player) => {
    player.loop = true;
    player.muted = false;
    player.addListener('statusChange', (status) => {
      console.log('Player 1 status:', status);
      if (status.status === 'readyToPlay' || status.status === 'loading') {
        setVideosReady(prev => new Set([...prev, 0]));
      }
    });
  });

  const player2 = useVideoPlayer(reels[1]?.video, (player) => {
    player.loop = true;
    player.muted = false;
    player.addListener('statusChange', (status) => {
      console.log('Player 2 status:', status);
      if (status.status === 'readyToPlay' || status.status === 'loading') {
        setVideosReady(prev => new Set([...prev, 1]));
      }
    });
  });

  const player3 = useVideoPlayer(reels[2]?.video, (player) => {
    player.loop = true;
    player.muted = false;
    player.addListener('statusChange', (status) => {
      console.log('Player 3 status:', status);
      if (status.status === 'readyToPlay' || status.status === 'loading') {
        setVideosReady(prev => new Set([...prev, 2]));
      }
    });
  });

  const player4 = useVideoPlayer(reels[3]?.video, (player) => {
    player.loop = true;
    player.muted = false;
    player.addListener('statusChange', (status) => {
      console.log('Player 4 status:', status);
      if (status.status === 'readyToPlay' || status.status === 'loading') {
        setVideosReady(prev => new Set([...prev, 3]));
      }
    });
  });

  const player5 = useVideoPlayer(reels[4]?.video, (player) => {
    player.loop = true;
    player.muted = false;
    player.addListener('statusChange', (status) => {
      console.log('Player 5 status:', status);
      if (status.status === 'readyToPlay' || status.status === 'loading') {
        setVideosReady(prev => new Set([...prev, 4]));
      }
    });
  });

  // Array of players for easy access
  const videoPlayers = [player1, player2, player3, player4, player5];

  // Handle screen focus changes (when navigating between tabs)
  useFocusEffect(
    React.useCallback(() => {
      console.log('Reels screen focused');
      setIsScreenFocused(true);
      
      return () => {
        console.log('Reels screen unfocused - pausing all videos');
        setIsScreenFocused(false);
        // Pause all videos when leaving the screen
        videoPlayers.forEach((player, index) => {
          try {
            player.pause();
            console.log(`Paused video ${index} due to screen unfocus`);
          } catch (error) {
            console.error(`Error pausing video ${index}:`, error);
          }
        });
      };
    }, [])
  );

  // Handle app state changes (when app goes to background)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      console.log('App state changed:', appState, '->', nextAppState);
      
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground');
        setAppState(nextAppState);
      } else if (nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background - pausing all videos');
        // Pause all videos when app goes to background
        videoPlayers.forEach((player, index) => {
          try {
            player.pause();
            console.log(`Paused video ${index} due to app background`);
          } catch (error) {
            console.error(`Error pausing video ${index}:`, error);
          }
        });
      }
      
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [appState]);

  // Handle video playback based on current reel AND screen focus AND app state
  useEffect(() => {
    console.log('Video control effect triggered:', {
      currentReel,
      isScreenFocused,
      appState
    });
    
    const timer = setTimeout(() => {
      videoPlayers.forEach((player, index) => {
        try {
          // Only play if screen is focused AND app is active AND it's the current reel
          if (index === currentReel && isScreenFocused && appState === 'active') {
            console.log(`Playing video ${index}`);
            player.play();
          } else {
            console.log(`Pausing video ${index}`, {
              isCurrentReel: index === currentReel,
              isScreenFocused,
              appState
            });
            player.pause();
          }
        } catch (error) {
          console.error(`Error controlling video ${index}:`, error);
        }
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [currentReel, isScreenFocused, appState]);

  const handleLikePress = (reelId: number) => {
    if (!heartAnimations[reelId]) {
      heartAnimations[reelId] = new Animated.Value(1);
    }

    const isLiked = likedReels.has(reelId);
    
    if (isLiked) {
      setLikedReels(prev => {
        const newSet = new Set(prev);
        newSet.delete(reelId);
        return newSet;
      });
    } else {
      setLikedReels(prev => new Set([...prev, reelId]));
      
      Animated.sequence([
        Animated.timing(heartAnimations[reelId], {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnimations[reelId], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    
    if (newIndex !== currentReel && newIndex >= 0 && newIndex < reels.length) {
      console.log(`Scrolling to reel ${newIndex}`);
      setCurrentReel(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerTabs}>
          <Text style={styles.reelsTitle}>Reels</Text>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
        decelerationRate="fast"
      >
        {reels.map((reel, index) => (
          <View key={reel.id} style={styles.reelContainer}>
            {/* Background Blurred Video - Always fills screen */}
            <View style={styles.backgroundVideoContainer}>
              <VideoView
                style={styles.backgroundVideo}
                player={videoPlayers[index]}
                contentFit="cover"
                nativeControls={false}
              />
              {/* Multiple blur overlays for better effect */}
              <View style={styles.blurOverlay1} />
              <View style={styles.blurOverlay2} />
              <View style={styles.blurOverlay3} />
            </View>

            {/* Main Video Container - Centered and properly sized */}
            <View style={styles.mainVideoContainer}>
              <VideoView
                style={styles.mainVideo}
                player={videoPlayers[index]}
                contentFit="contain"
                nativeControls={false}
              />
              
              {/* Loading indicator */}
              {!videosReady.has(index) && (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              )}
            </View>

            {/* Bottom gradient for text readability */}
            <View style={styles.bottomGradient} />

            {/* Side Actions */}
            <View style={styles.sideActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLikePress(reel.id)}
              >
                <Animated.View
                  style={{
                    transform: [{
                      scale: heartAnimations[reel.id] || new Animated.Value(1)
                    }]
                  }}
                >
                  <Feather 
                    name="heart" 
                    size={28} 
                    color={likedReels.has(reel.id) ? "#FF3040" : "#fff"}
                    fill={likedReels.has(reel.id) ? "#FF3040" : "none"}
                  />
                </Animated.View>
                <Text style={styles.actionCount}>{reel.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="message-circle" size={28} color="#fff" />
                <Text style={styles.actionCount}>{reel.comments}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="send" size={28} color="#fff" />
                <Text style={styles.actionCount}>{reel.shares}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="more-horizontal" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Bottom Content */}
            <View style={styles.bottomContent}>
              <View style={styles.userInfo}>
                <View style={styles.userDetails}>
                  <Image source={{ uri: reel.avatar }} style={styles.userAvatar} />
                  <Text style={styles.username}>@{reel.username}</Text>
                  {reel.isVerified && (
                    <Feather name="check-circle" size={14} color="#0095F6" style={styles.verifiedIcon} />
                  )}
                  {!reel.isFollowing && (
                    <TouchableOpacity style={styles.followButton}>
                      <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              
              <Text style={styles.description} numberOfLines={2}>
                {reel.description}
              </Text>
              
              <View style={styles.musicInfo}>
                <Feather name="music" size={12} color="#fff" style={styles.musicIconSmall} />
                <Text style={styles.musicText}>{reel.music}</Text>
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
  topHeader: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reelsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 24,
  },
  scrollView: {
    flex: 1,
  },
  reelContainer: {
    width: width,
    height: height,
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  
  // Background video styles - fills entire screen and gets blurred
  backgroundVideoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundVideo: {
    width: width * 2,
    height: height * 2,
    position: 'absolute',
  },
  blurOverlay1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  blurOverlay2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
  },
  blurOverlay3: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(15px)',
  },
  
  // Main video styles - full height coverage
  mainVideoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  mainVideo: {
    width: width,
    height: height,
    maxWidth: width,
    maxHeight: height,
  },
  
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 2,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    zIndex: 1,
  },
  
  sideActions: {
    position: 'absolute',
    right: 12,
    bottom: 120,
    alignItems: 'center',
    zIndex: 3,
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 12,
  },
  actionCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 80,
    zIndex: 3,
  },
  userInfo: {
    marginBottom: 8,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  verifiedIcon: {
    marginRight: 8,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  followText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  musicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIconSmall: {
    marginRight: 8,
  },
  musicText: {
    color: '#fff',
    fontSize: 12,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});