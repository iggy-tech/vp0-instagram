import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Text } from '@/components/text';

const { width } = Dimensions.get('window');

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
}

export default function ShareModal({ visible, onClose, postId }: ShareModalProps) {
  const [searchText, setSearchText] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Define snap points
  const snapPoints = useMemo(() => ['85%'], []);

  // Mock users data for sharing
  const recentUsers = [
    {
      id: '1',
      username: 'Reply to alex_johnson',
      name: 'alex_johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSpecial: true,
    },
    {
      id: '2',
      username: 'Sarah Williams and Team',
      name: 'Group Chat',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isGroup: true,
    },
    {
      id: '3',
      username: 'Project Team',
      name: 'Project Team',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '4',
      username: 'Emily Chen',
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '5',
      username: 'Michael Davis',
      name: 'Michael Davis',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '6',
      username: 'Jessica Brown',
      name: 'Jessica Brown',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '7',
      username: 'Work Team, David Smith',
      name: 'Group Chat',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      isGroup: true,
    },
    {
      id: '8',
      username: 'Lisa Wilson',
      name: 'Lisa Wilson',
      avatar: 'https://plus.unsplash.com/premium_photo-1730078556475-d5c8bbcf9838?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '9',
      username: 'Sam Taylor',
      name: 'Sam Taylor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '10',
      username: 'Mark Martinez',
      name: 'Mark Martinez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '11',
      username: 'Team Workspace',
      name: 'Team Workspace',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '12',
      username: 'Chris Johnson',
      name: 'Chris Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const shareOptions = [
    {
      id: 'story',
      icon: 'plus-circle',
      label: 'Add to story',
      color: '#000',
    },
    {
      id: 'link',
      icon: 'link',
      label: 'Copy link',
      color: '#000',
    },
    {
      id: 'whatsapp',
      icon: 'message-circle',
      label: 'WhatsApp',
      color: '#25D366',
      isGreen: true,
    },
    {
      id: 'messages',
      icon: 'message-circle',
      label: 'Messages',
      color: '#25D366',
      isGreen: true,
    },
    {
      id: 'share',
      icon: 'upload',
      label: 'Share to...',
      color: '#000',
    },
  ];

  // Handle opening/closing the bottom sheet modal
  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const handleSheetChanges = (index: any) => {
    if (index === -1) {
      onClose();
    }
  };

  const filteredUsers = recentUsers.filter(user =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={16} color="#8E8E93" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#8E8E93"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity style={styles.peopleButton}>
            <Feather name="users" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* Users Grid */}
        <View style={styles.usersContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.usersGrid}>
              {filteredUsers.map((user, index) => (
                <TouchableOpacity key={user.id} style={styles.userItem}>
                  <View style={styles.userAvatarContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                    {user.isSpecial && (
                      <View style={styles.specialBadge}>
                        <Text style={styles.specialBadgeText}>+</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.userName} numberOfLines={2}>
                    {user.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Share Options */}
        <View style={styles.shareOptionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shareOptionsContent}>
            {shareOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.shareOption}>
                <View style={[
                  styles.shareOptionIcon,
                  option.isGreen && styles.greenIcon
                ]}>
                  <Feather name={option.icon as any} size={24} color={option.isGreen ? '#fff' : option.color} />
                </View>
                <Text style={styles.shareOptionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },
  handleIndicator: {
    backgroundColor: '#C7C7CC',
    width: 40,
    height: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  peopleButton: {
    marginLeft: 12,
    padding: 8,
  },
  usersContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  usersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  userItem: {
    width: (width - 48) / 3, // 3 columns with padding
    alignItems: 'center',
    marginBottom: 24,
  },
  userAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  specialBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0095F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  specialBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    lineHeight: 16,
  },
  shareOptionsContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E7',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  shareOptionsContent: {
    paddingHorizontal: 16,
  },
  shareOption: {
    alignItems: 'center',
    marginRight: 32,
  },
  shareOptionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    marginBottom: 8,
  },
  greenIcon: {
    backgroundColor: '#25D366',
  },
  shareOptionLabel: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});