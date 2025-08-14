import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  Dimensions 
} from 'react-native';
import { Text } from '@/components/text';
import { Feather } from '@expo/vector-icons';
import SearchResultsScreen from '../search-results-screen';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Diverse image collection for explore feed
  const exploreImages = [
    // Row 1: Large image + 2 small images
    {
      id: '1',
      uri: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop',
      size: 'large',
    },
    {
      id: '2', 
      uri: 'https://images.unsplash.com/photo-1755048817618-2e7bafe5ab37?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      size: 'small',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=600&fit=crop',
      size: 'small',
      type: 'multiple',
    },
    
    // Row 2: 2 small images + large image  
    {
      id: '4',
      uri: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&h=600&fit=crop',
      size: 'small',
      type: 'video',
    },
    {
      id: '5',
      uri: 'https://images.unsplash.com/photo-1755038995966-fc38014fd7ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
      size: 'small',
    },
    {
      id: '6',
      uri: 'https://images.unsplash.com/photo-1743527133813-36f6bb63ddd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D',
      size: 'large',
    },

    // Row 3: Large + small + small
    {
      id: '7',
      uri: 'https://images.unsplash.com/photo-1754993577931-f752477094b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D',
      size: 'large',
      type: 'video',
    },
    {
      id: '8',
      uri: 'https://images.unsplash.com/photo-1755001266339-06922afc7cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D',
      size: 'small',
    },
    {
      id: '9',
      uri: 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=600&h=600&fit=crop',
      size: 'small',
      type: 'multiple',
    },

    // Row 4: Small + large + small
    {
      id: '10',
      uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
      size: 'small',
    },
    {
      id: '11',
      uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop',
      size: 'large',
      type: 'video',
    },
    {
      id: '12',
      uri: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop',
      size: 'small',
      type: 'multiple',
    },

    // Row 5: 3 equal squares
    {
      id: '13',
      uri: 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: '14',
      uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop',
      size: 'square',
      type: 'video',
    },
    {
      id: '15',
      uri: 'https://images.unsplash.com/photo-1600607688093-9c9d0e5b5f24?w=600&h=600&fit=crop',
      size: 'square',
    },

    // Row 6: Large + small + small
    {
      id: '16',
      uri: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&h=600&fit=crop',
      size: 'large',
      type: 'multiple',
    },
    {
      id: '17',
      uri: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=600&fit=crop',
      size: 'small',
    },
    {
      id: '18',
      uri: 'https://images.unsplash.com/photo-1754079132860-5b37dab49daa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4MHx8fGVufDB8fHx8fA%3D%3D',
      size: 'small',
      type: 'video',
    },

    // Additional rows for more content
    {
      id: '19',
      uri: 'https://images.unsplash.com/photo-1755038996155-b1e2bb7c1795?q=80&w=694&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      size: 'square',
    },
    {
      id: '20',
      uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop',
      size: 'square',
      type: 'multiple',
    },
    {
      id: '21',
      uri: 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=600&h=600&fit=crop',
      size: 'square',
      type: 'video',
    },

    {
      id: '22',
      uri: 'https://images.unsplash.com/photo-1754079132679-d9bbe1ba79cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5Mnx8fGVufDB8fHx8fA%3D%3D',
      size: 'large',
    },
    {
      id: '23',
      uri: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop',
      size: 'small',
      type: 'video',
    },
    {
      id: '24',
      uri: 'https://images.unsplash.com/photo-1600607688960-fcb776dc1c28?w=600&h=600&fit=crop',
      size: 'small',
    },
  ];

  const renderGridImages = () => {
    const gap = 2;
    const smallSize = (width - gap * 2) / 3;
    const largeSize = smallSize * 2 + gap;
    const rows = [];
    
    let imageIndex = 0;
    
    // Define different row patterns like Instagram
    const patterns = [
      [{ size: 'large', count: 1 }, { size: 'small', count: 2 }], // Large + 2 small
      [{ size: 'small', count: 2 }, { size: 'large', count: 1 }], // 2 small + large
      [{ size: 'square', count: 3 }], // 3 equal squares
      [{ size: 'large', count: 1 }, { size: 'small', count: 2 }], // Large + 2 small
    ];
    
    let patternIndex = 0;
    
    while (imageIndex < exploreImages.length) {
      const currentPattern = patterns[patternIndex % patterns.length];
      const rowImages = [];
      let currentRowIndex = imageIndex;
      
      // Build row based on pattern
      for (const segment of currentPattern) {
        for (let i = 0; i < segment.count && currentRowIndex < exploreImages.length; i++) {
          const img = exploreImages[currentRowIndex];
          rowImages.push({
            ...img,
            displaySize: segment.size
          });
          currentRowIndex++;
        }
      }
      
      if (rowImages.length === 0) break;
      
      // Render the row
      rows.push(
        <View key={`row-${imageIndex}`} style={[styles.gridRow, { height: smallSize }]}>
          {rowImages.map((img, index) => {
            let imageWidth;
            if (img.displaySize === 'large') {
              imageWidth = largeSize;
            } else {
              imageWidth = smallSize;
            }
            
            return (
              <TouchableOpacity 
                key={img.id} 
                style={[
                  styles.imageContainer, 
                  { 
                    width: imageWidth,
                    height: smallSize,
                    marginLeft: index > 0 ? gap : 0
                  }
                ]}
                activeOpacity={0.9}
              >
                <Image source={{ uri: img.uri }} style={styles.image} resizeMode="cover" />
                {img.type === 'video' && (
                  <View style={styles.videoIndicator}>
                    <Feather name="play" size={12} color="white" />
                  </View>
                )}
                {img.type === 'multiple' && (
                  <View style={styles.multipleIndicator}>
                    <Feather name="copy" size={12} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      );
      
      imageIndex = currentRowIndex;
      patternIndex++;
    }
    
    return rows;
  };

  const handleSearchPress = () => {
    setShowSearchResults(true);
  };

  const handleBackPress = () => {
    setShowSearchResults(false);
  };

  if (showSearchResults) {
    return <SearchResultsScreen onBack={handleBackPress} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.searchContainer} 
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Feather name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Grid Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {renderGridImages()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#8E8E93',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    padding: 0,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#F0F0F0',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  videoIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multipleIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});