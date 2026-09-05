import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrderFinishedScreen from '../screens/OrderFinishedScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Produtos" component={ProductListScreen} />
      <Stack.Screen name="ProdutoDetalhe" component={ProductDetailScreen} />
      <Stack.Screen name="Carrinho" component={CartScreen} />
      <Stack.Screen name="PedidoFinalizado" component={OrderFinishedScreen} />
    </Stack.Navigator>
  );
}
