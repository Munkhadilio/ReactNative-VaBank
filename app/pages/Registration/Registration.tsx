import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
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
import { useRoute } from '@react-navigation/native';
import { Header } from './../../components/Header/Header';
import { RadioButton } from 'react-native-paper';
import { View } from 'react-native';
import { EyeOffIcon, EyeIcon, CheckIcon } from 'lucide-react-native';

interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface IRoute {
  name: string;
}

export const Registration = ({ navigation }) => {
  const route: IRoute = useRoute();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: 'male',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

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

  const userState = useZustand((state) => state.userState);
  const addUser = useZustand((state) => state.addUser);
  const validationResults = validatePassword(formData.password);

  const onSubmit = async () => {
    try {
      if (
        !validationResults.isLengthValid ||
        !validationResults.hasSpecialCharacters ||
        !validationResults.hasUpperCase
      ) {
        return;
      }

      const { data } = await axios.post('/auth/send-otp', {
        email: formData.email,
        forPage: route.name,
      });

      const userPayload: IUser = formData;

      if (data.success && data.forPage) {
        await addUser(userPayload);
        navigation.navigate('OTP', { haveAccount: false, forPage: data.forPage });
      } else if (!data) {
        console.log('No data');
      }
    } catch (error) {
      console.log(error);
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
          </View>

          <View>
            <CustomText>Номер телефона</CustomText>
            <CustomInput
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
            />
          </View>

          <View>
            <CustomText>Пароль</CustomText>

            <CustomInput
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => {
                handleInputChange('password', text);
              }}
            />
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
