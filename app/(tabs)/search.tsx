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

  const exploreImages = [
    // More diverse content
    {
      id: '1',
      uri: 'https://images.unsplash.com/photo-1494790108755-2616c041171b?w=400&h=600&fit=crop',
      size: 'large',
      type: 'video',
    },
    {
      id: '2', 
      uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', 
      size: 'small',
      type: 'video',
    },
    
    {
      id: '4',
      uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '5',
      uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
      size: 'small',
      type: 'multiple',
    },
    {
      id: '6',
      uri: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
      size: 'large',
    },
    
    {
      id: '7',
      uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
      size: 'small',
      type: 'video',
    },
    {
      id: '8',
      uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '9',
      uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      size: 'small',
    },
    
    {
      id: '10',
      uri: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=250&fit=crop',
      size: 'rectangle',
      type: 'multiple',
    },
    {
      id: '11',
      uri: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '12',
      uri: 'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=200&h=200&fit=crop',
      size: 'small',
      type: 'video',
    },
    
    {
      id: '13',
      uri: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '14',
      uri: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '15',
      uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
      size: 'small',
    },
    
    {
      id: '16',
      uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop',
      size: 'small',
      type: 'multiple',
    },
    {
      id: '17',
      uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '18',
      uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=250&fit=crop',
      size: 'rectangle',
      type: 'video',
    },
    
    {
      id: '19',
      uri: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '20',
      uri: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '21',
      uri: 'https://images.unsplash.com/photo-1476493279419-b785d1675221?w=200&h=200&fit=crop',
      size: 'small',
      type: 'video',
    },
    
    {
      id: '22',
      uri: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop',
      size: 'large',
      type: 'multiple',
    },
    {
      id: '23',
      uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '24',
      uri: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=200&h=200&fit=crop',
      size: 'small',
    },
    
    {
      id: '25',
      uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
      size: 'small',
    },
    {
      id: '26',
      uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop',
      size: 'small',
      type: 'video',
    },
    {
      id: '27',
      uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
      size: 'small',
    },
  ];

  const getImageStyle = (size) => {
    const baseSize = (width - 4) / 3; // Account for gaps
    
    switch (size) {
      case 'large':
        return {
          width: baseSize * 2 + 2,
          height: baseSize * 2 + 2,
        };
      case 'rectangle':
        return {
          width: baseSize * 2 + 2,
          height: baseSize,
        };
      case 'small':
      default:
        return {
          width: baseSize,
          height: baseSize,
        };
    }
  };

  const renderGridImages = () => {
    const rows = [];
    let currentRow = [];
    let currentRowWidth = 0;
    const maxRowWidth = 3;

    exploreImages.forEach((image) => {
      const itemWidth = image.size === 'large' || image.size === 'rectangle' ? 2 : 1;
      
      if (currentRowWidth + itemWidth > maxRowWidth) {
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
          currentRow = [];
          currentRowWidth = 0;
        }
      }
      
      currentRow.push(image);
      currentRowWidth += itemWidth;
      
      if (currentRowWidth >= maxRowWidth) {
        rows.push([...currentRow]);
        currentRow = [];
        currentRowWidth = 0;
      }
    });
    
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.gridRow}>
        {row.map((image) => (
          <TouchableOpacity 
            key={image.id} 
            style={[styles.imageContainer, getImageStyle(image.size)]}
          >
            <Image 
              source={{ uri: image.uri }} 
              style={styles.image}
              resizeMode="cover"
            />
            {image.type === 'video' && (
              <View style={styles.videoIndicator}>
                <Feather name="play" size={14} color="white" />
              </View>
            )}
            {image.type === 'multiple' && (
              <View style={styles.multipleIndicator}>
                <Feather name="copy" size={14} color="white" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    ));
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
          <Text style={styles.searchPlaceholder}>Search with Meta AI</Text>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
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
    padding: 1,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  imageContainer: {
    marginRight: 2,
    position: 'relative',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multipleIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});