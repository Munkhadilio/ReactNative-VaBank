import React, { useState, useEffect } from 'react';
import axios from '../../axios.js';
import { useZustand } from '../../zustand';
import { Container, Menu, MenuItem, MenuItemLabel } from './styles';
import { Switch } from 'react-native-paper';
import { LogOut, CircleHelp, ScanFace, KeyRound, LockKeyhole } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Settings = ({ navigation }) => {
  const [biometric, setBiometric] = useState(false);
  const [mfa, setMFA] = useState(false);
  const userState = useZustand((state) => state.userState);

  useEffect(() => {
    const getBiometric = async () => {
      try {
        const value = await AsyncStorage.getItem('Biometric');
        if (value === 'true') {
          setBiometric(true);
        } else if (value === 'false') {
          setBiometric(false);
        }
      } catch (error) {
        console.error('Error reading biometric setting from AsyncStorage:', error);
      }
    };

    const fetchMFA = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const { data } = await axios.get('/user/mfa/status', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (data?.data.user.mfa) {
          setMFA(data?.data.user.mfa);
        }
      } catch (error) {
        console.error('Error set 2FA:', error);
      }
    };

    getBiometric();
    fetchMFA();
  }, []);

  const BiometricSet = async (biometric) => {
    setBiometric(biometric);
    const biometricString = biometric.toString();
    await AsyncStorage.setItem('Biometric', biometricString);
  };

  const MFASet = async (mfa) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const { data } = await axios.patch(
      '/user/mfa/set',
      { email: userState.email },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const mfaStatus = data?.data.user.mfa;
    setMFA(mfaStatus);
  };

  const exit = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('Biometric');
    await AsyncStorage.removeItem('profile');
    await navigation.navigate('StartMenu');
  };

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <Menu>
          <MenuItem>
            <ScanFace color="white" size={28} />
            <MenuItemLabel>Face ID, TouchID</MenuItemLabel>
            <Switch value={biometric} onValueChange={() => BiometricSet(!biometric)} />
          </MenuItem>

          <MenuItem>
            <KeyRound color="white" size={28} />
            <MenuItemLabel>2FA</MenuItemLabel>
            <Switch value={mfa} onValueChange={() => MFASet(!mfa)} />
          </MenuItem>

          <TouchableOpacity>
            <MenuItem>
              <CircleHelp color="white" size={28} />
              <MenuItemLabel>Тех поддержка</MenuItemLabel>
            </MenuItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <MenuItem>
              <LockKeyhole color="white" size={28} />
              <MenuItemLabel>Сменить пароль</MenuItemLabel>
            </MenuItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => exit()}>
            <MenuItem>
              <LogOut color="white" size={28} />
              <MenuItemLabel>Выход</MenuItemLabel>
            </MenuItem>
          </TouchableOpacity>
        </Menu>
      </Container>
    </>
  );
};
