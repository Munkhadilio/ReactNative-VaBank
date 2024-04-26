import React from 'react';
import { View, Button, StatusBar, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { HeaderContainer, RoundedButton, LogoContainer, ExitButton } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LogoSVG } from '../../styles/styleComponents';

type RootStackParamList = {
  StartMenu: undefined;
  Home: undefined;
  Settings: undefined;
};

type HeaderProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

type RouteType = RouteProp<RootStackParamList, keyof RootStackParamList>;

export const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const route = useRoute<RouteType>();

  return (
    <HeaderContainer style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      {route.name === 'StartMenu' || route.name === 'Home' ? null : (
        <RoundedButton style={styles.components} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon="arrow-left" size={25} color="#000" />
        </RoundedButton>
      )}
      <LogoContainer style={styles.components}>
        <LogoSVG />
      </LogoContainer>
      {route.name === 'Home' ? (
        <ExitButton style={styles.components} onPress={() => navigation.navigate('Settings')}>
          <FontAwesomeIcon icon="bars" size={32} color="#ffffff" />
        </ExitButton>
      ) : null}
    </HeaderContainer>
  );
};

const statusBarHeight = Platform.OS === 'ios' ? 38 : StatusBar.currentHeight;
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  components: {
    top: statusBarHeight + 10,
  },
});
