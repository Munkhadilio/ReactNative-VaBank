import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #000;
`;

export const Button = styled(TouchableOpacity)`
  margin-top: 50px;
  border-radius: 34px;
  width: 324px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const ButtonText = styled(Text)`
  color: #000;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
`;
