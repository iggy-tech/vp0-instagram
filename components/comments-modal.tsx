import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Text } from '@/components/text';


interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
  comments?: {
    id: string;
    username: string;
    avatar: string;
    text: string;
    likes: number;
    timestamp: string;
    replies: number;
  }[];
}


export default function CommentsModal({ visible, onClose, postId, comments }: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Define snap points - smaller range to keep it at bottom
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  const mockComments = [
    {
      id: '1',
      username: 'seanswerty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      text: 'Advice from the second guy went in one ear and out the other',
      likes: 86700,
      timestamp: '5w',
      replies: 81
    },
    {
      id: '2',
      username: 'jaydengreig',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      text: 'Bro you gotta work on your attitude and pitch\'s lmao... second dude was being chill and routing for you and you ignored it and kept pushing... 🤦‍♂️',
      likes: 23800,
      timestamp: '5w',
      replies: 31
    },
    {
      id: '3',
      username: 'dj.chad.bungus',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      text: 'If a sign says No soliciting, you prob shouldn\'t solicit',
      likes: 6880,
      timestamp: '5w',
      replies: 58
    },
    {
      id: '4',
      username: 'bloop_1011',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face',
      text: 'when they say no... just leave',
      likes: 1200,
      timestamp: '5w',
      replies: 12
    }
  ];

  // Handle opening/closing the bottom sheet modal
  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const handleCommentChange = (text:any) => {
    setNewComment(text);
    // Expand when typing
    if (text.length > 0) {
      bottomSheetModalRef.current?.snapToIndex(1); // Snap to 90%
    } else {
      bottomSheetModalRef.current?.snapToIndex(0); // Snap back to 60%
    }
  };

  const sendComment = () => {
    if (newComment.trim()) {
      console.log('Sending comment:', newComment);
      setNewComment('');
      bottomSheetModalRef.current?.snapToIndex(0); // Collapse after sending to 60%
    }
  };

  const formatLikes = (count:any) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleSheetChanges = (index:any) => {
    if (index === -1) {
      // Bottom sheet is dismissed
      onClose();
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Comments</Text>
        </View>

        {/* Comments List - Takes remaining space */}
        <View style={styles.commentsContainer}>
          <ScrollView 
            style={styles.commentsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.commentsContent}
            keyboardShouldPersistTaps="handled"
          >
            {mockComments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUsername}>{comment.username}</Text>
                    <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity style={styles.commentAction}>
                      <Text style={styles.commentActionText}>Reply</Text>
                    </TouchableOpacity>
                    {comment.replies > 0 && (
                      <TouchableOpacity style={styles.commentAction}>
                        <Text style={styles.commentActionText}>
                          View {comment.replies} more replies
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View style={styles.commentLikes}>
                  <TouchableOpacity>
                    <AntDesign name="hearto" size={16} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.commentLikeCount}>
                    {formatLikes(comment.likes)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Fixed Bottom Section - Always Visible */}
        <View style={styles.bottomSection}>
          {/* Emoji Reactions */}
          <View style={styles.emojiBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['❤️', '🙌', '🔥', '👏', '😥', '😍', '😮', '😂'].map((emoji, index) => (
                <TouchableOpacity key={index} style={styles.emojiButton}>
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Comment Input */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
          >
            <View style={styles.inputContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' }} 
                style={styles.userAvatar} 
              />
              <TextInput
                style={styles.textInput}
                placeholder="Add a comment for lifeonezymede"
                placeholderTextColor="#8E8E93"
                value={newComment}
                onChangeText={handleCommentChange}
                multiline
                maxLength={2200}
              />
              <TouchableOpacity style={styles.inputButton}>
                <Feather name="smile" size={24} color="#8E8E93" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputButton}>
                <Feather name="gift" size={24} color="#8E8E93" />
              </TouchableOpacity>
              {newComment.trim().length > 0 && (
                <TouchableOpacity style={styles.sendButton} onPress={sendComment}>
                  <Feather name="arrow-up" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
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
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  commentsContent: {
    paddingBottom: 20,
  },
  commentsContainer: {
    flex: 1,
    minHeight: 0, // Important for proper flex behavior
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  commentUsername: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  commentTimestamp: {
    fontSize: 13,
    color: '#8E8E93',
  },
  commentText: {
    fontSize: 15,
    color: '#000',
    lineHeight: 20,
    marginBottom: 10,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAction: {
    marginRight: 20,
  },
  commentActionText: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  commentLikes: {
    alignItems: 'center',
    marginLeft: 12,
    minWidth: 50,
  },
  commentLikeCount: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 6,
    fontWeight: '500',
  },
  bottomSection: {
    backgroundColor: '#fff',
    flexShrink: 0, // Prevent shrinking
  },
  emojiBar: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E7',
    backgroundColor: '#fff',
  },
  emojiButton: {
    marginRight: 20,
  },
  emoji: {
    fontSize: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Account for safe area
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E7',
    backgroundColor: '#fff',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    backgroundColor: '#F8F8F8',
  },
  inputButton: {
    marginLeft: 12,
    padding: 4,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});