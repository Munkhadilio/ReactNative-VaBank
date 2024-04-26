import { backgroundColor } from '../../styles/styleVar';
import { View, TouchableOpacity, Text } from 'react-native';
import { wp, hp } from '../../../resnponsive';
import styled from 'styled-components';

export const Container = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${backgroundColor};
`;

export const CustomButton = styled(TouchableOpacity)`
  border-radius: 34px;
  width: 324px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const CustomTextButton = styled(Text)`
  color: #1a91ff;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
`;
