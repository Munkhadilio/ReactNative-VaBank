import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Text, Button } from 'react-native-paper';
import { Container } from './styles';
import { Header } from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Biometric: React.FC<any> = ({ navigation }) => {
  const BiometricSet = async () => {
    const biometricStat = await AsyncStorage.getItem('Biometric');
    if (biometricStat === 'true') {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Enter Password',
        disableDeviceFallback: false,
      }).catch((error) => {
        console.error('Biometric authentication failed:', error);
        return { success: false };
      });

      if (res && res.success) {
        navigation.navigate('Home');
      }
    } else if (biometricStat === 'false') {
      navigation.navigate('Home');
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <Button style={{ backgroundColor: '#004e96' }} mode="contained" onPress={BiometricSet}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Мой банк</Text>
        </Button>
        <Button
          style={{ backgroundColor: '#ff0000', marginTop: 20 }}
          mode="contained"
          onPress={() => navigation.navigate('StartMenu')}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Выйти</Text>
        </Button>
      </Container>
    </>
  );
};
