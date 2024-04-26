import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  height: 80px;
  display: flex;
  flex-direction: row;
  background-color: #000;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const RoundedButton = styled(TouchableOpacity)`
  left: 0;

  position: absolute;
  border-radius: 20px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExitButton = styled(TouchableOpacity)`
  right: 0;
  position: absolute;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled(View)`
  position: absolute;
`;
