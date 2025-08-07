import React from 'react';
import { 
  View, 
 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from '@/components/text';



const SuggestedUsers = ({ users }) => {
  return (
    <View style={styles.suggestedSection}>
      <View style={styles.suggestedHeader}>
        <Text style={styles.suggestedTitle}>Suggested for you</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.suggestedContainer}
      >
        {users.map((user) => (
          <View key={user.id} style={styles.suggestedUser}>
            <TouchableOpacity style={styles.dismissButton}>
              <Text style={styles.dismissIcon}>✕</Text>
            </TouchableOpacity>
            
            <View style={styles.suggestedAvatar}>
              {user.isCompany ? (
                <View style={styles.companyAvatar}>
                  <Text style={styles.companyText}>SGAG</Text>
                </View>
              ) : (
                <Image 
                  source={{ uri: user.image }} 
                  style={styles.suggestedAvatarImage}
                  onError={() => console.log('Suggested user image failed to load')}
                />
              )}
            </View>
            
            <View style={styles.suggestedInfo}>
              <View style={styles.usernameRow}>
                <Text style={styles.suggestedUsername}>{user.username}</Text>
                {user.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedCheck}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.suggestedCategory}>{user.category}</Text>
            </View>
            
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestedSection: {
    paddingVertical: 16,
  },
  suggestedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  suggestedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0095F6',
    fontWeight: '600',
  },
  suggestedContainer: {
    paddingLeft: 16,
  },
  suggestedUser: {
    width: 180,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    position: 'relative',
  },
  dismissButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissIcon: {
    fontSize: 14,
    color: '#8E8E93',
  },
  suggestedAvatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  suggestedAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 42.5,
  },
  companyAvatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestedInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestedUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0095F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  verifiedCheck: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  suggestedCategory: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#0095F6',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SuggestedUsers;