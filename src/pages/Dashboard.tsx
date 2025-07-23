import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Icon components (replace with react-native-vector-icons)
const SendIcon = () => <Text style={styles.iconText}>📤</Text>;
const ReceiveIcon = () => <Text style={styles.iconText}>📥</Text>;
const WithdrawIcon = () => <Text style={styles.iconText}>💰</Text>;
const BillsIcon = () => <Text style={styles.iconText}>🧾</Text>;
const QRIcon = () => <Text style={styles.iconText}>📱</Text>;
const EyeIcon = () => <Text style={styles.iconText}>👁️</Text>;
const EyeOffIcon = () => <Text style={styles.iconText}>🙈</Text>;
const TrendingUpIcon = () => <Text style={styles.iconText}>📈</Text>;
const CoffeeIcon = () => <Text style={styles.iconText}>☕</Text>;
const ShoppingBagIcon = () => <Text style={styles.iconText}>🛍️</Text>;
const CarIcon = () => <Text style={styles.iconText}>🚗</Text>;

// Bottom Navigation Component
const BottomNavigation = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>💳</Text>
        <Text style={styles.navLabel}>Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>📊</Text>
        <Text style={styles.navLabel}>Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>👤</Text>
        <Text style={styles.navLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Dashboard() {
  const navigation = useNavigation();
  const [showBalance, setShowBalance] = useState(true);

  const actions = [
    { name: "Send", icon: SendIcon, color: "#14B8A6", route: "Send" },
    { name: "Receive", icon: ReceiveIcon, color: "#6366F1", route: "Receive" },
    { name: "Withdraw", icon: WithdrawIcon, color: "#F59E0B", route: "Withdraw" },
    { name: "Pay Bills", icon: BillsIcon, color: "#8B5CF6", route: "Bills" },
    { name: "Scan QR", icon: QRIcon, color: "#14B8A6", route: "Scan" },
  ];

  const transactions = [
    { 
      id: 1, 
      name: "Coffee Shop", 
      amount: -35.50, 
      category: "food", 
      icon: CoffeeIcon, 
      time: "2h ago" 
    },
    { 
      id: 2, 
      name: "Salary Deposit", 
      amount: 15000.00, 
      category: "income", 
      icon: TrendingUpIcon, 
      time: "1d ago" 
    },
    { 
      id: 3, 
      name: "Online Shopping", 
      amount: -299.99, 
      category: "shopping", 
      icon: ShoppingBagIcon, 
      time: "3d ago" 
    },
    { 
      id: 4, 
      name: "Fuel Station", 
      amount: -650.00, 
      category: "transport", 
      icon: CarIcon, 
      time: "5d ago" 
    },
  ];

  const handleActionPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Hi Sipho 👋</Text>
              <Text style={styles.subGreeting}>Good morning!</Text>
            </View>
            <View style={styles.profileIcon}>
              <Text style={styles.profileEmoji}>👤</Text>
            </View>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeIcon /> : <EyeOffIcon />}
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>
              {showBalance ? "R 24,567.89" : "R ••••••"}
            </Text>
            <Text style={styles.accountNumber}>Account: ••••5678</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {actions.map((action, index) => (
                <TouchableOpacity
                  key={action.name}
                  style={styles.actionItem}
                  onPress={() => handleActionPress(action.route)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                    <action.icon />
                  </View>
                  <Text style={styles.actionName}>{action.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Smart Insights */}
          <View style={styles.section}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Smart Insights</Text>
                <Text style={styles.cardSubtitle}>This month</Text>
              </View>
              
              <View style={styles.insightItem}>
                <View style={styles.insightLeft}>
                  <View style={styles.insightIcon}>
                    <TrendingUpIcon />
                  </View>
                  <View>
                    <Text style={styles.insightTitle}>You saved 12% more</Text>
                    <Text style={styles.insightSubtitle}>compared to last month</Text>
                  </View>
                </View>
                <Text style={styles.insightAmount}>+R1,200</Text>
              </View>

              <View style={styles.spendingCard}>
                <View style={styles.spendingHeader}>
                  <Text style={styles.spendingEmoji}>📊</Text>
                  <Text style={styles.spendingTitle}>Top spending: Food & Dining</Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '65%' }]} />
                </View>
                <Text style={styles.spendingAmount}>R3,420 this month</Text>
              </View>
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.transactionsList}>
              {transactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionCard}>
                  <View style={styles.transactionIcon}>
                    <transaction.icon />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>{transaction.name}</Text>
                    <Text style={styles.transactionTime}>{transaction.time}</Text>
                  </View>
                  <View style={styles.transactionAmount}>
                    <Text style={[
                      styles.amountText,
                      transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount
                    ]}>
                      {transaction.amount > 0 ? '+' : ''}R {Math.abs(transaction.amount).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subGreeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  profileIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: {
    fontSize: 20,
  },
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  eyeButton: {
    padding: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: (width - 80) / 3, // 3 columns with gaps
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  insightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  insightSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  insightAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14B8A6',
  },
  spendingCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
  },
  spendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  spendingEmoji: {
    fontSize: 20,
  },
  spendingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  spendingAmount: {
    fontSize: 14,
    color: '#6B7280',
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  transactionTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
  positiveAmount: {
    color: '#14B8A6',
  },
  negativeAmount: {
    color: '#111827',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  iconText: {
    fontSize: 16,
  },
});