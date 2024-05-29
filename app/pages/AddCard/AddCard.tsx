import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios.js';
import { useZustand } from '../../zustand.js';
import { LoginContainer, CustomInput, CustomButtonActive, CustomText } from './styles';
import { Header } from '../../components/Header/Header';
import { View, Text } from 'react-native';
import { EyeOffIcon, EyeIcon, CheckIcon } from 'lucide-react-native';
import { hp, wp } from '../../../resnponsive.js';
import { RadioButton } from 'react-native-paper';

export const AddCard = ({ navigation }) => {
  const [cardType, setCardType] = React.useState('Premium');
  const [wrongData, setWrongData] = useState('');

  const onSubmit = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const { data } = await axios.post(
        '/cards/create',
        {
          cardName: cardType,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      if (data.status === 'OK') {
        navigation.navigate('Home');
      }
    } catch (error) {
      setWrongData(error.response?.data?.message);
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#000000' }}>
        <LoginContainer>
          <View>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
              onPress={() => setCardType('Premium')}>
              <RadioButton
                value="Premium"
                color="#004e96"
                status={cardType === 'Premium' ? 'checked' : 'unchecked'}
              />
              <Text style={{ color: '#fff', fontSize: 17 }}>Premium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
              onPress={() => setCardType('Standart')}>
              <RadioButton
                value="Standart"
                color="#004e96"
                status={cardType === 'Standart' ? 'checked' : 'unchecked'}
              />
              <Text style={{ color: '#fff', fontSize: 17 }}>Standart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}
              onPress={() => setCardType('Deposit')}>
              <RadioButton
                value="Deposit"
                color="#004e96"
                status={cardType === 'Deposit' ? 'checked' : 'unchecked'}
              />
              <Text style={{ color: '#fff', fontSize: 17 }}>Deposit</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#ff0000', fontSize: 17 }}>{wrongData}</Text>
          <CustomButtonActive onPress={() => onSubmit()}>
            <CustomText>Открыть карту</CustomText>
          </CustomButtonActive>
        </LoginContainer>
      </View>
    </>
  );
};
