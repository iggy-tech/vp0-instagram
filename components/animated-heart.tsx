import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface AnimatedHeartProps {
  isLiked: boolean;
  onPress: () => void;
  size?: number;
}

export default function AnimatedHeart({ isLiked, onPress, size = 24 }: AnimatedHeartProps) {
  // Animation values
  const bounceY = useRef(new Animated.Value(0)).current;
  const gradientProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLiked) {
      // Single smooth vertical bounce - up and back down in one motion
      Animated.parallel([
        // Y movement - one continuous path
        Animated.timing(bounceY, {
          toValue: 1,
          duration: 400, // Slower, smoother animation
          useNativeDriver: true,
        }),
        // Gradient animation
        Animated.timing(gradientProgress, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Reset animations when unliked
      bounceY.setValue(0);
      gradientProgress.setValue(0);
    }
  }, [isLiked]);

  // Single vertical bounce path - up then down
  const translateY = bounceY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -45, 0], // Goes up 25px at midpoint, then back to 0
  });

  // Gradient color interpolation
  const heartColor = gradientProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#FF3040', '#FF6B8A', '#FF3040'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.heartButton}>
        {/* Main heart icon with single vertical bounce */}
        <Animated.View
          style={{
            transform: [
              { translateY: translateY },
            ],
          }}
        >
          {isLiked ? (
            <Animated.Text
              style={[
                styles.gradientHeart,
                {
                  fontSize: size,
                  color: heartColor,
                }
              ]}
            >
              ♥
            </Animated.Text>
          ) : (
            <Text
              style={[
                styles.outlineHeart,
                {
                  fontSize: size,
                }
              ]}
            >
              ♡
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    minHeight: 46,
      marginRight: 4,
  },
  heartButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  gradientHeart: {
    fontWeight: 'bold',

  },
  outlineHeart: {
    fontWeight: 'normal',
    color: '#000',
  },
});