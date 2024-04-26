/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';

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
import { dataCard } from '../../services/data';

// components
import { CardCredit } from './cardCredit';
import { CurrentLoans } from './currentLoans';
import { CardFinances } from './cardFinances';
import { Index as CurrenciesAndMetal } from './currenciesAndMetal';

// assets
import StarIcon from './../../../assets/starIcon.svg';
import BudgetIcon from './../../../assets/budgetIcon.svg';
import FinanceIcon from './../../../assets/financeIcon.svg';

export const Home: React.FC<any> = ({ navigation }) => {
  const ref = useRef();

  return (
    <>
      <Header navigation={navigation} />
      <Animated.ScrollView
        style={styles.background}
        showsVerticalScrollIndicator={false}
        ref={ref}
        bounces={false}>
        <View style={styles.userContainer}>
          <Image style={styles.avatar} source={require('./../../../assets/avatar.png')} />
          <Text style={styles.username}>Adilzhan</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.textBalance}>Ваш счет</Text>
          <Text style={styles.textMoney}>$ 7,896</Text>
        </View>
        <FlatList
          data={dataCard}
          renderItem={(data) => <CardCredit {...data.item} />}
          style={{ marginTop: hp(20), height: hp(170) }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
              routeName="AnatlicalFinances"
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
    height: hp(50),
    marginTop: hp(24),
    justifyContent: 'center',
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
    width: wp(40),
    height: hp(40),
    marginRight: wp(10),
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
