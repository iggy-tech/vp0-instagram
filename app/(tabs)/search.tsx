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
      uri: 'https://plus.unsplash.com/premium_photo-1752521131899-ffc4b14543ba?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      size: 'large',
      type: 'video',
    },
    {
      id: '2', 
      uri: 'https://images.unsplash.com/photo-1754555009599-9f0d848748e7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      size: 'small',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1754766621748-2a96cbf56a1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      size: 'small',
      type: 'video',
    },
    {
      id: '4',
      uri: 'https://images.unsplash.com/photo-1754829953816-6e506536e7cb?q=80&w=1239&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      size: 'small',
    },
    {
      id: '5',
      uri: 'https://images.unsplash.com/photo-1754079132962-2f6c62f14d33?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    const gap = 2;
    const baseSize = (width - gap * 2) / 3; // Account for gaps between 3 columns
    
    switch (size) {
      case 'large':
        return {
          width: baseSize * 2 + gap,
          height: baseSize * 2 + gap,
        };
      case 'rectangle':
        return {
          width: baseSize * 2 + gap,
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
    const gap = 2;
    const gridWidth = 3; // 3 columns
    const rows = [];
    let currentRowItems = [];
    let currentRowSpan = 0;

    exploreImages.forEach((image, index) => {
      const itemSpan = (image.size === 'large' || image.size === 'rectangle') ? 2 : 1;
      
      // If adding this item would exceed the row width, start a new row
      if (currentRowSpan + itemSpan > gridWidth) {
        // Fill remaining space with small items if needed
        while (currentRowSpan < gridWidth) {
          const remainingImages = exploreImages.filter(img => 
            !currentRowItems.some(rowItem => rowItem.id === img.id) &&
            img.size === 'small'
          );
          
          if (remainingImages.length > 0) {
            currentRowItems.push(remainingImages[0]);
            currentRowSpan += 1;
          } else {
            break;
          }
        }
        
        if (currentRowItems.length > 0) {
          rows.push([...currentRowItems]);
        }
        currentRowItems = [];
        currentRowSpan = 0;
      }
      
      currentRowItems.push(image);
      currentRowSpan += itemSpan;
      
      // If row is exactly filled, complete it
      if (currentRowSpan === gridWidth) {
        rows.push([...currentRowItems]);
        currentRowItems = [];
        currentRowSpan = 0;
      }
    });
    
    // Handle remaining items
    if (currentRowItems.length > 0) {
      // Fill remaining space with small items if available
      const remainingImages = exploreImages.filter(img => 
        img.size === 'small' && 
        !currentRowItems.some(rowItem => rowItem.id === img.id)
      );
      
      while (currentRowSpan < gridWidth && remainingImages.length > 0) {
        const nextImage = remainingImages.shift();
        currentRowItems.push(nextImage);
        currentRowSpan += 1;
      }
      
      rows.push(currentRowItems);
    }

    return rows.map((row, rowIndex) => {
      let currentPosition = 0;
      
      return (
        <View key={rowIndex} style={styles.gridRow}>
          {row.map((image, imageIndex) => {
            const style = getImageStyle(image.size);
            const leftPosition = currentPosition;
            
            // Update position for next item
            currentPosition += image.size === 'large' || image.size === 'rectangle' ? 2 : 1;
            
            return (
              <TouchableOpacity 
                key={`${image.id}-${rowIndex}-${imageIndex}`}
                style={[
                  styles.imageContainer, 
                  style,
                  imageIndex > 0 && styles.imageMargin
                ]}
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
            );
          })}
        </View>
      );
    });
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
  imageMargin: {
    marginLeft: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  multipleIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});