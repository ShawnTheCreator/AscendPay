// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './src/pages/Onboarding';
import SignUp from './src/pages/Signup';
import MainAppNavigator from './src/components/ui/navigation';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Onboarding" component={Onboarding} />
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="MainApp" component={MainAppNavigator} />
        {/* REMOVE the Dashboard screen from here */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}