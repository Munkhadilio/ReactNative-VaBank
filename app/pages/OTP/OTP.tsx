import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useZustand } from '../../zustand';
import { Text } from 'react-native';
import { Header } from '../../components/Header/Header';
import { Container, CustomButton, CustomTextButton } from './styles';
import { OtpInput } from 'react-native-otp-entry';

export const OTP = ({ navigation, route }) => {
  const { haveAccount, forPage } = route.params;

  const [otp, setOtp] = useState(undefined);
  const userState = useZustand((state) => state.userState);

  useEffect(() => {
    if (otp?.length === 6) {
      onSubmit();
    }
  }, [otp]);

  const onSubmit = async () => {
    try {
      const response =
        haveAccount && forPage === 'Login'
          ? await axios.post('/auth/login', { ...userState, otpCode: +otp })
          : await axios.post('/auth/register', { ...userState, otpCode: +otp });

      const responseData = response?.data;

      if (responseData?.accessToken) {
        await AsyncStorage.setItem('accessToken', responseData.accessToken);
        await navigation.navigate('Home');
      } else {
        console.log('No access token received');
      }
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <Text style={{ color: '#ffffff', fontSize: 16, textAlign: 'center', marginBottom: 28 }}>
          Вам отправлен код отправленный на ваш email
        </Text>
        <OtpInput
          numberOfDigits={6}
          focusColor="#fff"
          focusStickBlinkingDuration={500}
          onTextChange={(text) => setOtp(text)}
          theme={{
            containerStyle: { width: 324 },
            pinCodeTextStyle: { color: '#fff' },
          }}
        />
        <CustomButton
          onPress={() => onSubmit()}
          style={{
            marginTop: 28,
          }}>
          <CustomTextButton>Отправить код повторно</CustomTextButton>
        </CustomButton>
      </Container>
    </>
  );
};
