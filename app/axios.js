import axios from 'axios';
import config from './config';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: `${config.API_BASE_URL}`,
});

instance.interceptors.request.use(async (config) => {
  // Получение токена из хранилища
  let accessToken = null;
  if (Platform.OS === 'web') {
    // Если это веб-версия, используйте localStorage
    accessToken = localStorage.getItem('accessToken');
  } else {
    accessToken = await AsyncStorage.getItem('accessToken');
  }

  // Установка токена в заголовке
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default instance;
