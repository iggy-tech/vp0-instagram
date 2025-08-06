import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function CommentsModal({ visible, onClose, postId, comments }) {
  const [newComment, setNewComment] = useState('');

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

  const formatLikes = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={true}
      onRequestClose={onClose}


    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1}
          onPress={onClose}
        />
        
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.handleBar} />
            <Text style={styles.headerTitle}>Comments</Text>
          </View>

          {/* Comments List */}
          <ScrollView 
            style={styles.commentsList}
            showsVerticalScrollIndicator={false}
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

          {/* Comment Input - Sticky Bottom */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inputContainer}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' }} 
              style={styles.userAvatar} 
            />
            <TextInput
              style={styles.textInput}
              placeholder="Add a comment for lifeonezymede"
              placeholderTextColor="#8E8E93"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity style={styles.inputButton}>
              <Feather name="smile" size={24} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputButton}>
              <Feather name="gift" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    height: height * 0.8, // 60% of screen height
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#C7C7CC',
    borderRadius: 2,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
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
});