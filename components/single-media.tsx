import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { getVideoSource } from '@/utils/video-utils';

const { width } = Dimensions.get('window');

const SingleMedia = ({ post, mutedVideos, toggleMute }) => {
  const media = post.media[0];
  
  if (media.type === 'video') {
    const videoSource = getVideoSource(media.url);

    return (
      <View style={styles.videoContainer}>
        <Video
          source={videoSource}
          style={styles.postMedia}
          resizeMode={ResizeMode.COVER}
          shouldPlay={true}
          isLooping={true}
          isMuted={!mutedVideos.has(post.id)}
          useNativeControls={false}
        />
        
        <TouchableOpacity 
          style={styles.muteButton}
          onPress={() => toggleMute(post.id)}
        >
          <Ionicons 
            name={mutedVideos.has(post.id) ? "volume-high" : "volume-mute"} 
            size={20} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <Image 
        source={{ uri: media.url }} 
        style={styles.postMedia}
        onError={() => console.log('Post image failed to load')}
      />
    );
  }
};

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
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
});

export default SingleMedia;