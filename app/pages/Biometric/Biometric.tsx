import React, { useEffect, useState } from 'react';

import { Header } from '../../components/Header/Header';
import { LogoSVG } from '../../styles/styleComponents';
import { Container, Button, ButtonText } from './styles';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
};

type BiometricProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export const Biometric: React.FC<BiometricProps> = ({ navigation }) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync(); // если подходтт
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const onAuthenticate = async () => {
    const res = await AsyncStorage.getItem('Biometric');
    if (isBiometricSupported && res === 'true') {
      const auth = LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        // cancelLabel: 'Cancel', // включи это если закоментишт нижнее
        fallbackLabel: 'Enter Password',
        disableDeviceFallback: false,
      });
      auth.then((result) => {
        setIsAuthenticated(result.success);
        AsyncStorage.setItem('Biometric', 'true');
        navigation.navigate('Home');
      });
    } else if (res === 'false') {
      navigation.navigate('Home');
    }
  };

  return (
    <>
      <Container>
        <LogoSVG />
        <Button onPress={() => onAuthenticate()}>
          <ButtonText>Мой банк</ButtonText>
        </Button>
      </Container>
    </>
  );
};
