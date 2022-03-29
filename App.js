import React from "react";
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); // Ignore log notification
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
