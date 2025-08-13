import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';
import { Text } from '@/components/text';
import { useRouter, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/contexts/auth-context'; // Use your auth context instead of direct supabase

export default function SettingsScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const { signOut } = useAuth(); // Use the auth context

  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await signOut();
              if (error) {
                Alert.alert("Error", "Failed to log out. Please try again.");
                console.error("Logout error:", error);
              }
              // Don't manually navigate - the auth context will handle this automatically
              // When user is set to null, the AppContent will show AuthScreen
            } catch (error) {
              Alert.alert("Error", "An unexpected error occurred.");
              console.error("Logout error:", error);
            }
          }
        }
      ]
    );
  };

  const handleAddAccount = () => {
    Alert.alert("Add Account", "This feature is coming soon!");
  };

  const handleLoginInfo = () => {
    Alert.alert("Login Info", "This feature is coming soon!");
  };

  const SettingsItem = ({ 
    icon, 
    title, 
    subtitle, 
    rightText, 
    rightIcon = "chevron-right",
    onPress,
    showBadge = false 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    rightText?: string;
    rightIcon?: string;
    onPress?: () => void;
    showBadge?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Feather name={icon as any} size={24} color="#000" style={styles.settingsIcon} />
        <View style={styles.settingsTextContainer}>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingsItemRight}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        {showBadge && <View style={styles.badge} />}
        <Feather name={rightIcon as any} size={16} color="#8E8E93" />
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const MetaLogo = () => (
    <View style={styles.metaLogo}>
      <Text style={styles.metaText}>Meta</Text>
    </View>
  );

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
          <Text style={styles.headerTitle}>Settings and activity</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Feather name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#8E8E93"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>

          {/* Your Account Section */}
          <View style={styles.yourAccountSection}>
            <View style={styles.accountHeader}>
              <Text style={styles.yourAccountTitle}>Your account</Text>
              <MetaLogo />
            </View>
            
            <SettingsItem
              icon="user"
              title="Accounts Center"
              subtitle="Password, security, personal details, ad preferences"
              onPress={() => Alert.alert("Accounts Center", "This feature is coming soon!")}
            />
            
            <Text style={styles.accountDescription}>
              Manage your connected experiences and account settings across Meta technologies.{' '}
              <Text style={styles.learnMoreLink}>Learn more</Text>
            </Text>
          </View>

          {/* How you use Instagram */}
          <SectionHeader title="How you use Instagram" />
          
          <SettingsItem
            icon="bookmark"
            title="Saved"
            onPress={() => Alert.alert("Saved", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="archive"
            title="Archive"
            onPress={() => Alert.alert("Archive", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="activity"
            title="Your activity"
            onPress={() => Alert.alert("Your activity", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="bell"
            title="Notifications"
            onPress={() => router.push('/notifications')}
          />
          
          <SettingsItem
            icon="clock"
            title="Time management"
            onPress={() => Alert.alert("Time management", "This feature is coming soon!")}
          />

          {/* Who can see your content */}
          <SectionHeader title="Who can see your content" />
          
          <SettingsItem
            icon="lock"
            title="Account privacy"
            rightText="Public"
            onPress={() => Alert.alert("Account privacy", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="star"
            title="Close Friends"
            rightText="0"
            onPress={() => Alert.alert("Close Friends", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="copy"
            title="Crossposting"
            onPress={() => Alert.alert("Crossposting", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="slash"
            title="Blocked"
            rightText="15"
            onPress={() => Alert.alert("Blocked", "This feature is coming soon!")}
          />

          {/* Meta Verified */}
          <SettingsItem
            icon="check-circle"
            title="Meta Verified"
            rightText="Not subscribed"
            onPress={() => Alert.alert("Meta Verified", "This feature is coming soon!")}
          />

          {/* Your orders and fundraisers */}
          <SectionHeader title="Your orders and fundraisers" />
          
          <SettingsItem
            icon="heart"
            title="Fundraisers"
            onPress={() => Alert.alert("Fundraisers", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="credit-card"
            title="Orders and payments"
            onPress={() => Alert.alert("Orders and payments", "This feature is coming soon!")}
          />

          {/* More info and support */}
          <SectionHeader title="More info and support" />
          
          <SettingsItem
            icon="help-circle"
            title="Help"
            onPress={() => Alert.alert("Help", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="shield"
            title="Privacy Center"
            onPress={() => Alert.alert("Privacy Center", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="user-check"
            title="Account Status"
            onPress={() => Alert.alert("Account Status", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="info"
            title="About"
            onPress={() => Alert.alert("About", "This feature is coming soon!")}
          />

          {/* Also from Meta */}
          <SectionHeader title="Also from Meta" />
          
          <SettingsItem
            icon="message-circle"
            title="WhatsApp"
            subtitle="Message privately with friends and family"
            onPress={() => Alert.alert("WhatsApp", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="video"
            title="Edits"
            subtitle="Create videos with powerful editing tools"
            showBadge={true}
            onPress={() => Alert.alert("Edits", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="at-sign"
            title="Threads"
            subtitle="Share ideas and join conversations"
            onPress={() => Alert.alert("Threads", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="facebook"
            title="Facebook"
            subtitle="Explore things you love"
            onPress={() => Alert.alert("Facebook", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="send"
            title="Messenger"
            subtitle="Chat and share seamlessly with friends"
            onPress={() => Alert.alert("Messenger", "This feature is coming soon!")}
          />
          
          <SettingsItem
            icon="circle"
            title="Meta AI"
            subtitle="Get answers, advice and generate images"
            showBadge={true}
            onPress={() => Alert.alert("Meta AI", "This feature is coming soon!")}
          />
          
  
          {/* Login Section */}
          <SectionHeader title="Login" />
          
          <SettingsItem
            icon="log-in"
            title="Login info"
            onPress={handleLoginInfo}
          />
          
          <TouchableOpacity style={styles.addAccountButton} onPress={handleAddAccount}>
            <Text style={styles.addAccountText}>Add account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
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
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  yourAccountSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yourAccountTitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  metaLogo: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0095F6',
  },
  accountDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginTop: 12,
  },
  learnMoreLink: {
    color: '#0095F6',
  },
  sectionHeader: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    marginRight: 16,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
    lineHeight: 18,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 8,
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0095F6',
    marginRight: 8,
  },
  addAccountButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
  },
  addAccountText: {
    fontSize: 16,
    color: '#0095F6',
    fontWeight: '500',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 50,
  },
});