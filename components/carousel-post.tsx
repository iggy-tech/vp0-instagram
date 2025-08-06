import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { getVideoSource } from '@/utils/video-utils';

const { width } = Dimensions.get('window');

const CarouselPost = ({ post, likedPosts, toggleLike, mutedVideos, toggleMute }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIndicators, setShowIndicators] = useState(true);
  const flatListRef = useRef(null);

  const renderMediaItem = ({ item, index }) => {
    if (item.type === 'video') {
      const videoSource = getVideoSource(item.url);

      return (
        <TouchableOpacity 
          style={styles.mediaContainer}
          activeOpacity={1}
          onPress={() => setShowIndicators(!showIndicators)}
        >
          <Video
            source={videoSource}
            style={styles.postMedia}
            resizeMode={ResizeMode.COVER}
            shouldPlay={index === currentIndex} // Only play current video
            isLooping={true}
            isMuted={!mutedVideos.has(`${post.id}-${index}`)}
            useNativeControls={false}
          />
          
          {/* Video Controls */}
          <TouchableOpacity 
            style={styles.muteButton}
            onPress={() => toggleMute(`${post.id}-${index}`)}
          >
            <Ionicons 
              name={mutedVideos.has(`${post.id}-${index}`) ? "volume-high" : "volume-mute"} 
              size={20} 
              color="#fff" 
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity 
          style={styles.mediaContainer}
          activeOpacity={1}
          onPress={() => setShowIndicators(!showIndicators)}
        >
          <Image 
            source={{ uri: item.url }} 
            style={styles.postMedia}
            onError={() => console.log('Post image failed to load')}
          />
        </TouchableOpacity>
      );
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={post.media}
        renderItem={renderMediaItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item, index) => `${post.id}-${index}`}
      />
      
      {/* Page Indicators (top right) */}
      {post.media.length > 1 && showIndicators && (
        <View style={styles.pageIndicator}>
          <Text style={styles.pageIndicatorText}>
            {currentIndex + 1}/{post.media.length}
          </Text>
        </View>
      )}

      {/* Carousel Indicators (bottom) */}
      {post.media.length > 1 && (
        <View style={styles.carouselIndicators}>
          {post.media.map((_, index) => {
            // Calculate distance from current index for sizing effect
            const distance = Math.abs(index - currentIndex);
            let size = 6; // default size
            let opacity = 0.4; // default opacity
            
            if (distance === 0) {
              size = 8; // current indicator is largest
              opacity = 1;
            } else if (distance === 1) {
              size = 6; // adjacent indicators are medium
              opacity = 0.6;
            } else {
              size = 4; // distant indicators are smallest
              opacity = 0.3;
            }
            
            return (
              <View
                key={index}
                style={[
                  {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    opacity: opacity,
                    backgroundColor: index === currentIndex ? '#0095F6' : 'rgba(142, 142, 147, 0.6)',
                  }
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    position: 'relative',
    width: width,
    height: width,
  },
  postMedia: {
    width: width,
    height: width,
    backgroundColor: '#f0f0f0',
  },
  muteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pageIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  carouselContainer: {
    position: 'relative',

    marginBottom: 28,
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  
});

export default CarouselPost;