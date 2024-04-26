import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import axios from '../../axios.js';
import { useZustand } from '../../zustand.js';
import { LoginContainer, CustomInput, CustomButtonActive, CustomText } from './styles';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../components/Header/Header';
import { View } from 'react-native';
import { EyeOffIcon, EyeIcon, CheckIcon } from 'lucide-react-native';

interface IUser {
  email: string;
  password: string;
}

interface IRoute {
  name: string;
}

export const Login = ({ navigation }) => {
  const route: IRoute = useRoute();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const userState = useZustand((state) => state.userState);
  const addUser = useZustand((state) => state.addUser);

  const onSubmit = async () => {
    try {
      const { data } = await axios.post('/auth/send-otp', {
        email: formData.email,
        forPage: route.name,
      });

      const userPayload: IUser = formData;

      if (data.success) {
        await addUser(userPayload);
        navigation.navigate('OTP', { haveAccount: true, forPage: data.forPage });
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
            <CustomText>E-mail</CustomText>
            <CustomInput
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
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

          <CustomButtonActive onPress={() => onSubmit()}>
            <CustomText>Создать аккаунт</CustomText>
          </CustomButtonActive>
        </LoginContainer>
      </ScrollView>
    </>
  );
};
