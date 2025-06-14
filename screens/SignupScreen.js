import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { verifPwd } from '../verifPwd';
import { verifMail } from '../verifMail';

const { width } = Dimensions.get('window');

export default function SignUpScreen({ navigation }) {
  const [mail, setMail] = useState('');
  const [pwd, setPwd] = useState('');
  const [fname, setName] = useState('');
  const [lastn, setLastn] = useState('');
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

  const handleSignUp = async () => {
    if (!mail || !pwd || !fname || !lastn) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }

    if (!verifMail(mail)) {
      ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
      return;
    }

    if (!verifPwd(pwd)) {
      ToastAndroid.show("Weak password , it needs at least 8 characters , an uppercase , a digit , and a symbol", ToastAndroid.SHORT);
      return;
    }
    
    if (!/^[a-zA-Z]+$/.test(fname)) {
      ToastAndroid.show("Enter a valid name", ToastAndroid.SHORT);
      return;
    }
    
    if (!/^[a-zA-Z]+$/.test(lastn)) {
      ToastAndroid.show("Enter a valid last name", ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await fetch('https://bustest.onrender.com/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname, lastn, mail, pwd }),
      });

      const data = await response.json();

      if (data.success) {
        ToastAndroid.show("Welcome!", ToastAndroid.SHORT);
        // Optional: Navigate back to login or to main app
        // navigation.goBack();
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
          styles.signupContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <BlurView intensity={20} style={styles.blurContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="First Name" 
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={fname} 
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Last Name" 
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={lastn} 
                onChangeText={setLastn}
                autoCapitalize="words"
              />
            </View>

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

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <LinearGradient
                colors={['#87CEEB', '#ffffff']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchButton}>Log in</Text>
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
  signupContainer: {
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