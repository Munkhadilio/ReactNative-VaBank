import { Header } from '../../components/Header/Header';
import { LogoSVG } from '../../styles/styleComponents';
import {
  Container,
  LoginButton,
  RegisterButton,
  LoginButtonText,
  RegisterButtonText,
} from './styles';

export const StartMenu: React.FC<any> = ({ navigation }) => {
  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <LogoSVG />
        <LoginButton onPress={() => navigation.navigate('Login')}>
          <LoginButtonText>Войти</LoginButtonText>
        </LoginButton>
        <RegisterButton onPress={() => navigation.navigate('Registration')}>
          <RegisterButtonText>Стать клиентом банка</RegisterButtonText>
        </RegisterButton>
      </Container>
    </>
  );
};
