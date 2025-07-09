import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registroscreen from './screens/Registroscreen';
import Loginscreen from './screens/Loginscreen';
import Testescreen from './screens/Testescreen';
import Homescreen from './screens/Homescreen';
import RegistroNoticiascreen from './screens/RegistroNoticiascreen';
import Configurar from './screens/Configurarscreen'; 
import HomeADM from './screens/HomeADMscreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Loginscreen} />
        <Stack.Screen name="Registro" component={Registroscreen} />
        <Stack.Screen name="Testescreen" component={Testescreen} />
        <Stack.Screen name="Home"component={Homescreen} />
        <Stack.Screen name="RegistroNoticiascreen"component={RegistroNoticiascreen} />
        <Stack.Screen name="Configurar"component={Configurar} />
        <Stack.Screen name="HomeADM"component={HomeADM} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
