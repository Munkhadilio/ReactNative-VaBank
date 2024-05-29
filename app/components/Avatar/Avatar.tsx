import React, { useEffect, useState } from 'react';
import axios from './../../axios';
import * as ImagePicker from 'expo-image-picker';
import { Image, StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { hp, wp } from '../../../resnponsive';
import { format } from 'date-fns';
import { Header } from '../../components/Header/Header';
import { CustomInput, CustomText } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export const Avatar = ({ navigation }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const profile = await AsyncStorage.getItem('profile');
        const retrievedProfile = JSON.parse(profile);
        setUser(retrievedProfile);
      } catch (error) {
        console.error('Ошибка при получении профиля пользователя:', error);
      }
    };

    fetchStorage();
  }, []);

  const getFileName = (uri: string) => {
    return uri.split('/').pop();
  };

  const getFileExt = (uri: string) => {
    return uri.split('.').pop();
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!result.canceled) {
      const { uri } = result.assets[0];
      const fileName = getFileName(uri);
      const ext = getFileExt(uri);

      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        name: fileName,
        type: `image/${ext}`,
      } as unknown as Blob);

      try {
        const { data } = await axios.patch('/user/photo', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        const updatedProfile = { ...user, imgUrl: data.data.imageUrl };
        await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
        setUser(updatedProfile);
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <>
      <Header navigation={navigation} />
      <Animated.ScrollView
        style={styles.background}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => pickImageAsync()}>
            <Image style={styles.avatar} src={user?.imgUrl} />
          </TouchableOpacity>
          <Text style={styles.username}>{user?.lastName + ' ' + user?.firstName}</Text>
        </View>
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    flex: 1,
  },
  balanceContainer: {
    width: '100%',
    paddingLeft: wp(20),
    paddingRight: wp(20),
    height: hp(50),
    marginTop: hp(24),
    justifyContent: 'center',
  },
  userContainer: {
    width: '100%',
    paddingLeft: wp(20),
    paddingRight: wp(20),
    marginTop: hp(24),
    display: 'flex',
    flexDirection: 'column',
    gap: hp(20),
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(10),
  },
  dataContainer: {
    display: 'flex',
    width: width * 0.8,
    flexDirection: 'column',
    paddingLeft: wp(20),
    paddingRight: wp(20),
    marginTop: hp(24),
    gap: hp(20),
  },
  avatar: {
    width: wp(80),
    height: hp(80),
    marginRight: wp(10),
    borderRadius: 100,
  },
  username: {
    color: 'white',
    fontWeight: '700',
    fontSize: hp(19),
  },
  userText: {
    color: 'white',
    fontWeight: '500',
    fontSize: hp(18),
    flexWrap: 'wrap',
  },
  searchContainer: {
    height: hp(32),
    width: hp(32),
    backgroundColor: '#3E3E3E',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: wp(24),
    bottom: hp(1),
    borderRadius: hp(16),
  },
  scrollContainer: {
    marginTop: hp(20),
  },
  textFinance: {
    color: 'white',
    marginTop: hp(39),
    marginLeft: wp(20),
  },
  actionSheetContainer: {
    backgroundColor: '#252626',
    flex: 1,
    marginTop: hp(32),
    borderTopLeftRadius: hp(30),
    borderTopRightRadius: hp(30),
    alignItems: 'center',
    paddingBottom: hp(100),
    overflow: 'hidden',
  },
  loanHeader: {
    width: wp(335),
    marginTop: hp(31),
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLoans: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: hp(13),
    lineHeight: hp(14),
    letterSpacing: 0.3,
    marginLeft: wp(8),
  },
  circle: {
    height: hp(50),
    width: wp(50),
    backgroundColor: 'white',
    position: 'absolute',
  },
  blurContainer: {
    position: 'absolute',
    width: '100%',
    height: 50,
    bottom: 0,
  },
});
