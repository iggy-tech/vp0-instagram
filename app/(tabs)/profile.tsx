import { Text } from "@/components/text";
import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from 'expo-router'; // Add this import

const { width } = Dimensions.get("window");
const itemWidth = (width - 2) / 3; // 3 columns with 1px gaps

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState("posts");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter(); // Add this line

  // Updated profile data to match the image
  const profileData = {
    username: "john_smit3",
    displayName: "",
    bio: "",
    website: "",
    followers: 206,
    following: 42,
    posts: 6,
    avatar: "", // We'll use the gradient bubble instead
    storyText: "What's on\nyour mind?",
    isLive: true, // Red dot indicator
    dashboardViews: "3.5K views in the last 30 days",
  };

  // Real posts data with sports/social content to match the images
  const posts = [
    {
      id: 1,
      type: "image",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      type: "image",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      type: "image",
      image:
        "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      type: "image",
      image:
        "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      type: "image",
      image:
        "https://images.unsplash.com/photo-1526232761682-d26e85d9aacf?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      type: "image",
      image:
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop",
    },
  ];
  const tabs = [
    { id: "posts", icon: "grid" as const, name: "Posts" },
    { id: "reels", icon: "play" as const, name: "Reels" },
    { id: "tagged", icon: "user" as const, name: "Tagged" },
  ];

  const handleTabPress = (tabId:any) => {
    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const toValue = tabIndex * (width / 3);

    Animated.timing(slideAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setSelectedTab(tabId);
  };

  // Add navigation function for settings
  const navigateToSettings = () => {
    router.push('/settings');
  };

  const renderPostsTab = () => (
    <View style={styles.postsGrid}>
      {posts.map((post) => (
        <TouchableOpacity key={post.id} style={styles.postItem}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          {post.type === "video" && (
            <View style={styles.videoIndicator}>
              <Feather name="play" size={16} color="white" />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderReelsTab = () => (
    <View style={styles.reelsContainer}>
      <TouchableOpacity style={styles.reelItem}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
          }}
          style={styles.reelImage}
        />
        <View style={styles.reelPlayButton}>
          <Feather name="play" size={20} color="white" />
        </View>
        <View style={styles.reelStats}>
          <Feather name="play" size={12} color="white" />
          <Text style={styles.reelStatText}>0</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderTaggedTab = () => (
    <View style={styles.taggedContainer}>
      <View style={styles.taggedIcon}>
        <Feather name="camera" size={48} color="#8E8E93" />
      </View>
      <Text style={styles.taggedTitle}>Photos and videos of you</Text>
      <Text style={styles.taggedSubtitle}>
        When people tag you in photos and videos,{"\n"}they&apos;ll appear here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.usernameContainer}>
            <Text style={styles.username}>{profileData.username}</Text>
            <Feather
              name="chevron-down"
              size={16}
              color="#000"
              style={styles.chevronIcon}
            />
          
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="at-sign" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="plus-square" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={navigateToSettings}>
            <Feather name="menu" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            {/* Profile Picture with Speech Bubble */}
            <View style={styles.profilePictureContainer}>
              {/* Speech Bubble */}
              <View style={styles.speechBubbleContainer}>
                <View style={styles.speechBubble}>
                  <Text style={styles.bubbleText}>{profileData.storyText}</Text>
                </View>
                <View style={styles.bubbleTail} />
              </View>

              {/* Blue Circle with Grey Ring */}
              <View style={styles.bubbleContainer}>
                <View style={styles.greyRing}>
                  <View style={styles.gradientBubble}></View>
                </View>
                {/* Plus Button */}
                <TouchableOpacity style={styles.addStoryButton}>
                  <View style={styles.plusButtonInner}>
                    <Feather name="plus" size={12} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <TouchableOpacity style={styles.statItemContainer}>
                <Text style={styles.statNumber}>{profileData.posts}</Text>
                <Text style={styles.statLabel}>posts</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.statItemContainer}>
                <Text style={styles.statNumber}>{profileData.followers}</Text>
                <Text style={styles.statLabel}>followers</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.statItemContainer}>
                <Text style={styles.statNumber}>{profileData.following}</Text>
                <Text style={styles.statLabel}>following</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashboard Section */}
          <TouchableOpacity style={styles.dashboardSection}>
            <Text style={styles.dashboardTitle}>Dashboard</Text>
            <View style={styles.dashboardStats}>
              <Feather name="trending-up" size={14} color="#00C853" />
              <Text style={styles.dashboardText}>
                {profileData.dashboardViews}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactButton}>
              <Feather name="user-plus" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs with Animation */}
        <View style={styles.tabsContainer}>
          <Animated.View
            style={[
              styles.tabIndicator,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          />
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => handleTabPress(tab.id)}
            >
              <Feather
                name={tab.icon}
                size={18}
                color={selectedTab === tab.id ? "#000" : "#8E8E93"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {selectedTab === "posts" && renderPostsTab()}
        {selectedTab === "reels" && renderReelsTab()}
        {selectedTab === "tagged" && renderTaggedTab()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerButton: {
    marginLeft: 16,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginRight: 4,
  },
  chevronIcon: {
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginRight: 24,
    position: "relative",
  },
  bubbleContainer: {
    position: "relative",
    zIndex: 10,
  },
  greyRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E5E5E7",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  gradientBubble: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  innerBubble: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#6BA3F0",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleText: {
    color: "#808080",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 14,
  },
  addStoryButton: {
    position: "absolute",
    bottom: -2,
    right: -2,
    zIndex: 20,
    backgroundColor: "white",
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    elevation: 3,
  },
  plusButtonInner: {
    backgroundColor: "#000",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
  },
  statItemContainer: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  statLabel: {
    fontSize: 13,
    color: "#000",
    marginTop: 2,
  },
  dashboardSection: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dashboardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  dashboardStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  dashboardText: {
    fontSize: 14,
    color: "#8E8E93",
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  contactButton: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#E5E5E7",
    position: "relative",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 1,
    backgroundColor: "#000",
    width: width / 3,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  postItem: {
    width: itemWidth,
    height: itemWidth,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  videoIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  postStats: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
    gap: 8,
  },
  statText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  reelsContainer: {
    padding: 1,
  },
  reelItem: {
    width: itemWidth,
    height: itemWidth * 1.5,
    position: "relative",
  },
  reelImage: {
    width: "100%",
    height: "100%",
  },
  reelPlayButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  reelStats: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reelStatText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  taggedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  taggedIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: "#8E8E93",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  taggedTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
  },
  taggedSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
  },
  speechBubbleContainer: {
    position: "absolute",
    top: -15,
    left: -8,
    zIndex: 100,
  },
  speechBubble: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    maxWidth: 120,
    borderWidth: 1,
    borderColor: "#E5E5E7",
  },
  bubbleTail: {
    position: "absolute",
    bottom: -10,
    left: 20,
    width: 20,
    height: 20,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }],
    borderTopLeftRadius: 10,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 5,
  },
});