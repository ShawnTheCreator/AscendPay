import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../../pages/Dashboard';
import SendScreen from '../../pages/Send';
import OfflineScreen from '../../pages/Offline';
import CreditScreen from '../../pages/Credit';
import CrossBorderScreen from '../../pages/CrossBorder';
import Profile from '../../pages/Profile';
import { BlurView } from '@react-native-community/blur';

// Color constants
const COLORS = {
  PRIMARY: '#20B2AA',       // Active tab color
  INACTIVE: '#666666',      // Inactive tab color
  WHITE: '#FFFFFF',         // Background
  BLACK: '#000000',         // Shadows
};

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => Platform.select({
          ios: (
            <BlurView
              blurType="light"
              blurAmount={20}
              style={styles.blurView}
            />
          ),
          android: (
            <View style={[styles.blurView, { backgroundColor: COLORS.WHITE }]} />
          ),
        }),
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name={focused ? 'home' : 'home-outline'} 
              focused={focused} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Send" 
        component={SendScreen}
        options={{
          tabBarLabel: 'Send',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name={focused ? 'send' : 'send-outline'} 
              focused={focused} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="CrossBorder" 
        component={CrossBorderScreen}
        options={{
          tabBarLabel: 'Global',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name={focused ? 'earth' : 'earth'} 
              focused={focused} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Offline" 
        component={OfflineScreen}
        options={{
          tabBarLabel: 'Offline',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name={focused ? 'wifi-off' : 'wifi-off'} 
              focused={focused} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Credit" 
        component={CreditScreen}
        options={{
          tabBarLabel: 'Credit',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name={focused ? 'credit-card' : 'credit-card-outline'} 
              focused={focused} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name={focused ? 'account' : 'account-outline'} 
              focused={focused} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Reusable icon component
const TabBarIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <View style={styles.iconContainer}>
    <Icon 
      name={name}
      size={24}
      color={focused ? COLORS.PRIMARY : COLORS.INACTIVE}
    />
    {focused && <View style={styles.activeIndicator} />}
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    height: Platform.select({ ios: 90, android: 60 }),
    paddingBottom: Platform.select({ ios: 30, android: 10 }),
    backgroundColor: 'transparent',
    ...Platform.select({
      android: {
        elevation: 10,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
    }),
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    marginBottom: 4,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.PRIMARY,
  },
  tabLabel: {
    fontSize: 12,
    color: COLORS.INACTIVE,
  },
  tabLabelFocused: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});