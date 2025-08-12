import {
  View,

  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text } from '@/components/text';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';

import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

export default function ChatScreen() {
  const router = useRouter();
  const { chatId, username } = useLocalSearchParams<{ chatId: string; username: string }>();
  const [messageInput, setMessageInput] = useState('');

  // Define chat data type
  type ChatDataType = {
    [key: string]: {
      username: string | string[];
      handle: string;
      avatar: string;
      messages: Array<{
        id: number;
        text: string;
        sender: string;
        timestamp: string;
        type: string;
      }>;
    }
  };

  // Mock chat data based on chatId
  const getChatData = (id: string) => {
    const chatData: ChatDataType = {
      'owen': {
        username: 'Owen',
        handle: 'owenk1ng',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        messages: [
          {
            id: 1,
            text: 'Of course u liked this',
            sender: 'other',
            timestamp: '2:30 PM',
            type: 'text'
          },
          {
            id: 2,
            text: 'you know how i do things',
            sender: 'me',
            timestamp: '2:31 PM',
            type: 'text'
          },
          {
            id: 3,
            text: 'You the man of men',
            sender: 'other',
            timestamp: '2:32 PM',
            type: 'text'
          },
          {
            id: 4,
            text: 'bro',
            sender: 'me',
            timestamp: '2:33 PM',
            type: 'text'
          },
          {
            id: 5,
            text: 'lets get serious',
            sender: 'me',
            timestamp: '2:33 PM',
            type: 'text'
          },
          {
            id: 6,
            text: 'no more dilly dallying',
            sender: 'me',
            timestamp: '2:33 PM',
            type: 'text'
          },
          {
            id: 7,
            text: 'Come up to my cottage',
            sender: 'other',
            timestamp: '2:34 PM',
            type: 'text'
          },
          {
            id: 8,
            text: 'Stop trolling',
            sender: 'other',
            timestamp: '2:35 PM',
            type: 'text'
          },
          {
            id: 9,
            text: 'i live under a bridge bro',
            sender: 'me',
            timestamp: '2:36 PM',
            type: 'text'
          },
          {
            id: 10,
            text: 'Deadass tho',
            sender: 'other',
            timestamp: '2:37 PM',
            type: 'text'
          },
          {
            id: 11,
            text: 'Not joking',
            sender: 'other',
            timestamp: '2:37 PM',
            type: 'text'
          },
          {
            id: 12,
            text: 'Come w almer or marko or some shit or just dolo',
            sender: 'other',
            timestamp: '2:38 PM',
            type: 'text'
          }
        ]
      },
      // Default fallback
      'default': {
        username: username || 'User',
        handle: 'username',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        messages: [
          {
            id: 1,
            text: 'Hey there!',
            sender: 'other',
            timestamp: '1:00 PM',
            type: 'text'
          },
          {
            id: 2,
            text: 'Hello! How are you?',
            sender: 'me',
            timestamp: '1:01 PM',
            type: 'text'
          }
        ]
      }
    };

    return chatData[id] || chatData['default'];
  };

  const chat = getChatData(chatId);



  const renderMessage = (message:any) => {
    const isMe = message.sender === 'me';
    
    return (
      <View key={message.id} style={[
        styles.messageContainer,
        isMe ? styles.myMessageContainer : styles.otherMessageContainer
      ]}>
        {!isMe && (
          <Image source={{ uri: chat.avatar }} style={styles.messageAvatar} />
        )}
        <View style={[
          styles.messageBubble,
          isMe ? styles.myMessageBubble : styles.otherMessageBubble
        ]}>
          <Text style={[
            styles.messageText,
            isMe ? styles.myMessageText : styles.otherMessageText
          ]}>
            {message.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Image source={{ uri: chat.avatar }} style={styles.headerAvatar} />
            <View style={styles.headerUserInfo}>
              <Text style={styles.headerUsername}>{chat.username}</Text>
              <Text style={styles.headerHandle}>{chat.handle}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="phone" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="video" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <KeyboardAvoidingView 
          style={styles.chatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}
          >
            {/* Shared Media */}
            <View style={styles.sharedMedia}>
              <View style={styles.mediaItem}>
                <View style={styles.mediaIcon}>
                  <Feather name="play" size={20} color="#fff" />
                </View>
              </View>
            </View>

            {/* Messages */}
            {chat.messages.map(renderMessage)}
            
            {/* Timestamp */}
            <Text style={styles.timestamp}>1:06 PM</Text>
          </ScrollView>

          {/* Input Bar */}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.cameraButton}>
              <Feather name="camera" size={24} color="#0095F6" />
            </TouchableOpacity>
            <View style={styles.messageInputContainer}>
              <TextInput
                style={styles.messageInput}
                placeholder="Message..."
                placeholderTextColor="#8E8E93"
                value={messageInput}
                onChangeText={setMessageInput}
                multiline
              />
            </View>
            <TouchableOpacity style={styles.inputIcon}>
              <Feather name="mic" size={20} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputIcon}>
              <Feather name="image" size={20} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputIcon}>
              <Feather name="smile" size={20} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputIcon}>
              <Feather name="plus" size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  headerUserInfo: {
    flex: 1,
  },
  headerUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerHandle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
    padding: 4,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  sharedMedia: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mediaItem: {
    width: 200,
    height: 120,
    backgroundColor: '#8B4513',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mediaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  myMessageBubble: {
    backgroundColor: '#8B5CF6',
    borderBottomRightRadius: 6,
  },
  otherMessageBubble: {
    backgroundColor: '#F2F2F7',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#000',
  },
  timestamp: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8E8E93',
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E7',
    backgroundColor: '#fff',
  },
  cameraButton: {
    marginRight: 12,
    padding: 4,
  },
  messageInputContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    minHeight: 40,
    justifyContent: 'center',
  },
  messageInput: {
    fontSize: 16,
    color: '#000',
    maxHeight: 100,
  },
  inputIcon: {
    marginLeft: 8,
    padding: 4,
  },
});