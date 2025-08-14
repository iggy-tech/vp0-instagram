import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  Animated 
} from 'react-native';
import { Text } from '@/components/text';
import { Feather } from '@expo/vector-icons';




export default function SearchResultsScreen({ onBack }: { onBack: () => void }) {
  const [searchText, setSearchText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const allUsers = [
    {
      id: '1',
      username: 'sarah_johnson',
      displayName: 'Sarah Johnson',
      subtitle: 'Followed by mike_davis',
      avatar: 'https://images.unsplash.com/photo-1753701718038-93e51d416a4f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      verified: false,
    },
    {
      id: '2',
      username: 'alex_chen',
      displayName: 'Alex Chen',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: false,
      hasStory: true,
    },
    {
      id: '3',
      username: 'emma_watson',
      displayName: 'Emma Watson',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      verified: true,
    },
    {
      id: '4',
      username: 'jordan_smith',
      displayName: 'Jordan Smith',
      subtitle: 'Followed by jessica_brown + 2 more',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      verified: false,
      hasStory: true,
    },
    {
      id: '5',
      username: 'mason_lee',
      displayName: 'Mason Lee',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    {
      id: '6',
      username: 'olivia_martinez',
      displayName: 'Olivia Martinez',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    {
      id: '7',
      username: 'noah_williams',
      displayName: 'Noah Williams',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      verified: false,
      hasStory: true,
    },
    {
      id: '8',
      username: 'creative_studios',
      displayName: 'Creative Studios',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    {
      id: '9',
      username: 'sophia_garcia',
      displayName: 'Sophia Garcia',
      subtitle: 'Followed by ryan_cooper',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face',
      verified: false,
      hasStory: true,
    },
    {
      id: '10',
      username: 'ethan_rodriguez',
      displayName: 'Ethan Rodriguez',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    {
      id: '11',
      username: 'maya_patel',
      displayName: 'Maya Patel',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    {
      id: '12',
      username: 'local_events',
      displayName: 'Local Events',
      subtitle: 'Followed by david_kim + 8 more',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    // Add more users for better filtering demo
    {
      id: '13',
      username: 'fitness_motivation',
      displayName: 'Fitness Motivation',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    {
      id: '14',
      username: 'food_blogger',
      displayName: 'Food Blogger',
      subtitle: 'Followed by chef_mike + 12 more',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
    {
      id: '15',
      username: 'travel_adventures',
      displayName: 'Travel Adventures',
      subtitle: '',
      avatar: 'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=100&h=100&fit=crop&crop=face',
      verified: false,
    },
  ];

  // Filter users based on search text
  const filteredUsers = searchText.trim() === '' 
    ? allUsers.slice(0, 12) // Show first 12 as "Recent" when no search
    : allUsers.filter(user => 
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchText.toLowerCase())
      );

  const sectionTitle = searchText.trim() === '' ? 'Recent' : 'Results';

  const renderUserItem = (user:any) => (
    <TouchableOpacity key={user.id} style={styles.userItem}>
      <View style={styles.userLeft}>
        <View style={[styles.avatarContainer, user.hasStory && styles.storyBorder]}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.usernameRow}>
            <Text style={styles.username}>{user.username}</Text>
            {user.verified && (
              <Feather name="check-circle" size={14} color="#0095F6" style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.displayName}>{user.displayName}</Text>
          {user.subtitle && (
            <Text style={styles.subtitle}>{user.subtitle}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Feather name="x" size={16} color="#8E8E93" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Search Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search with Meta AI"
              placeholderTextColor="#8E8E93"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus={true}
            />
          </View>
        </View>

        {/* Recent/Results Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          {searchText.trim() === '' && (
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Users List */}
        <ScrollView 
          style={styles.usersList}
          showsVerticalScrollIndicator={false}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map(renderUserItem)
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
              <Text style={styles.noResultsSubtext}>Try searching for something else</Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  seeAllButton: {
    fontSize: 16,
    color: '#0095F6',
    fontWeight: '600',
  },
  usersList: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  storyBorder: {
    padding: 2,
    borderRadius: 25,
   
    borderWidth: 2,
    borderColor: '#E1306C',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  userInfo: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  displayName: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});