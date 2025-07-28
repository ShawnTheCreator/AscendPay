import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const pulseAnim = new Animated.Value(1);
  const bounceAnim = new Animated.Value(0);

  React.useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    bounceAnimation.start();

    return () => {
      pulseAnimation.stop();
      bounceAnimation.stop();
    };
  }, []);

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Logo/Brand */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🏦</Text>
        </View>
      </View>

      {/* Animation */}
      <View style={styles.animationContainer}>
        <View style={styles.animationWrapper}>
          <Animated.View 
            style={[
              styles.mainCircle,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <Text style={styles.mainEmoji}>📱</Text>
          </Animated.View>
          <Animated.View 
            style={[
              styles.bounceCircle,
              { transform: [{ translateY: bounceAnim }] }
            ]}
          >
            <Text style={styles.bounceEmoji}>🤝</Text>
          </Animated.View>
        </View>
      </View>

      {/* Main Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.mainHeading}>
          Banking freedom{'\n'}starts here
        </Text>
        <Text style={styles.welcomeText}>Sawubona. Welcome.</Text>
        <Text style={styles.subText}>
          Experience banking that understands you
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          activeOpacity={0.9}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.9}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Regulated by the South African Reserve Bank
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  animationContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCircle: {
    width: 96,
    height: 96,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainEmoji: {
    fontSize: 48,
  },
  bounceCircle: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 64,
    height: 64,
    backgroundColor: 'rgba(20, 184, 166, 0.2)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bounceEmoji: {
    fontSize: 32,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#14B8A6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#14B8A6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
});