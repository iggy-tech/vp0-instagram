import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Story {
  id: string;
  type: string;
  media: string; // Changed from 'image' to 'media' to match your data
  timestamp: string;
}

interface StoryUser {
  id: string;
  username: string;
  avatar: string;
  stories: Story[];
}

interface StoryViewerProps {
  visible: boolean;
  stories: StoryUser[];
  initialStoryIndex: number;
  initialUserIndex: number;
  onClose: () => void;
}

export default function StoryViewer({ 
  visible, 
  stories, 
  initialStoryIndex, 
  initialUserIndex, 
  onClose 
}: StoryViewerProps) {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentUser = stories[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const totalStories = currentUser?.stories.length || 0;

  // Story duration (5 seconds)
  const STORY_DURATION = 5000;

  useEffect(() => {
    if (visible) {
      // Reset states when opening
      setCurrentUserIndex(initialUserIndex);
      setCurrentStoryIndex(initialStoryIndex);
      setProgress(0);
      progressAnim.setValue(0);
      
      // Simple fade in animation (no bounce)
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();

      // Delay starting progress to ensure state is set
      setTimeout(() => {
        startProgress();
      }, 100);
    } else {
      // Quick fade out
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      
      stopProgress();
    }

    return () => stopProgress();
  }, [visible]);

  // Separate effect for story changes
  useEffect(() => {
    if (visible && !isPaused) {
      startProgress();
    }
  }, [currentUserIndex, currentStoryIndex]);

  useEffect(() => {
    if (isPaused) {
      stopProgress();
    } else if (visible) {
      startProgress();
    }
  }, [isPaused]);

  const startProgress = () => {
    stopProgress();
    progressAnim.setValue(0);
    
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isPaused) {
        goToNextStory();
      }
    });
  };

  const stopProgress = () => {
    progressAnim.stopAnimation();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goToNextStory = () => {
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      goToNextUser();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      goToPrevUser();
    }
  };

  const goToNextUser = () => {
    if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
  };

  const goToPrevUser = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
  };

  const handleTapLeft = () => {
    goToPrevStory();
  };

  const handleTapRight = () => {
    goToNextStory();
  };

  const handleLongPressIn = () => {
    setIsPaused(true);
  };

  const handleLongPressOut = () => {
    setIsPaused(false);
  };

  if (!visible || !currentUser || !currentStory) return null;

  // Debug logging to help troubleshoot
  console.log('Current story media:', currentStory.media);
  console.log('Story type:', currentStory.type);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.storyContainer,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Background Image/Video */}
          {currentStory.type === 'video' ? (
            // For videos, you'll need to implement video player
            // For now, showing a placeholder
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoPlaceholderText}>Video: {currentStory.media}</Text>
            </View>
          ) : (
            <Image 
              source={{ uri: currentStory.media }} 
              style={styles.storyImage}
              resizeMode="cover"
              onError={(error) => {
                console.log('Image load error:', error.nativeEvent.error);
                console.log('Failed URL:', currentStory.media);
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', currentStory.media);
              }}
            />
          )}

          {/* Dark overlay */}
          <View style={styles.overlay} />

          {/* Progress bars */}
          <View style={styles.progressContainer}>
            {currentUser.stories.map((_, index) => (
              <View key={index} style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    {
                      width: 
                        index < currentStoryIndex 
                          ? '100%' 
                          : index === currentStoryIndex
                          ? progressAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            })
                          : '0%'
                    }
                  ]}
                />
              </View>
            ))}
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{currentUser.username}</Text>
              <Text style={styles.timestamp}>{currentStory.timestamp}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <AntDesign name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Tap areas */}
          <View style={styles.tapAreas}>
            <TouchableOpacity 
              style={styles.tapLeft}
              onPress={handleTapLeft}
              onPressIn={handleLongPressIn}
              onPressOut={handleLongPressOut}
              activeOpacity={1}
            />
            <TouchableOpacity 
              style={styles.tapRight}
              onPress={handleTapRight}
              onPressIn={handleLongPressIn}
              onPressOut={handleLongPressOut}
              activeOpacity={1}
            />
          </View>

          {/* Bottom actions */}
          <View style={styles.bottomActions}>
            <View style={styles.replyContainer}>
              <TouchableOpacity style={styles.replyInput}>
                <Text style={styles.replyPlaceholder}>Send message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heartButton}>
                <AntDesign name="hearto" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Feather name="send" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    width: width,
    height: height,
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholderText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    left: 8,
    right: 8,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  closeButton: {
    padding: 8,
  },
  tapAreas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  tapLeft: {
    flex: 1,
  },
  tapRight: {
    flex: 1,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 50,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  replyInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  replyPlaceholder: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});