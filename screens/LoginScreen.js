import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

import { verifMail } from '../verifMail';

const { width } = Dimensions.get('window');

// Login Icon Component
const LoginIcon = ({ size = 60 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <SvgLinearGradient id="loginGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#87CEEB" />
        <Stop offset="100%" stopColor="white" />
      </SvgLinearGradient>
    </Defs>
    {/* User Icon */}
    <Circle cx="50" cy="35" r="12" fill="url(#loginGradient)" />
    <Path 
      d="M25 75 C25 65 37 58 50 58 C63 58 75 65 75 75 L25 75 Z" 
      fill="url(#loginGradient)" 
    />
    {/* Login Arrow */}
    <Path 
      d="M70 25 L78 32 L70 39 M60 32 L78 32" 
      stroke="white" 
      strokeWidth="2.5" 
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function LoginScreen({ navigation }) {
  const [mail, setMail] = useState('');
  const [pwd, setPwd] = useState('');
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    if (!mail || !pwd) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }

    if (!verifMail(mail)) {
      ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await fetch('https://bustest.onrender.com/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, pwd }),
      });

      const data = await response.json();

      if (data.success) {
        ToastAndroid.show(data.message || "Hello again, Welcome!", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Error: " + (data.error || "Unknown"), ToastAndroid.LONG);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Network error", ToastAndroid.LONG);
    }
  };

  return (
    <LinearGradient colors={['#001f3f', '#87CEEB']} style={styles.centerContent}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={()=> navigation.navigate('Home')}>
        <BlurView intensity={20} style={styles.backButtonBlur}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </BlurView>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.loginContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <BlurView intensity={20} style={styles.blurContainer}>
          <View style={styles.formContainer}>
            {/* Icon at the top */}
            <View style={styles.iconContainer}>
              <LoginIcon size={60} />
            </View>
            
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Email" 
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={mail} 
                onChangeText={setMail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={pwd} 
                onChangeText={setPwd} 
                secureTextEntry 
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <LinearGradient
                colors={['#87CEEB', '#ffffff']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.switchButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
    borderRadius: 22,
    overflow: 'hidden',
  },
  backButtonBlur: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginContainer: {
    width: '100%',
    maxWidth: 350,
  },
  blurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  formContainer: {
    padding: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#001f3f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
  },
  switchText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  switchButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});