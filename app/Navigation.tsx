import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { StartMenu } from './pages/StartMenu/StartMenu';
import { OTP } from './pages/OTP/OTP';
import { Home } from './pages/Home';
import { Transfer } from './pages/Transfer/Transfer';
import { BiometricAgreement } from './pages/BiometricAgreement/BiometricAgreement';
import { Biometric } from './pages/Biometric/Biometric';
import { Settings } from './pages/Settings/Settings';
import { MyCards } from './pages/MyCards/index';

type RootStackParamList = {
  StartMenu: undefined;
  Home: undefined;
  Settings: undefined;
  Login: undefined;
  Registration: undefined;
  OTP: undefined;
  BiometricAgreement: undefined;
  Biometric: undefined;
  MyCards: undefined;
  Transfers: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = (): JSX.Element => {
  const [biometric, setBiometric] = useState<string | null>(null);

  useEffect(() => {
    const fetchBiometric = async () => {
      const value = await AsyncStorage.getItem('Biometric');
      setBiometric(value);
    };

    fetchBiometric();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {biometric === 'true' ? (
          <Stack.Screen name="Biometric" component={Biometric} options={{ headerShown: false }} />
        ) : null}
        <Stack.Screen name="StartMenu" component={StartMenu} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
        <Stack.Screen
          name="BiometricAgreement"
          component={BiometricAgreement}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="MyCards" component={MyCards} options={{ headerShown: false }} />
        <Stack.Screen name="Transfers" component={Transfer} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
