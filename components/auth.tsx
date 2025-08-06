import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/contexts/auth-context';

const { width, height } = Dimensions.get('window');

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn, signUp, resetPassword, isLoading } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;
    
    if (email.length < 5) return false;
    
    const [localPart, domain] = email.split('@');
    if (localPart.length < 2 || domain.length < 4) return false;
    
    return true;
  };

  const validateForm = () => {
    if (!email || !password) return false;
    if (!validateEmail(email)) return false;
    if (password.length < 6) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fill in all fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          Alert.alert('Login Error', error.message);
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          Alert.alert('Sign Up Error', error.message);
        }
        // No success alert - user gets signed in automatically
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address first');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const { error } = await resetPassword(email);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Password reset email sent! Check your inbox.');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0095F6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Instagram Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoGradientBorder}>
                <View style={styles.logoBackground}>
                  <View style={styles.cameraIcon}>
                    <View style={styles.cameraLens} />
                    <View style={styles.cameraDot} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {!isLogin && (
              <Text style={styles.formTitle}>Create Account</Text>
            )}
            
            <TextInput
              style={styles.input}
              placeholder={isLogin ? "Username, email or mobile number" : "Email"}
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity 
              style={[
                styles.submitButton,
                validateForm() ? styles.submitButtonActive : styles.submitButtonInactive
              ]}
              onPress={handleSubmit}
              disabled={!validateForm() || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Log in' : 'Sign up'}
                </Text>
              )}
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={styles.createAccountButton}
              onPress={toggleMode}
            >
              <Text style={styles.createAccountText}>
                {isLogin ? 'Create new account' : 'Already have an account? Log in'}
              </Text>
            </TouchableOpacity>

            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>∞ Meta</Text>
            </View>

            {/* Home Indicator */}
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: height * 0.12,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.08,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoGradientBorder: {
    width: 100,
    height: 100,
    borderRadius: 22,
    padding: 3,
    backgroundColor: '#E1306C', // Instagram pink fallback
    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  },
  logoBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraLens: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#000',
  },
  cameraDot: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#000',
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  input: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    color: '#000',
  },
  submitButton: {
    width: '100%',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  submitButtonActive: {
    backgroundColor: '#0095F6',
  },
  submitButtonInactive: {
    backgroundColor: '#B3D9FF',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#385185',
    fontWeight: '500',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  createAccountButton: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    borderColor: '#0095F6',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  createAccountText: {
    fontSize: 16,
    color: '#0095F6',
    fontWeight: '600',
  },
  metaContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  metaText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
});