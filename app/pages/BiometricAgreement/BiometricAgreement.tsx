import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Text, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container } from './styles';
import { Header } from '../../components/Header/Header';
import { LogoSVG } from '../../styles/styleComponents';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BiometricAgreement: React.FC<any> = ({ navigation }) => {
  const [biometric, setBiometric] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const data = await AsyncStorage.getItem('Biometric');
      setBiometric(data);
      console.log(biometric);
    })();
  }, []);

  const BiometricSet = async () => {
    await AsyncStorage.setItem('Biometric', 'true');
    const res = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Password',
      disableDeviceFallback: false,
    }).catch((error) => {
      console.error('Biometric authentication failed:', error);
      return { success: false };
    });

    if (res && res.success) {
      setIsAuthenticated(true);
      navigation.navigate('Home');
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              marginTop: 50,
              marginBottom: 28,
              width: '80%',
              fontSize: 18,
            }}>
            Использовать биометрические данные для входа?
          </Text>
          <Button
            style={{ backgroundColor: '#004e96' }}
            icon="face-recognition"
            mode="contained"
            onPress={BiometricSet}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Да</Text>
          </Button>
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 40 }}
            onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>Пропустить</Text>
          </TouchableOpacity>
        </>
      </Container>
    </>
  );
};
