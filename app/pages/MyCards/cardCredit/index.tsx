/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { hp, wp } from '../../../../resnponsive';
import VisaLogo from '../../../../assets/visaLogo.svg';
import ChipLogo from '../../../../assets/chip.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../axios';

const { width } = Dimensions.get('window');

export interface dataProps {
  id: string;
  balance: string;
  cardExpiryDate: string;
  last4Digits: string;
  cardHolderName: string;
  cardName: string;
  backgroundColor?: string[];
}

const cardColors = {
  Premium: ['rgba(252, 255, 223, 1)', 'rgba(241, 254, 135, 1)'],
  Standart: ['rgba(234, 234, 234, 1)', 'rgba(178, 208, 206, 1)'],
  Deposit: ['rgba(242, 239, 244, 1)', 'rgba(184, 169, 198, 1)'],
};

export default function Index({ cardName, id }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const refScrollX = useRef<ScrollView>(null);
  const [dataCard, setDataCard] = useState<dataProps[]>([]);
  const [dataFullCard, setDataFullCard] = useState<dataProps | null>(null);

  useEffect(() => {
    if (refScrollX.current) {
      refScrollX.current.scrollTo({
        x: Number(id) * width,
        animated: false,
      });
    }
  }, [id]);

  useEffect(() => {
    const fetchDataCards = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      try {
        const { data } = await axios.get('/cards/list', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setDataCard(data?.data?.cards || []);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    const fetchDataFullCard = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      try {
        const { data } = await axios.get(`/cards/getfull?cardname=${cardName}`, {
          params: { cardName },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setDataFullCard(data?.data?.bankCard);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchDataCards();
    fetchDataFullCard();
  }, [id]);

  return (
    <View style={{ height: hp(220), marginTop: hp(112) }}>
      <ScrollView
        ref={refScrollX}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        {dataCard.map((item) => (
          <CardCredit key={item.id} {...item} />
        ))}
      </ScrollView>
      <Indicator scrollX={scrollX} dataCard={dataCard} />
    </View>
  );
}

function CardCredit({ cardHolderName, last4Digits, cardExpiryDate, balance, cardName }: dataProps) {
  const colors = cardColors[cardName] || ['#000000', '#000000'];

  return (
    <View style={{ width, alignItems: 'center' }}>
      <LinearGradient style={styles.cardContainer} colors={colors}>
        <View style={styles.visaLogoContainer}>
          <VisaLogo height={hp(47)} width={hp(47)} />
          <Text style={styles.visaLogoValueText}>{balance} ₸</Text>
        </View>
        <View>
          <View style={styles.chipContainer}>
            <ChipLogo />
            <Text style={styles.validTextOrExpire}>VALID THRU</Text>
          </View>
          <View style={styles.visaLogoContainer}>
            <Text style={styles.numberCard}>•••• •••• •••• {last4Digits}</Text>
            <Text style={styles.validTextOrExpire}>{cardExpiryDate}</Text>
          </View>
        </View>
        <Text style={styles.validTextOrExpire}>{cardHolderName}</Text>
      </LinearGradient>
    </View>
  );
}

interface IndicatorProps {
  scrollX: Animated.Value;
  dataCard: dataProps[];
}

function Indicator({ scrollX, dataCard }: IndicatorProps) {
  if (!dataCard || dataCard.length === 0) {
    return null; // Возвращаем null, если данных нет
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {dataCard.map((item, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [hp(2), hp(3.5), hp(2)],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#5D5662', '#EDFC74', '#5D5662'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={item.id}
            style={{
              backgroundColor,
              height: hp(3),
              width: hp(3),
              margin: wp(6),
              borderRadius: hp(1.5),
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: hp(184),
    width: wp(311),
    borderRadius: hp(20),
    paddingLeft: wp(30),
    paddingRight: wp(30),
    paddingTop: hp(20),
    paddingBottom: hp(20),
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
  visaLogoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visaLogoValueText: {
    fontSize: hp(21),
    letterSpacing: 0.8,
    lineHeight: hp(23),
    color: '#272A32',
    fontWeight: '700',
  },
  chipContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  validTextOrExpire: {
    fontSize: hp(11),
    letterSpacing: 0.3,
    lineHeight: hp(14),
    color: '#272A32',
    opacity: 0.4,
  },
  numberCard: {
    fontSize: hp(16),
    letterSpacing: 0.3,
    lineHeight: hp(22),
    color: '#272A32',
  },
});
