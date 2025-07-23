import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Icon components (you can replace with react-native-vector-icons or similar)
const ArrowLeftIcon = () => <Text style={styles.iconText}>←</Text>;
const CameraIcon = () => <Text style={styles.iconText}>📷</Text>;
const FileTextIcon = () => <Text style={styles.iconText}>📄</Text>;

// Progress Bar Component
const ProgressBar = ({ progress }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressFill, { width: `${progress}%` }]} />
  </View>
);

export default function Signup() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <View style={styles.stepContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.stepTitle}>Personal Details</Text>
            <Text style={styles.stepSubtitle}>Let's get to know you better</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                placeholderTextColor="#9CA3AF"
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="#9CA3AF"
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+27 XX XXX XXXX"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
            </View>
          </View>
        </View>
      );
    }

    if (step === 2) {
      return (
        <View style={styles.stepContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.stepTitle}>Identity Verification</Text>
            <Text style={styles.stepSubtitle}>
              Secure your account with biometric verification
            </Text>
          </View>

          <View style={styles.verificationContainer}>
            <View style={styles.verificationCard}>
              <View style={styles.verificationRow}>
                <View style={[styles.iconContainer, styles.tealIconBg]}>
                  <CameraIcon />
                </View>
                <View style={styles.verificationContent}>
                  <Text style={styles.verificationTitle}>Live Selfie</Text>
                  <Text style={styles.verificationSubtitle}>
                    Take a quick selfie for verification
                  </Text>
                </View>
                <TouchableOpacity style={[styles.actionButton, styles.tealButton]}>
                  <Text style={styles.actionButtonText}>Capture</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.verificationCard}>
              <View style={styles.verificationRow}>
                <View style={[styles.iconContainer, styles.primaryIconBg]}>
                  <FileTextIcon />
                </View>
                <View style={styles.verificationContent}>
                  <Text style={styles.verificationTitle}>ID Document</Text>
                  <Text style={styles.verificationSubtitle}>
                    Scan your South African ID
                  </Text>
                </View>
                <TouchableOpacity style={[styles.actionButton, styles.outlineButton]}>
                  <Text style={styles.outlineButtonText}>Scan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.tipContainer}>
            <View style={styles.tipArrow} />
            <Text style={styles.tipText}>
              💡 <Text style={styles.tipBold}>Tip:</Text> Make sure your ID is clear and all corners are visible for faster processing.
            </Text>
          </View>
        </View>
      );
    }

    // Placeholder for steps 3 and 4
    return (
      <View style={styles.stepContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.stepTitle}>Step {step}</Text>
          <Text style={styles.stepSubtitle}>Coming soon...</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubtitle}>
              Step {step} of {totalSteps}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <ProgressBar progress={progress} />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.9}
        >
          <Text style={styles.continueButtonText}>
            {step < totalSteps ? 'Continue' : 'Complete Setup'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  progressSection: {
    marginTop: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  stepContainer: {
    gap: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#111827',
  },
  verificationContainer: {
    gap: 16,
  },
  verificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tealIconBg: {
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
  },
  primaryIconBg: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  iconText: {
    fontSize: 20,
  },
  verificationContent: {
    flex: 1,
    gap: 4,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  verificationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  tealButton: {
    backgroundColor: '#14B8A6',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  tipContainer: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
    marginTop: 8,
  },
  tipArrow: {
    position: 'absolute',
    top: -8,
    left: 24,
    width: 16,
    height: 16,
    backgroundColor: '#6366F1',
    transform: [{ rotate: '45deg' }],
  },
  tipText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: 'bold',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  continueButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});