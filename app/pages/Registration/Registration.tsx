import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import axios from '../../axios.js';
import { useZustand } from '../../zustand.js';
import {
  LoginContainer,
  CustomInput,
  CustomButtonActive,
  CustomButtonDisabled,
  ValidationIndicators,
  ValidationIndicatorsItem,
  ValidationIndicatorsText,
  CustomText,
  RadioGroup,
  RadioGroupItem,
} from './styles';
import { Header } from './../../components/Header/Header';
import { RadioButton, Modal, Portal, Text } from 'react-native-paper';
import { View } from 'react-native';
import { hp } from '../../../resnponsive.js';
import { EyeOffIcon, EyeIcon, CheckIcon } from 'lucide-react-native';

interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export const Registration = ({ navigation }) => {
  const [formData, setFormData] = useState<IUser>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrorRes('');
  };

  //State
  const [errorRes, setErrorRes] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [validationPassword, setValidationPassword] = useState(false);

  useEffect(() => {
    if (
      validationResults.isLengthValid &&
      validationResults.hasSpecialCharacters &&
      validationResults.hasUpperCase
    ) {
      setValidationPassword(true);
    } else {
      setValidationPassword(false);
    }
  }, [formData.password]);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const validatePassword = (password) => {
    const isLengthValid = password.length >= 8;
    // !"#$%&'()*+,-./:;<=>?@[]^_`{}|~
    const hasSpecialCharacters = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    return {
      isLengthValid,
      hasSpecialCharacters,
      hasUpperCase,
    };
  };

  const validationResults = validatePassword(formData.password);
  const addUser = useZustand((state) => state.addUser);

  const onSubmit = async () => {
    try {
      if (
        !validationResults.isLengthValid ||
        !validationResults.hasSpecialCharacters ||
        !validationResults.hasUpperCase
      ) {
        return;
      }

      const { data } = await axios.post('/user/register', {
        ...formData,
      });

      if (data.userDto.enabled === false) {
        await addUser(data);
        navigation.navigate('OTP', { register: true });
      }
    } catch (error) {
      if (error.response.data) {
        setErrorRes(error.response.data);
      } else {
        console.log('err');
      }
    }
  };

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#000000' }}>
        <Header navigation={navigation} />

        <LoginContainer>
          <View>
            <CustomText>Имя</CustomText>
            <CustomInput
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
          </View>

          <View>
            <CustomText>Фамилия</CustomText>
            <CustomInput
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />
          </View>

          <RadioButton.Group
            onValueChange={(text) => handleInputChange('gender', text)}
            value={formData.gender}>
            <RadioGroup>
              <RadioGroupItem>
                <CustomText>М</CustomText>
                <RadioButton value="male" />
              </RadioGroupItem>
              <RadioGroupItem>
                <CustomText>Ж</CustomText>
                <RadioButton value="female" />
              </RadioGroupItem>
            </RadioGroup>
          </RadioButton.Group>

          <View>
            <CustomText>E-mail</CustomText>
            <CustomInput
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
            {errorRes?.errEmail && <Text style={{ color: '#FF1E1E' }}> {errorRes.errEmail}</Text>}
          </View>

          <View>
            <CustomText>Номер телефона</CustomText>
            <CustomInput
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
            />
            {errorRes?.errPhone && <Text style={{ color: '#FF1E1E' }}> {errorRes.errPhone}</Text>}
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
          </View>

          <ValidationIndicators>
            <ValidationIndicatorsItem>
              {validationResults.isLengthValid ? (
                <CheckIcon color="green" size={24} />
              ) : (
                <CheckIcon color="white" size={24} />
              )}
              <ValidationIndicatorsText>
                Пароль должен содержать не менее 8 символов
              </ValidationIndicatorsText>
            </ValidationIndicatorsItem>

            <ValidationIndicatorsItem>
              {validationResults.hasSpecialCharacters ? (
                <CheckIcon color="green" size={24} />
              ) : (
                <CheckIcon color="white" size={24} />
              )}
              <ValidationIndicatorsText>
                Пароль должен содержать специальные символы
              </ValidationIndicatorsText>
            </ValidationIndicatorsItem>

            <ValidationIndicatorsItem>
              {validationResults.hasUpperCase ? (
                <CheckIcon color="green" size={24} />
              ) : (
                <CheckIcon color="white" size={24} />
              )}
              <ValidationIndicatorsText>
                Пароль должен содержать хотя бы одну заглавную букву
              </ValidationIndicatorsText>
            </ValidationIndicatorsItem>
          </ValidationIndicators>
          {validationPassword ? (
            <CustomButtonActive onPress={() => onSubmit()}>
              <CustomText>Создать аккаунт</CustomText>
            </CustomButtonActive>
          ) : (
            <CustomButtonDisabled onPress={() => onSubmit()}>
              <CustomText>Создать аккаунт</CustomText>
            </CustomButtonDisabled>
          )}
        </LoginContainer>
      </ScrollView>
    </>
  );
};
