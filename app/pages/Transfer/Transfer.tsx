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
  phoneNumber: string;
  sum: string;
}

interface IRoute {
  name: string;
}

export const Transfer = ({ navigation }) => {
  const route: IRoute = useRoute();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    sum: '',
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
        email: formData.phoneNumber,
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
      <Header navigation={navigation} />
      <LoginContainer>
        <View>
          <CustomText>Номер телефона</CustomText>
          <CustomInput
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange('phoneNumber', text)}
          />
        </View>

        <View>
          <CustomText>Сумма</CustomText>
          <CustomInput
            value={formData.sum}
            keyboardType="numeric"
            onChangeText={(text) => {
              handleInputChange('sum', text);
            }}
          />
        </View>

        <CustomButtonActive onPress={() => onSubmit()}>
          <CustomText>Перевести</CustomText>
        </CustomButtonActive>
      </LoginContainer>
    </>
  );
};
