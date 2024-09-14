import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import LoginScreen from '../screens/LoginScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Oculta la barra de navegación en LoginScreen
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            
            headerStyle: { backgroundColor: '#ff6347' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={({ navigation, route }) => ({
            
            headerStyle: { backgroundColor: '#ff6347' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          })}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={({ navigation, route }) => ({
            
            headerStyle: { backgroundColor: '#ff6347' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
