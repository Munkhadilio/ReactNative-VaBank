import React, { useRef, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View, Animated, ScrollView } from 'react-native';
import { hp, wp } from '../../../../resnponsive';

import DolarIcon from './../../../../assets/dolarIcon.svg';
import EuroIcon from './../../../../assets/euroIcon.svg';
import MetalIcon from './../../../../assets/metalIcon.svg';
import ArrowIcon from './../../../../assets/arrow.svg';

const ItemCurrencie = ({ coin, Icon }) => {
  return (
    <TouchableOpacity style={styles.itemCurrencieContainer}>
      <View style={styles.containerCurrencieAndBuy}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.iconContainer}>
            <Icon />
          </View>
          <Text style={styles.textCoin}>{coin}</Text>
        </View>
        <Text style={styles.textCoin}>0</Text>
      </View>
      <View style={styles.containerSell}>
        <Text style={styles.textCoin}>0</Text>
      </View>
    </TouchableOpacity>
  );
};

const CurrenciesAndMetal: React.FC<any> = ({ title, typeCurrencies }) => {
  return (
    <View style={styles.currenciesContainer}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.containerCurrencieAndBuy}>
          <Text style={styles.currenciesTitle}>{title}</Text>
          <Text style={styles.currenciesTitle}>Купить</Text>
        </View>

        <View style={styles.textSellContainer}>
          <Text style={styles.currenciesTitle}>Продать</Text>
        </View>
      </View>
      {typeCurrencies === 'Currencie' ? (
        <>
          <ItemCurrencie coin="USD" Icon={DolarIcon} />
          <ItemCurrencie coin="EUR" Icon={EuroIcon} />
        </>
      ) : (
        <>
          <ItemCurrencie coin="GOLD" Icon={MetalIcon} />
          <ItemCurrencie coin="SILVER" Icon={MetalIcon} />
        </>
      )}
    </View>
  );
};

export const Index: React.FC<any> = ({ scrollRef }) => {
  const [show, setShow] = useState(true);

  const heightAnimated = useRef(new Animated.Value(hp(320))).current;

  const handleHidden = () => {
    Animated.timing(heightAnimated, {
      toValue: show ? 0 : hp(320),
      duration: show ? 250 : 0,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      !show && scrollRef.current?.scrollToEnd({ animated: true });
    }, 0);
    return setShow(!show);
  };

  return (
    <>
      <TouchableOpacity style={styles.loanHeader} onPress={() => handleHidden()}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: heightAnimated.interpolate({
                  inputRange: [0, hp(320)],
                  outputRange: ['-90deg', '0deg'],
                }),
              },
            ],
          }}>
          <ArrowIcon />
        </Animated.View>
        <Text style={styles.currentLoans}>ВАЛЮТЫ И МЕТАЛЛЫ</Text>
      </TouchableOpacity>
      <Animated.View style={[{ overflow: 'hidden', height: heightAnimated }]}>
        <CurrenciesAndMetal typeCurrencies="Currencie" title="Курсы валют" />
        <CurrenciesAndMetal typeCurrencies="Metals" title="Металлы" />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#B2D0CE',
    height: hp(32),
    width: hp(32),
    borderRadius: hp(12),
    marginRight: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  currenciesContainer: {
    backgroundColor: '#212121',
    opacity: 0.7,
    padding: wp(20),
    width: wp(335),
    marginTop: hp(12),
    borderRadius: hp(26),
  },
  currentLoans: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: hp(13),
    lineHeight: hp(14),
    letterSpacing: 0.3,
    marginLeft: wp(8),
  },
  currenciesTitle: {
    fontSize: hp(14),
    lineHeight: hp(16),
    color: '#79767D',
    marginBottom: hp(4),
  },
  textCoin: {
    fontSize: hp(17),
    color: 'white',
    lineHeight: hp(19),
  },
  itemCurrencieContainer: {
    flexDirection: 'row',
    marginTop: hp(8),
  },
  containerCurrencieAndBuy: {
    flexDirection: 'row',
    flex: 2.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerSell: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  textSellContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  loanHeader: {
    width: wp(335),
    marginTop: hp(31),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
