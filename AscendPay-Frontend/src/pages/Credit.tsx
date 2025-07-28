import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  Dimensions,
  Image,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

// Local color definitions
const COLORS = {
  PRIMARY: '#20B2AA',       // Teal
  SECONDARY: '#6366F1',     // Purple
  GOLD: '#FFD700',          // Gold
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: '#666666',
  LIGHT_GRAY: '#F5F5F5',
};

export default function CreditBuilder() {
  const navigation = useNavigation();
  const creditScore = 685;
  const scorePercentage = (creditScore / 850) * 100;

  const loanOffers = [
    {
      amount: "R50,000",
      rate: "12.5%",
      term: "24 months",
      monthly: "R2,376",
      provider: "Standard Bank",
      aiMatch: 95,
      featured: true
    },
    {
      amount: "R25,000", 
      rate: "14.2%",
      term: "18 months",
      monthly: "R1,632",
      provider: "FNB",
      aiMatch: 88,
      featured: false
    },
    {
      amount: "R75,000",
      rate: "11.8%", 
      term: "36 months",
      monthly: "R2,485",
      provider: "Nedbank",
      aiMatch: 82,
      featured: false
    }
  ];

  const tips = [
    "Save R50 weekly to improve your score",
    "Pay bills on time for 3 months straight",
    "Reduce your credit utilization below 30%",
    "Consider a secured credit card"
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credit Builder</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      <ScrollView style={styles.content}>
        {/* Credit Score Widget */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your Credit Score</Text>
            <TouchableOpacity style={styles.historyButton}>
              <Icon name="trending-up" size={16} color={COLORS.PRIMARY} />
              <Text style={styles.historyButtonText}>History</Text>
            </TouchableOpacity>
          </View>

          {/* Score Circle */}
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              {/* Background circle */}
              <View style={styles.scoreCircleBackground} />
              {/* Progress circle - would use react-native-svg in production */}
              <View style={[styles.scoreCircleProgress, { 
                transform: [{ rotate: `${scorePercentage * 3.6 - 90}deg` }] 
              }]} />
              {/* Score display */}
              <View style={styles.scoreTextContainer}>
                <Text style={styles.scoreText}>{creditScore}</Text>
                <Text style={styles.scoreRating}>Good</Text>
              </View>
            </View>
            
            <Text style={styles.scoreSubtext}>
              Score range: 300-850 • Last updated: Today
            </Text>
          </View>
        </View>

        {/* Loan Offers */}
        <Text style={styles.sectionTitle}>Loan Offers</Text>
        <View style={styles.offersContainer}>
          {loanOffers.map((offer, index) => (
            <View 
              key={index} 
              style={[
                styles.offerCard,
                offer.featured && styles.featuredOfferCard
              ]}
            >
              {offer.featured && (
                <View style={styles.featuredBadge}>
                  <Icon name="star" size={16} color={COLORS.GOLD} />
                  <Text style={styles.featuredBadgeText}>Featured Offer</Text>
                </View>
              )}
              
              <View style={styles.offerHeader}>
                <View>
                  <Text style={styles.offerAmount}>{offer.amount}</Text>
                  <Text style={styles.offerProvider}>{offer.provider}</Text>
                </View>
                <View style={styles.offerMatch}>
                  <Icon name="star" size={12} color={COLORS.PRIMARY} />
                  <Text style={styles.offerMatchText}>{offer.aiMatch}% AI Match</Text>
                </View>
              </View>

              <View style={styles.offerDetails}>
                <View style={styles.offerDetail}>
                  <Text style={styles.offerDetailLabel}>Monthly Payment</Text>
                  <Text style={styles.offerDetailValue}>{offer.monthly}</Text>
                </View>
                <View style={styles.offerDetail}>
                  <Text style={styles.offerDetailLabel}>Term</Text>
                  <Text style={styles.offerDetailValue}>{offer.term}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[
                  styles.applyButton,
                  offer.featured && styles.featuredApplyButton
                ]}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Tips Panel */}
        <View style={styles.card}>
          <View style={styles.tipsHeader}>
            <View style={styles.tipsIcon}>
              <Icon name="lightbulb-on" size={24} color={COLORS.PRIMARY} />
            </View>
            <Text style={styles.tipsTitle}>Credit Building Tips</Text>
          </View>
          
          <View style={styles.tipsContainer}>
            {tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.SECONDARY,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: COLORS.BLACK,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  historyButtonText: {
    color: COLORS.PRIMARY,
    marginLeft: 4,
    fontSize: 14,
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  scoreCircleBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
    borderWidth: 8,
    borderColor: COLORS.LIGHT_GRAY,
  },
  scoreCircleProgress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
    borderWidth: 8,
    borderLeftColor: COLORS.PRIMARY,
    borderTopColor: COLORS.GOLD,
    borderRightColor: COLORS.PRIMARY,
    borderBottomColor: COLORS.GOLD,
    transform: [{ rotate: '0deg' }],
  },
  scoreTextContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  scoreRating: {
    fontSize: 14,
    color: COLORS.GRAY,
  },
  scoreSubtext: {
    fontSize: 12,
    color: COLORS.GRAY,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 12,
    marginLeft: 4,
  },
  offersContainer: {
    marginBottom: 16,
  },
  offerCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredOfferCard: {
    borderWidth: 2,
    borderColor: COLORS.GOLD,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: COLORS.GOLD,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  offerAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  offerProvider: {
    fontSize: 12,
    color: COLORS.GRAY,
  },
  offerMatch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerMatchText: {
    fontSize: 10,
    color: COLORS.PRIMARY,
    marginLeft: 4,
  },
  offerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  offerDetail: {
    flex: 1,
  },
  offerDetailLabel: {
    fontSize: 10,
    color: COLORS.GRAY,
  },
  offerDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  applyButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  featuredApplyButton: {
    backgroundColor: COLORS.GOLD,
  },
  applyButtonText: {
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.PRIMARY}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  tipsContainer: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.LIGHT_GRAY}50`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipNumberText: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.BLACK,
  },
});