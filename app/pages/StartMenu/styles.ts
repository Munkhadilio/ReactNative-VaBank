import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #000;
`;

export const LoginButton = styled.TouchableOpacity`
  margin-top: 50px;
  border-radius: 34px;
  width: 324px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const LoginButtonText = styled.Text`
  color: #000;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
`;

export const RegisterButton = styled.TouchableOpacity`
  margin-top: 20px;
  border-radius: 34px;
  width: 324px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #363339;
`;

export const RegisterButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
`;
