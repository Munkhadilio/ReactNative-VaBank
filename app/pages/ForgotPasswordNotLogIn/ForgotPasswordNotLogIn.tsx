import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from '../../axios.js';
import { useZustand } from '../../zustand.js';
import {
  LoginContainer,
  CustomInput,
  CustomButtonActive,
  CustomButtonDisabled,
  CustomText,
} from './styles';

import { Header } from '../../components/Header/Header';

interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export const ForgotPasswordNotLogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(false);
  const [errorRes, setErrorRes] = useState(null);
  const [timer, setTimer] = useState(0); // Добавляем состояние для таймера

  const addUser = useZustand((state) => state.addUser);

  const sendOTPforResetPassword = async () => {
    try {
      const { data } = await axios.post('/user/resetpassword', {
        email: email,
      });

      if (data.status === 'OK') {
        setStatus(true);
        setTimer(60);
      } else {
        console.log(data);
      }
    } catch (error) {
      if (error.response.data) {
        setErrorRes(error.response.data);
      } else {
        console.log('err');
      }
    }
  };

  useEffect(() => {
    let intervalId;

    if (status && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // Когда таймер достигнет 0, меняем статус на false
    if (timer === 0) {
      setStatus(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status, timer]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <Header navigation={navigation} />
        <LoginContainer>
          <View>
            <CustomText>E-mail</CustomText>
            <CustomInput value={email} onChangeText={(text) => setEmail(text)} />
            {errorRes?.errEmail && <Text style={{ color: '#FF1E1E' }}> {errorRes.errEmail}</Text>}
          </View>
          {status ? (
            <>
              <CustomButtonDisabled>
                <CustomText>Отправить код для восстановления пароля</CustomText>
              </CustomButtonDisabled>
              <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>
                Осталось времени: {timer} сек
              </Text>
            </>
          ) : (
            <CustomButtonActive onPress={() => sendOTPforResetPassword()}>
              <CustomText>Отправить код для восстановления пароля</CustomText>
            </CustomButtonActive>
          )}
        </LoginContainer>
      </View>
    </>
  );
};
