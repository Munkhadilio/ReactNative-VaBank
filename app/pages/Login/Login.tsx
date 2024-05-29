import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios.js';
import { useZustand } from '../../zustand.js';
import { LoginContainer, CustomInput, CustomButtonActive, CustomText } from './styles';
import { Header } from '../../components/Header/Header';
import { View, Text } from 'react-native';
import { EyeOffIcon, EyeIcon, CheckIcon } from 'lucide-react-native';
import { hp } from '../../../resnponsive.js';

export const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [wrongData, setWrongData] = useState('');

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const addUser = useZustand((state) => state.addUser);
  const userState = useZustand((state) => state.userState);

  const onSubmit = async () => {
    try {
      const { data } = await axios.post('/user/login', {
        email: formData.email,
        password: formData.password,
      });

      if (data?.userDto?.mfa === false) {
        await addUser(data);
        await AsyncStorage.setItem('accessToken', data.accessToken);
        navigation.navigate('BiometricAgreement');
      } else if (data.mfa === true) {
        await addUser(data);
        navigation.navigate('OTP', { login: true });
      }
    } catch (error) {
      if (error?.response.data.message) {
        setWrongData(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#000000' }}>
        <LoginContainer>
          <View>
            <CustomText>E-mail</CustomText>
            <CustomInput
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
            {wrongData && <Text style={{ color: '#FF1E1E' }}> {wrongData}</Text>}
          </View>

          <View>
            <CustomText>Пароль</CustomText>
            <View style={{ position: 'relative' }}>
              <CustomInput
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => {
                  handleInputChange('password', text);
                }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: [{ translateY: -hp(15) / 2 }],
                }}
                onPress={() => handleState()}>
                {showPassword ? (
                  <EyeOffIcon size={hp(15)} color="white" />
                ) : (
                  <EyeIcon size={hp(15)} color="white" />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordNotLogIn')}>
              <CustomText style={{ marginTop: 5 }}>Забыли пароль?</CustomText>
            </TouchableOpacity>
          </View>

          <CustomButtonActive onPress={() => onSubmit()}>
            <CustomText>Войти</CustomText>
          </CustomButtonActive>
        </LoginContainer>
      </View>
    </>
  );
};
