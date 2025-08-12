import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Animated
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width, height } = Dimensions.get('window');

export default function ReelsScreen() {
  const [currentReel, setCurrentReel] = useState(0);
  const [likedReels, setLikedReels] = useState(new Set<number>());
  const [videoDimensions, setVideoDimensions] = useState<{[key: number]: {width: number, height: number, aspectRatio: number}}>({});
  const heartAnimations = useRef<{[key: number]: Animated.Value}>({}).current;

  // Mock reels data with real Pexels videos (no overlay text)
  const reels = [
    {
      id: 1,
      username: 'sarah_fitness',
      displayName: 'Sarah Johnson',
      description: 'Morning workout routine 💪',
      video: 'https://videos.pexels.com/video-files/3044681/3044681-uhd_2560_1440_24fps.mp4',
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
      video: 'https://videos.pexels.com/video-files/5752724/5752724-hd_720_1280_25fps.mp4',
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
      video: 'https://videos.pexels.com/video-files/4827401/4827401-hd_720_1280_30fps.mp4',
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
      video: 'https://videos.pexels.com/video-files/6389759/6389759-hd_720_1280_30fps.mp4',
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
      video: 'https://videos.pexels.com/video-files/4638650/4638650-hd_720_1280_25fps.mp4',
      likes: '756K',
      comments: '4,321',
      shares: '98.3K',
      isFollowing: true,
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      music: 'Cooking beats - kitchen vibes'
    },
    {
      id: 6,
      username: 'jessica_travel',
      displayName: 'Jessica Brown',
      description: 'Beautiful city lights at night ✨',
      video: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_1440_2732_25fps.mp4',
      likes: '1.1M',
      comments: '7,654',
      shares: '134K',
      isFollowing: false,
      isVerified: false,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      music: 'City nights - electronic'
    },
    {
      id: 7,
      username: 'ryan_sports',
      displayName: 'Ryan Taylor',
      description: 'Basketball training session 🏀',
      video: 'https://videos.pexels.com/video-files/5752729/5752729-hd_720_1280_25fps.mp4',
      likes: '892K',
      comments: '5,987',
      shares: '87.5K',
      isFollowing: true,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      music: 'Sports motivation - energetic'
    },
    {
      id: 8,
      username: 'maya_dance',
      displayName: 'Maya Patel',
      description: 'Quick dance routine to trending song 💃',
      video: 'https://videos.pexels.com/video-files/4827462/4827462-hd_720_1280_30fps.mp4',
      likes: '2.1M',
      comments: '12.3K',
      shares: '267K',
      isFollowing: false,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      music: 'Trending dance beat'
    }
  ];

  // Create video players for background and main videos
  const backgroundPlayers = reels.map((reel, index) => 
    useVideoPlayer(reel.video, player => {
      player.loop = true;
      player.muted = true;
      
      // Listen for video load to get dimensions
      player.addListener('statusChange', (status) => {
        if (status.isLoaded && player.videoSize) {
          const videoWidth = player.videoSize.width;
          const videoHeight = player.videoSize.height;
          const aspectRatio = videoWidth / videoHeight;
          
          setVideoDimensions(prev => ({
            ...prev,
            [reel.id]: {
              width: videoWidth,
              height: videoHeight,
              aspectRatio: aspectRatio
            }
          }));
        }
      });
    })
  );

  const mainPlayers = reels.map((reel, index) => 
    useVideoPlayer(reel.video, player => {
      player.loop = true;
      player.muted = false;
      
      // Listen for video load to get dimensions (same as background)
      player.addListener('statusChange', (status) => {
        if (status.isLoaded && player.videoSize) {
          const videoWidth = player.videoSize.width;
          const videoHeight = player.videoSize.height;
          const aspectRatio = videoWidth / videoHeight;
          
          setVideoDimensions(prev => ({
            ...prev,
            [reel.id]: {
              width: videoWidth,
              height: videoHeight,
              aspectRatio: aspectRatio
            }
          }));
        }
      });
    })
  );

  // Function to get dynamic styles based on video dimensions
  const getVideoStyles = (reelId: number, isBackground: boolean = false) => {
    const videoDim = videoDimensions[reelId];
    const screenAspectRatio = width / height;
    
    if (!videoDim) {
      // Default styles while loading
      return isBackground ? styles.backgroundVideoDefault : styles.mainVideoDefault;
    }
    
    const videoAspectRatio = videoDim.aspectRatio;
    const isPortrait = videoAspectRatio < 1;
    const isLandscape = videoAspectRatio > 1.5;
    const isSquareish = videoAspectRatio >= 1 && videoAspectRatio <= 1.5;
    
    if (isBackground) {
      // Background should always fill and be larger for blur effect
      return {
        width: width * 1.8,
        height: height * 1.8,
        position: 'absolute' as const,
        opacity: 0.6,
      };
    } else {
      // Main video adaptive sizing
      if (isPortrait) {
        // Portrait video - fill height, center horizontally
        if (videoAspectRatio >= screenAspectRatio) {
          // Video is wider relative to screen
          return {
            width: width,
            height: width / videoAspectRatio,
            alignSelf: 'center' as const,
          };
        } else {
          // Video is taller relative to screen - perfect for mobile
          return {
            width: height * videoAspectRatio,
            height: height,
            alignSelf: 'center' as const,
          };
        }
      } else if (isLandscape) {
        // Landscape video - fit within screen bounds
        return {
          width: width,
          height: width / videoAspectRatio,
          alignSelf: 'center' as const,
        };
      } else {
        // Square-ish video
        return {
          width: width,
          height: width / videoAspectRatio,
          alignSelf: 'center' as const,
        };
      }
    }
  };

  // Handle video playback based on current reel
  useEffect(() => {
    const timer = setTimeout(() => {
      backgroundPlayers.forEach((player, index) => {
        try {
          if (index === currentReel) {
            player.play();
          } else {
            player.pause();
          }
        } catch (error) {
          console.log('Background player error:', error);
        }
      });

      mainPlayers.forEach((player, index) => {
        try {
          if (index === currentReel) {
            player.play();
          } else {
            player.pause();
          }
        } catch (error) {
          console.log('Main player error:', error);
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentReel]);

  const handleLikePress = (reelId: number) => {
    if (!heartAnimations[reelId]) {
      heartAnimations[reelId] = new Animated.Value(0);
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerTabs}>
          <Text style={styles.reelsTitle}>Reels</Text>
          <Text style={styles.friendsTitle}>Friends</Text>
        </View>
        <View style={styles.headerIcons}>
          <View style={styles.friendsAvatars}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=30&h=30&fit=crop&crop=face' }}
              style={styles.friendAvatar}
            />
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c041171b?w=30&h=30&fit=crop&crop=face' }}
              style={[styles.friendAvatar, { marginLeft: -8 }]}
            />
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=30&h=30&fit=crop&crop=face' }}
              style={[styles.friendAvatar, { marginLeft: -8 }]}
            />
          </View>
        </View>
      </View>
      
      <ScrollView 
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.y / height);
          setCurrentReel(newIndex);
        }}
        style={styles.scrollView}
      >
        {reels.map((reel, index) => (
          <View key={reel.id} style={styles.reelContainer}>
            {/* Dynamic Blurred Background */}
            <View style={styles.backgroundVideoContainer}>
              <VideoView
                style={getVideoStyles(reel.id, true)}
                player={backgroundPlayers[index]}
                contentFit="cover"
                nativeControls={false}
              />
              <View style={styles.blurOverlay} />
              <View style={styles.blurOverlay2} />
              <View style={styles.blurOverlay3} />
            </View>

            {/* Dynamic Main Video Container */}
            <View style={styles.mainVideoContainer}>
              <VideoView
                style={getVideoStyles(reel.id, false)}
                player={mainPlayers[index]}
                contentFit="contain"
                nativeControls={false}
              />
            </View>

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
              
              <TouchableOpacity style={styles.profilePicture}>
                <Image source={{ uri: reel.avatar }} style={styles.avatarImage} />
                {!reel.isFollowing && (
                  <View style={styles.followPlusButton}>
                    <Feather name="plus" size={12} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.musicButton}>
                <Image 
                  source={{ uri: reel.avatar }}
                  style={styles.musicIcon}
                />
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
  friendsTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 20,
    fontWeight: '400',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendsAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  reelContainer: {
    width: width,
    height: height,
    position: 'relative',
    backgroundColor: '#000',
  },
  backgroundVideoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Default styles for videos while loading
  backgroundVideoDefault: {
    width: width * 1.8,
    height: height * 1.8,
    position: 'absolute',
    opacity: 0.6,
  },
  mainVideoDefault: {
    width: width,
    height: height,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blurOverlay2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  blurOverlay3: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mainVideoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  sideActions: {
    position: 'absolute',
    right: 12,
    bottom: 120,
    alignItems: 'center',
    zIndex: 2,
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
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginTop: 20,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  followPlusButton: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF3040',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  musicButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: 16,
  },
  musicIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 80,
    zIndex: 2,
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