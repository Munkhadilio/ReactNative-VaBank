import React, { useState, useEffect } from 'react';
import { Container, Menu, MenuItem, MenuItemLabel } from './styles';
import { Switch } from 'react-native-paper';
import { LogOut, CircleHelp, ScanFace } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Settings = ({ navigation }) => {
  const [biometric, setBiometric] = useState(false);

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
    getBiometric();
  }, []);

  const BiometricSet = async (biometric) => {
    setBiometric(biometric);
    const biometricString = biometric.toString();
    await AsyncStorage.setItem('Biometric', biometricString);
  };

  return (
    <>
      <Header navigation={navigation} />
      <Container>
        <Menu>
          <MenuItem>
            <ScanFace color="white" size={30} />
            <MenuItemLabel>Face ID, TouchID</MenuItemLabel>
            <Switch value={biometric} onValueChange={() => BiometricSet(!biometric)} />
          </MenuItem>

          <TouchableOpacity>
            <MenuItem>
              <CircleHelp color="white" size={30} />
              <MenuItemLabel>Тех поддержка</MenuItemLabel>
            </MenuItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('StartMenu')}>
            <MenuItem>
              <LogOut color="white" size={30} />
              <MenuItemLabel>Выход</MenuItemLabel>
            </MenuItem>
          </TouchableOpacity>
        </Menu>
      </Container>
    </>
  );
};
