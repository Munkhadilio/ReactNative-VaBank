import React from 'react';
import { Text, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container } from './styles';
import { Header } from '../../components/Header/Header';
import { LogoSVG } from '../../styles/styleComponents';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  OTP: undefined;
  StartMenu: undefined;
  Home: undefined;
  Settings: undefined;
};

type BiometricAgreementProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export const BiometricAgreement: React.FC<any> = ({ navigation }) => {
  const BiometricSet = async () => {
    await AsyncStorage.setItem('Biometric', 'true');
    navigation.navigate('OTP');
  };

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <LogoSVG />
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
          style={{
            backgroundColor: '#004e96',
          }}
          icon="face-recognition"
          mode="contained"
          onPress={() => BiometricSet()}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
            }}>
            Да
          </Text>
        </Button>
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 40 }}
          onPress={() => navigation.navigate('OTP')}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Пропустить
          </Text>
        </TouchableOpacity>
      </Container>
    </>
  );
};
