import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useZustand } from '../../zustand';
import { Text } from 'react-native';
import { Header } from '../../components/Header/Header';
import { Container, CustomButton, CustomTextButton, CustomTextButtonDisabled } from './styles';
import { OtpInput } from 'react-native-otp-entry';

export const OTP = ({ route, navigation }) => {
  const { register, login } = route.params;
  const [otp, setOtp] = useState(undefined);
  const [wrongOTP, setWrongOTP] = useState(undefined);
  const [successResetPassword, setSuccessResetPassword] = useState(undefined);
  const [status, setStatus] = useState(false);
  const [timer, setTimer] = useState(0); // Добавляем состояние для таймера
  const userState = useZustand((state) => state.userState);

  useEffect(() => {
    if (otp?.length === 6) {
      onSubmit();
    }
  }, [otp]);

  useEffect(() => {
    let intervalId;

    if (status && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setStatus(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status, timer]);

  const onSubmit = async () => {
    try {
      switch (true) {
        case register:
          try {
            const { data } = await axios.post('/user/verify/account/otp', {
              email: userState.userDto.email,
              otpCode: otp,
            });
            if (data?.status === 'OK') {
              await AsyncStorage.setItem('accessToken', userState.accessToken);
              navigation.navigate('BiometricAgreement');
            } else {
              console.log('No access token received');
            }
          } catch (error) {
            console.error('Error occurred while verifying account OTP:', error);
          }
          break;

        case login:
          try {
            const { data } = await axios.post('/user/login/otp', {
              email: userState.email,
              otpCode: otp,
            });
            if (data.accessToken) {
              await AsyncStorage.setItem('accessToken', data.accessToken);
              navigation.navigate('BiometricAgreement');
            } else {
              console.log('No access token received');
            }
          } catch (error) {
            console.error('Error occurred while logging in with OTP:', error);
          }
          break;

        default:
          console.log('Unknown operation');
      }
    } catch (error) {
      setWrongOTP(true);
    }
  };

  const onResendOTP = async () => {
    try {
      const { data } = await axios.post('/user/resendotp', {
        email: userState.email,
      });

      if (data.status === 'OK') {
        setStatus(true);
        setTimer(60);
      } else {
        console.log('No access token received');
      }
    } catch (error) {
      setWrongOTP(true);
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        {successResetPassword ? (
          <>
            <Text style={{ color: '#ffffff', fontSize: 16, textAlign: 'center', marginBottom: 28 }}>
              Пароль был успешно изменен
            </Text>
            <CustomButton
              onPress={() => onSubmit()}
              style={{
                marginTop: 28,
              }}>
              <CustomTextButton onPress={() => navigation.navigate('StartMenu')}>
                Вернуться на главный экран
              </CustomTextButton>
            </CustomButton>
          </>
        ) : (
          <>
            <Text style={{ color: '#ffffff', fontSize: 16, textAlign: 'center', marginBottom: 28 }}>
              Вам отправлен код отправленный на ваш email
            </Text>
            <OtpInput
              numberOfDigits={6}
              focusColor="#fff"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => {
                setOtp(text);
                setWrongOTP(undefined);
                console.log(text);
              }}
              theme={{
                containerStyle: { width: 324 },
                pinCodeTextStyle: { color: '#fff' },
              }}
            />
            {wrongOTP && (
              <Text style={{ color: '#FF1E1E', fontSize: 16, marginTop: 10 }}>
                Неправильный код
              </Text>
            )}

            {status ? (
              <>
                <CustomButton
                  style={{
                    marginTop: 28,
                  }}>
                  <CustomTextButtonDisabled>Осталось времени: {timer} сек</CustomTextButtonDisabled>
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton
                  onPress={() => onResendOTP()}
                  style={{
                    marginTop: 28,
                  }}>
                  <CustomTextButton>Отправить код повторно</CustomTextButton>
                </CustomButton>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};
