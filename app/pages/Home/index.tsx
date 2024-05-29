/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../../components/Header/Header';
import Span from '../../components/span';
import { hp, wp } from '../../../resnponsive';
import axios from './../../axios';
// components
import { CardCredit } from './cardCredit';
import { CurrentLoans } from './currentLoans';
import { CardFinances } from './cardFinances';
import { Index as CurrenciesAndMetal } from './currenciesAndMetal';

// assets
import StarIcon from './../../../assets/starIcon.svg';
import BudgetIcon from './../../../assets/budgetIcon.svg';
import FinanceIcon from './../../../assets/financeIcon.svg';
import { useZustand } from './../../zustand';

export const Home: React.FC<any> = ({ navigation }) => {
  const ref = useRef();
  const [dataFetched, setDataFetched] = useState<any>({});
  const [cardList, setCardList] = useState([]);
  const zustand = useZustand();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          await zustand.getProfile(accessToken);
          const localUserState = zustand.getState().localUserState;
          await AsyncStorage.setItem('profile', JSON.stringify(localUserState.data.user));
          setDataFetched(localUserState.data.user);
        } catch (error) {
          console.error('Ошибка при получении профиля пользователя:', error);
        }
      };

      const fetchStorage = async () => {
        try {
          const profile = await AsyncStorage.getItem('profile');
          const retrievedProfile = JSON.parse(profile);
          setDataFetched(retrievedProfile);
        } catch (error) {
          console.error('Ошибка при получении профиля пользователя:', error);
        }
      };

      const fetchDataCards = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
          const { data } = await axios.get('/cards/list', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setCardList(data?.data?.cards);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };

      fetchData();
      fetchDataCards();
      fetchStorage();
    }, []),
  );

  return (
    <>
      <Header navigation={navigation} />
      <Animated.ScrollView
        style={styles.background}
        showsVerticalScrollIndicator={false}
        ref={ref}
        bounces={false}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.userContainer}>
            <Image style={styles.avatar} source={{ uri: dataFetched?.imgUrl }} />
            <Text style={styles.username}>
              {dataFetched?.lastName + ' ' + dataFetched?.firstName}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.balanceContainer}>
          {cardList.map((item, id) => (
            <View key={id}>
              {item.cardName !== 'Deposit' && (
                <>
                  <Text style={styles.textBalance}>{item.cardName}:</Text>
                  <Text style={styles.textMoney}>{item.balance} ₸</Text>
                </>
              )}
            </View>
          ))}
        </View>
        <ScrollView style={{ marginTop: hp(20) }} horizontal showsHorizontalScrollIndicator={false}>
          <CardCredit cards={cardList} />
        </ScrollView>
        <Text style={styles.textFinance}>ФИНАНСЫ</Text>
        <View>
          <ScrollView
            style={{ marginTop: hp(12) }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <CardFinances
              title="Мои бонусы"
              routeName="MyBonuses"
              navigation={navigation}
              Icon={StarIcon}
              backgroundColor="rgba(242, 254, 141, 1)"
              first
            />

            <CardFinances
              title="Переводы"
              routeName="Transfers"
              navigation={navigation}
              Icon={BudgetIcon}
              backgroundColor="rgba(178, 208, 206, 1)"
            />

            <CardFinances
              title="Фин. аналитика"
              routeName=""
              navigation={navigation}
              Icon={FinanceIcon}
              backgroundColor="rgba(170, 158, 183, 1)"
            />
          </ScrollView>
        </View>
        <View style={styles.actionSheetContainer}>
          <CurrentLoans />
          <Span />
          <CurrenciesAndMetal scrollRef={ref} />
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
    marginTop: hp(24),
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: hp(5),
  },
  textBalance: {
    color: 'white',
    fontSize: hp(17),
  },
  textMoney: {
    color: 'white',
    fontWeight: '700',
    fontSize: hp(27),
  },
  userContainer: {
    width: '100%',
    paddingLeft: wp(20),
    paddingRight: wp(20),
    marginTop: hp(24),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(50),
    height: hp(50),
    marginRight: wp(10),
    borderRadius: 100,
  },
  username: {
    color: 'white',
    fontWeight: '700',
    // fix
    fontSize: hp(17),
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
