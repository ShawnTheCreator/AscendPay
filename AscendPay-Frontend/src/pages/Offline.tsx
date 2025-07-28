import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default function OfflineMode() {
  const navigation = useNavigation();
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(false);

  const offlineServices = [
    {
      code: '*120*1234#',
      name: 'Check Balance',
      icon: 'hash',
      description: 'View your account balance instantly'
    },
    {
      code: '*120*5678#', 
      name: 'Mini Statement',
      icon: 'message-text',
      description: 'Get your last 5 transactions'
    },
    {
      code: '*120*9999#',
      name: 'Buy Airtime',
      icon: 'phone',
      description: 'Purchase airtime for yourself or others'
    },
    {
      code: '*120*7777#',
      name: 'Transfer Money',
      icon: 'send',
      description: 'Send money to other accounts'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offline Banking</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Main Info Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Icon name="wifi-off" size={32} color="#666" />
          </View>
          <Text style={styles.title}>No Internet? No Problem!</Text>
          <Text style={styles.subtitle}>
            Access essential banking services even when you're offline using USSD codes.
          </Text>
          
          <View style={styles.quickAccessContainer}>
            <Text style={styles.quickAccessTitle}>Quick Access Code</Text>
            <Text style={styles.quickAccessCode}>*123*444#</Text>
            <Text style={styles.quickAccessSubtitle}>
              Dial this code to access all offline banking services
            </Text>
          </View>

          <View style={styles.toggleContainer}>
            <View>
              <Text style={styles.toggleTitle}>Enable Offline Mode</Text>
              <Text style={styles.toggleSubtitle}>
                Get SMS notifications for transactions
              </Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.switch, 
                offlineModeEnabled && styles.switchActive
              ]}
              onPress={() => setOfflineModeEnabled(!offlineModeEnabled)}
            >
              <View style={[
                styles.switchThumb,
                offlineModeEnabled && styles.switchThumbActive
              ]}/>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Codes */}
        <Text style={styles.sectionTitle}>Available Services</Text>
        <View style={styles.servicesContainer}>
          {offlineServices.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.serviceContent}>
                <View style={styles.serviceIconContainer}>
                  <Icon name={service.icon} size={20} color="#666" />
                </View>
                <View style={styles.serviceDetails}>
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceCode}>{service.code}</Text>
                  </View>
                  <Text style={styles.serviceDescription}>
                    {service.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.card}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color="#20B2AA" />
            <Text style={styles.infoTitle}>How to Use</Text>
          </View>
          
          <View style={styles.stepsContainer}>
            {[
              "Open your phone's dialer app",
              "Dial the USSD code exactly as shown",
              "Press the call button to execute",
              "Follow the on-screen prompts"
            ].map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Security Notice */}
        <View style={[styles.card, styles.securityCard]}>
          <View style={styles.securityContent}>
            <FontAwesome name="shield" size={20} color="#FFD700" />
            <View style={styles.securityText}>
              <Text style={styles.securityTitle}>Secure & Safe</Text>
              <Text style={styles.securityDescription}>
                All offline transactions are protected with the same security as our online banking.
                You'll receive SMS confirmations for all transactions.
              </Text>
            </View>
          </View>
        </View>

        {/* Support */}
        <View style={styles.card}>
          <View style={styles.supportContent}>
            <Ionicons name="time" size={24} color="#666" />
            <Text style={styles.supportTitle}>Need Help?</Text>
            <Text style={styles.supportSubtitle}>
              Our offline banking support is available 24/7
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>
                Call Support: 0860 123 456
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation would be implemented separately */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  quickAccessContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  quickAccessCode: {
    fontSize: 24,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  quickAccessSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  toggleTitle: {
    fontWeight: '500',
  },
  toggleSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  switch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchActive: {
    backgroundColor: '#20B2AA',
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  servicesContainer: {
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  serviceName: {
    fontWeight: '600',
  },
  serviceCode: {
    fontFamily: 'monospace',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontWeight: '600',
    marginLeft: 8,
  },
  stepsContainer: {
    marginLeft: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#20B2AA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    flex: 1,
  },
  securityCard: {
    borderColor: 'rgba(255, 215, 0, 0.2)',
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
  },
  securityContent: {
    flexDirection: 'row',
  },
  securityText: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 12,
    color: '#666',
  },
  supportContent: {
    alignItems: 'center',
  },
  supportTitle: {
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  supportButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  supportButtonText: {
    fontWeight: '500',
  },
});