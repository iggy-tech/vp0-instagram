import React from 'react';
import { 
  View, 
 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from '@/components/text';
import { LinearGradient } from 'expo-linear-gradient';

const StoriesSection = ({ stories, onStoryPress }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.storiesContainer}
      contentContainerStyle={styles.storiesContent}
    >
      {stories.map((story, index) => (
        <TouchableOpacity 
          key={story.id} 
          style={styles.storyItem}
          onPress={() => onStoryPress(index)}
        >
          <View style={styles.storyAvatar}>
            {story.hasStory && !story.isYourStory ? (
              <LinearGradient
                colors={['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <View style={styles.storyImageContainer}>
                  <Image 
                    source={{ uri: story.image }} 
                    style={styles.storyImage}
                    onError={() => console.log('Story image failed to load')}
                  />
                </View>
              </LinearGradient>
            ) : story.isYourStory ? (
              <View style={styles.yourStoryContainer}>
                <Image 
                  source={{ uri: story.image }} 
                  style={styles.storyImage}
                  onError={() => console.log('Story image failed to load')}
                />
                <View style={styles.addButton}>
                  <Text style={styles.plusIcon}>+</Text>
                </View>
              </View>
            ) : (
              <Image 
                source={{ uri: story.image }} 
                style={styles.storyImage}
                onError={() => console.log('Story image failed to load')}
              />
            )}
          </View>
          <Text style={styles.storyUsername} numberOfLines={1}>
            {story.username}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  storiesContent: {
    paddingHorizontal: 8,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyAvatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginBottom: 4,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImageContainer: {
    width: 61,
    height: 61,
    borderRadius: 30.5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourStoryContainer: {
    width: 66,
    height: 66,
    borderRadius: 33,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBDBDB',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  addButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0095F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  plusIcon: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  storyUsername: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});

export default StoriesSection;