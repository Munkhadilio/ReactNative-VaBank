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
import { Index as Profile } from './pages/Profile/index';
import { Splash } from './pages/Splash';
import { ForgotPasswordNotLogIn } from './pages/ForgotPasswordNotLogIn/ForgotPasswordNotLogIn';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { AddCard } from './pages/AddCard/AddCard';

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
  Splash: undefined;
  ForgotPasswordNotLogIn: undefined;
  ForgotPassword: undefined;
  Profile: undefined;
  AddCard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = (): JSX.Element => {
  const [haveAccessToken, setHaveAccessToken] = useState(false);

  useEffect(() => {
    const fetchAuthenticationData = async () => {
      const accessToken = AsyncStorage.getItem('accessToken');
      if (await accessToken) {
        setHaveAccessToken(true);
      }
    };

    fetchAuthenticationData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading && (
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        )}
        {haveAccessToken && (
          <Stack.Screen name="Biometric" component={Biometric} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="StartMenu" component={StartMenu} options={{ headerShown: false }} />
        <Stack.Screen
          name="BiometricAgreement"
          component={BiometricAgreement}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordNotLogIn"
          component={ForgotPasswordNotLogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }} />
        <Stack.Screen name="MyCards" component={MyCards} options={{ headerShown: false }} />
        <Stack.Screen name="Transfers" component={Transfer} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
