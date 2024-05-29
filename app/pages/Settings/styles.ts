import { Text, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  width: 100%;
  background-color: #000;
  display: flex;
  flex: 1;
  justify-content: center; /* Центрируем содержимое по вертикали */
  align-items: center; /* Центрируем содержимое по горизонтали */
`;

export const Menu = styled(View)`
  display: flex;
  align-items: start; /* Центрируем содержимое по горизонтали */
  flex-direction: column;
  gap: 20px;
`;

export const MenuItem = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const MenuItemLabel = styled(Text)`
  color: #fff;
  font-size: 20px;
`;
