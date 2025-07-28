import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, SceneMap, TabBar, Route } from 'react-native-tab-view';

const { width } = Dimensions.get('window');

// Type definitions
type Contact = {
  name: string;
  phone: string;
  avatar: string;
};

type SuccessScreenProps = {
  amount: string;
  onDone: () => void;
};

type BankTransferTabProps = {
  amount: string;
  setAmount: (amount: string) => void;
  handleSend: () => void;
  recentContacts: Contact[];
};

type TabRoute = Route & {
  key: string;
  title: string;
};

// Success Screen Component
const SuccessScreen: React.FC<SuccessScreenProps> = ({ amount, onDone }) => (
  <View style={styles.successContainer}>
    <View style={styles.successCard}>
      <Animated.View style={[styles.successIcon, { transform: [{ scale: new Animated.Value(1) }] }]}>
        <Icon name="check-circle" size={48} color="#20B2AA" />
      </Animated.View>
      <Text style={styles.successTitle}>Success!</Text>
      <Text style={styles.successMessage}>
        R{amount} sent successfully to Sarah Nkomo
      </Text>
      <TouchableOpacity style={styles.doneButton} onPress={onDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Bank Transfer Tab
const BankTransferTab: React.FC<BankTransferTabProps> = ({ 
  amount, 
  setAmount, 
  handleSend, 
  recentContacts 
}) => (
  <ScrollView style={styles.tabContent}>
    <View style={styles.card}>
      <Text style={styles.label}>Amount</Text>
      <View style={styles.amountInput}>
        <Text style={styles.currencySymbol}>R</Text>
        <TextInput
          style={styles.amountTextInput}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Contacts</Text>
      <View style={styles.contactsGrid}>
        {recentContacts.map((contact, index) => (
          <TouchableOpacity key={index} style={styles.contactCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{contact.avatar}</Text>
            </View>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Verify Transaction</Text>
      <View style={styles.verificationButtons}>
        <TouchableOpacity style={styles.verificationButton}>
          <Icon name="fingerprint" size={20} color="#333" />
          <Text style={styles.verificationButtonText}>Fingerprint</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.verificationButton}>
          <Icon name="face-recognition" size={20} color="#333" />
          <Text style={styles.verificationButtonText}>Face ID</Text>
        </TouchableOpacity>
      </View>
    </View>

    <TouchableOpacity
      onPress={handleSend}
      disabled={!amount || parseFloat(amount) <= 0}
      style={[
        styles.sendButton,
        (!amount || parseFloat(amount) <= 0) && styles.disabledButton
      ]}
    >
      <Text style={styles.sendButtonText}>Send R{amount || "0.00"}</Text>
    </TouchableOpacity>
  </ScrollView>
);

// Phone Transfer Tab
const PhoneTransferTab: React.FC = () => (
  <View style={styles.tabContent}>
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon name="cellphone" size={48} color="#20B2AA" />
      </View>
      <Text style={styles.routeTitle}>Send to Phone Number</Text>
      <Text style={styles.routeDescription}>
        Send money instantly to any South African mobile number
      </Text>
      <TextInput 
        style={styles.input} 
        placeholder="+27 XX XXX XXXX" 
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// QR Transfer Tab
const QRTransferTab: React.FC = () => (
  <View style={styles.tabContent}>
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon name="qrcode" size={48} color="#4169E1" />
      </View>
      <Text style={styles.routeTitle}>Scan QR Code</Text>
      <Text style={styles.routeDescription}>
        Point your camera at a QR code to send money
      </Text>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SendReceive: React.FC = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<TabRoute[]>([
    { key: 'bank', title: 'To Bank' },
    { key: 'phone', title: 'To Phone' },
    { key: 'qr', title: 'To QR' },
  ]);

  const recentContacts: Contact[] = [
    { name: "Sarah Nkomo", phone: "+27 82 xxx 1234", avatar: "👩🏽" },
    { name: "John Mthembu", phone: "+27 71 xxx 5678", avatar: "👨🏿" },
    { name: "Lisa van der Merwe", phone: "+27 83 xxx 9012", avatar: "👩🏻" },
    { name: "David Phiri", phone: "+27 79 xxx 3456", avatar: "👨🏾" },
  ];

  const handleSend = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigation.navigate('Dashboard');
    }, 3000);
  };

  const renderScene = SceneMap({
    bank: () => (
      <BankTransferTab 
        amount={amount} 
        setAmount={setAmount} 
        handleSend={handleSend} 
        recentContacts={recentContacts} 
      />
    ),
    phone: PhoneTransferTab,
    qr: QRTransferTab,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      renderIcon={({ route, focused }: { route: TabRoute; focused: boolean }) => {
        let iconName;
        if (route.key === 'bank') iconName = 'bank';
        if (route.key === 'phone') iconName = 'cellphone';
        if (route.key === 'qr') iconName = 'qrcode-scan';
        return <Icon name={iconName} size={20} color={focused ? '#20B2AA' : '#666'} />;
      }}
    />
  );

  if (showSuccess) {
    return (
      <SuccessScreen 
        amount={amount} 
        onDone={() => navigation.navigate('Dashboard')} 
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send & Receive</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width }}
      />
    </SafeAreaView>
  );
};

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
  tabBar: {
    backgroundColor: 'white',
    elevation: 2,
  },
  tabIndicator: {
    backgroundColor: '#20B2AA',
    height: 3,
  },
  tabLabel: {
    color: '#333',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tabContent: {
    flex: 1,
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
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 0,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  contactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 20,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 12,
    color: '#666',
  },
  verificationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  verificationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  verificationButtonText: {
    marginLeft: 8,
    color: '#333',
    fontWeight: '500',
  },
  sendButton: {
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  successCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(32, 178, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SendReceive;