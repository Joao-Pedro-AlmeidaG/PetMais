import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { OrdersProvider } from './src/context/OrdersContext';
import { AssistantProvider } from './src/context/AssistantContext';

import AppNavigator from './src/navigation/AppNavigator';
import FloatingAssistantButton from './src/components/FloatingAssistantButton';
import AssistantChatModal from './src/components/AssistantChatModal';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <AssistantProvider>
              <NavigationContainer>
                <AppNavigator />
                <FloatingAssistantButton />
                <AssistantChatModal />
              </NavigationContainer>
              <StatusBar style="dark" />
            </AssistantProvider>
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
