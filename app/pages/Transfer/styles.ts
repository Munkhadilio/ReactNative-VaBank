import { backgroundColor } from '../../styles/styleVar';
import styled from 'styled-components';
import { View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { hp } from '../../../resnponsive';

export const LoginContainer = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor};
  gap: 10px;
`;

export const CustomInput = styled(TextInput)`
  width: 324px;
  height: 35px;
  padding-left: 10px;
  background-color: #000;
  border-bottom-width: 1px; /* Указываем ширину нижней границы */
  border-bottom-color: #fff; /* Указываем цвет нижней границы */
  font-size: ${hp(17)}px;
  color: #fff;
  border-radius: 0px;
`;

export const MoneyInput = styled(TextInput)`
  padding-left: 10px;
  background-color: #000;
  border: none;
  color: #fff;
  font-size: ${hp(40)}px;
  border-radius: 0;
`;

export const MoneyText = styled(Text)`
  color: #fff;
  padding-left: 10px;
  font-size: ${hp(40)}px;
`;

export const CustomButtonActive = styled(Button)`
  margin-top: 20px;
  padding: 3px;
  max-width: 100%;
  background-color: #004e96;
`;

export const CustomButtonDisabled = styled(Button)`
  margin-top: 20px;
  padding: 2px;
  max-width: 100%;
  background-color: #363339;
`;

export const ValidationIndicators = styled(View)`
  display: 'flex';
  margin-top: 20px;
  flex-direction: 'column';
  gap: 5px;
  justify-content: center;
  width: 320px;
`;

export const ValidationIndicatorsItem = styled(View)`
  color: #fff;
  display: flex;
  flex-direction: row;
`;

export const ValidationIndicatorsText = styled(Text)`
  flex-wrap: wrap;
  color: #fff;
`;

export const CustomText = styled(Text)`
  color: #fff;
`;

export const RadioGroup = styled(View)`
  display: flex;
  flex-direction: row;
  color: #fff;
`;

export const RadioGroupItem = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
