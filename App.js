import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Rect, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import DashScreen from './screens/DashScreen';

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

// Location Tracker Bus Icon Component
const LocationTrackerBusIcon = ({ size = 120 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <SvgLinearGradient id="busGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#87CEEB" />
        <Stop offset="100%" stopColor="white" />
      </SvgLinearGradient>
    </Defs>
    {/* Bus Body */}
    <Rect x="15" y="35" width="70" height="40" rx="8" fill="url(#busGradient)" />
    {/* Bus Windows */}
    <Rect x="20" y="40" width="60" height="20" rx="3" fill="rgba(0,31,63,0.6)" />
    <Rect x="22" y="42" width="16" height="6" rx="1" fill="white" opacity="0.8" />
    <Rect x="42" y="42" width="16" height="6" rx="1" fill="white" opacity="0.8" />
    <Rect x="62" y="42" width="16" height="6" rx="1" fill="white" opacity="0.8" />
    {/* Bus Wheels */}
    <Circle cx="28" cy="70" r="5" fill="rgba(0,31,63,0.8)" />
    <Circle cx="72" cy="70" r="5" fill="rgba(0,31,63,0.8)" />
    <Circle cx="28" cy="70" r="2" fill="white" opacity="0.6" />
    <Circle cx="72" cy="70" r="2" fill="white" opacity="0.6" />
    {/* Location Pin */}
    <Path 
      d="M50 10 C45 10 40 15 40 20 C40 28 50 35 50 35 C50 35 60 28 60 20 C60 15 55 10 50 10 Z" 
      fill="white" 
      opacity="0.95"
    />
    <Circle cx="50" cy="20" r="4" fill="rgba(0,31,63,0.8)" />
    {/* Bus front lights */}
    <Rect x="10" y="42" width="6" height="3" rx="1.5" fill="white" opacity="0.7" />
    <Rect x="84" y="42" width="6" height="3" rx="1.5" fill="white" opacity="0.7" />
  </Svg>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Dash" component={DashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const imageAnim = new Animated.Value(0);
  const buttonSlideAnim = new Animated.Value(100);

  useEffect(() => {
    Animated.sequence([
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
      ]),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonSlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={['#001f3f', '#87CEEB']} style={styles.container}>
      <View style={styles.centerContent}>
        {/* Image Container with Glassmorphism */}
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: imageAnim,
              transform: [{ 
                scale: imageAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                })
              }]
            }
          ]}
        >
          <BlurView intensity={15} style={styles.imageBlurContainer}>
            <LocationTrackerBusIcon size={120} />
          </BlurView>
        </Animated.View>

        {/* Main Content Container */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <BlurView intensity={20} style={styles.blurContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to BusTracker</Text>
              <Text style={styles.subtitle}>Your journey starts here</Text>
              <View style={styles.decorativeLine} />
            </View>
          </BlurView>
        </Animated.View>

        {/* Buttons Container */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ translateY: buttonSlideAnim }]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#87CEEB', '#ffffff']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.8}
          >
            <BlurView intensity={30} style={styles.secondaryButtonBlur}>
              <Text style={styles.secondaryButtonText}>Sign Up</Text>
            </BlurView>
          </TouchableOpacity>
        </Animated.View>

        {/* Floating Elements for Visual Appeal */}
        <View style={styles.floatingElement1} />
        <View style={styles.floatingElement2} />
        <View style={styles.floatingElement3} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 40,
    borderRadius: 25,
    overflow: 'hidden',
  },
  imageBlurContainer: {
    borderRadius: 25,
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 40,
  },
  blurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textContainer: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  decorativeLine: {
    width: 60,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 16,
  },
  button: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonBlur: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingElement1: {
    position: 'absolute',
    top: 100,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  floatingElement2: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  floatingElement3: {
    position: 'absolute',
    top: 200,
    left: 40,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
});