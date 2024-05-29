import { backgroundColor } from '../../styles/styleVar';
import styled from 'styled-components';
import { View } from 'react-native';

export const Container = styled(View)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor};
`;

export const ButtonContainer = styled(View)`
  display: flex;
  gap: 20px;
  flex-direction: row;
  margin: 0 auto;
`;
