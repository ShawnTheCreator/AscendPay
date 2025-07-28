import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Button } from 'react-native-paper'; 

type Country = {
  code: string;
  name: string;
  currency: string;
  flag: string;
  rate: number;
};

export default function CrossBorder() {
  const navigation = useNavigation();
  const [fromCurrency, setFromCurrency] = useState<string>("ZAR");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientPhone, setRecipientPhone] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  const countries: Country[] = [
    { code: "ZW", name: "Zimbabwe", currency: "USD", flag: "🇿🇼", rate: 0.055 },
    { code: "NG", name: "Nigeria", currency: "NGN", flag: "🇳🇬", rate: 26.8 },
    { code: "KE", name: "Kenya", currency: "KES", flag: "🇰🇪", rate: 7.9 },
    { code: "GH", name: "Ghana", currency: "GHS", flag: "🇬🇭", rate: 0.67 },
    { code: "UG", name: "Uganda", currency: "UGX", flag: "🇺🇬", rate: 207.5 },
    { code: "TZ", name: "Tanzania", currency: "TZS", flag: "🇹🇿", rate: 133.2 },
  ];

  const exchangeRate = countries.find(c => c.currency === toCurrency)?.rate || 0.055;
  const convertedAmount = parseFloat(amount) * exchangeRate;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Cross-Border Payments</Text>
          <Text style={styles.headerSubtitle}>
            Send money to Zimbabwe, Nigeria, Kenya... instantly
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {step === 1 && (
          <>
            {/* Currency Exchange Widget */}
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Send Money</Text>
                  <Button mode="text" onPress={() => {}}>
                    <Icon name="refresh" size={16} color="#20B2AA" />
                    <Text>Refresh</Text>
                  </Button>
                </View>

                <View style={styles.currencyExchangeContainer}>
                  {/* From Currency */}
                  <View style={styles.currencyInputContainer}>
                    <Text style={styles.label}>You Send</Text>
                    <View style={styles.currencyInputRow}>
                      <TextInput
                        style={styles.amountInput}
                        keyboardType="numeric"
                        placeholder="0.00"
                        value={amount}
                        onChangeText={setAmount}
                      />
                      <View style={styles.currencySelector}>
                        <Text>🇿🇦 ZAR</Text>
                      </View>
                    </View>
                  </View>

                  {/* Exchange Arrow */}
                  <View style={styles.exchangeArrowContainer}>
                    <View style={styles.exchangeArrow}>
                      <Icon name="arrow-right" size={20} color="#20B2AA" />
                    </View>
                  </View>

                  {/* To Currency */}
                  <View style={styles.currencyInputContainer}>
                    <Text style={styles.label}>Recipient Gets</Text>
                    <View style={styles.currencyInputRow}>
                      <TextInput
                        style={[styles.amountInput, styles.readOnlyInput]}
                        value={convertedAmount.toFixed(2)}
                        editable={false}
                      />
                      <View style={styles.currencySelector}>
                        <Text>{countries.find(c => c.currency === toCurrency)?.flag} {toCurrency}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Exchange Rate Info */}
                  <View style={styles.rateInfoContainer}>
                    <View style={styles.rateInfoRow}>
                      <Text style={styles.rateInfoText}>Exchange Rate</Text>
                      <Text style={styles.rateInfoValue}>1 ZAR = {exchangeRate} {toCurrency}</Text>
                    </View>
                    <View style={styles.rateInfoBadge}>
                      <Icon name="trending-down" size={16} color="#20B2AA" />
                      <Text style={styles.rateInfoBadgeText}>Good rate - save 15% vs banks</Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Country Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Destinations</Text>
              <View style={styles.countryGrid}>
                {countries.slice(0, 4).map((country) => (
                  <TouchableOpacity 
                    key={country.code}
                    style={[
                      styles.countryCard,
                      toCurrency === country.currency && styles.selectedCountryCard
                    ]}
                    onPress={() => setToCurrency(country.currency)}
                  >
                    <Text style={styles.countryFlag}>{country.flag}</Text>
                    <Text style={styles.countryName}>{country.name}</Text>
                    <Text style={styles.countryCurrency}>{country.currency}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <Card style={styles.featureCard}>
                <Card.Content style={styles.featureContent}>
                  <Icon name="clock" size={24} color="#20B2AA" />
                  <Text style={styles.featureTitle}>Instant</Text>
                  <Text style={styles.featureSubtitle}>Transfer</Text>
                </Card.Content>
              </Card>
              
              <Card style={styles.featureCard}>
                <Card.Content style={styles.featureContent}>
                  <Icon name="shield" size={24} color="#6366F1" />
                  <Text style={styles.featureTitle}>Secure</Text>
                  <Text style={styles.featureSubtitle}>& Safe</Text>
                </Card.Content>
              </Card>
              
              <Card style={styles.featureCard}>
                <Card.Content style={styles.featureContent}>
                  <Icon name="cash" size={24} color="#FFD700" />
                  <Text style={styles.featureTitle}>Low</Text>
                  <Text style={styles.featureSubtitle}>Fees</Text>
                </Card.Content>
              </Card>
            </View>

            <Button
              mode="contained"
              onPress={() => setStep(2)}
              disabled={!amount || parseFloat(amount) <= 0}
              style={styles.continueButton}
              labelStyle={styles.continueButtonLabel}
            >
              Continue to Recipient Details
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTitle}>Recipient Details</Text>
                
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter recipient's full name"
                      value={recipientName}
                      onChangeText={setRecipientName}
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="+263 XX XXX XXXX"
                      keyboardType="phone-pad"
                      value={recipientPhone}
                      onChangeText={setRecipientPhone}
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Account Number (Optional)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="For bank transfers"
                      keyboardType="numeric"
                      value={accountNumber}
                      onChangeText={setAccountNumber}
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Purpose of Transfer</Text>
                    {/* You would implement a custom picker here */}
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Transfer Summary */}
            <Card style={styles.summaryCard}>
              <Card.Content>
                <Text style={styles.summaryTitle}>Transfer Summary</Text>
                <View style={styles.summaryRow}>
                  <Text>Amount to send:</Text>
                  <Text style={styles.summaryValue}>R {amount}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text>Exchange rate:</Text>
                  <Text style={styles.summaryValue}>1 ZAR = {exchangeRate} {toCurrency}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text>Transfer fee:</Text>
                  <Text style={styles.summaryValue}>R 25.00</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryTotalLabel}>Recipient gets:</Text>
                  <Text style={styles.summaryTotalValue}>
                    {convertedAmount.toFixed(2)} {toCurrency}
                  </Text>
                </View>
              </Card.Content>
            </Card>

            <View style={styles.buttonGroup}>
              <Button
                mode="outlined"
                onPress={() => setStep(1)}
                style={styles.backButton}
              >
                Back
              </Button>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Dashboard')}
                style={styles.sendButton}
              >
                Send Money
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyExchangeContainer: {
    marginTop: 16,
  },
  currencyInputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  currencyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  readOnlyInput: {
    backgroundColor: '#F5F5F5',
  },
  currencySelector: {
    width: 100,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  exchangeArrowContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  exchangeArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(32, 178, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateInfoContainer: {
    backgroundColor: 'rgba(32, 178, 170, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  rateInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rateInfoText: {
    fontSize: 12,
    color: '#666',
  },
  rateInfoValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  rateInfoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateInfoBadgeText: {
    fontSize: 12,
    color: '#20B2AA',
    marginLeft: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  countryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  countryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  selectedCountryCard: {
    borderWidth: 2,
    borderColor: '#20B2AA',
  },
  countryFlag: {
    fontSize: 24,
    marginBottom: 8,
  },
  countryName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  countryCurrency: {
    fontSize: 12,
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureCard: {
    width: '32%',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  featureContent: {
    alignItems: 'center',
    padding: 12,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  continueButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    marginTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  summaryCard: {
    backgroundColor: 'rgba(32, 178, 170, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(32, 178, 170, 0.2)',
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryValue: {
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 8,
  },
  summaryTotalLabel: {
    fontWeight: 'bold',
  },
  summaryTotalValue: {
    fontWeight: 'bold',
    color: '#20B2AA',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#20B2AA',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#20B2AA',
  },
});