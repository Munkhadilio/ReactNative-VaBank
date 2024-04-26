/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Animated } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { hp, wp } from '../../../../resnponsive';

import VisaLogo from '../../../../assets/visaLogo.svg';
import ChipLogo from '../../../../assets/chip.svg';
import { dataCard, dataProps } from '../../../services/data';

const { width } = Dimensions.get('window');

export default function Index({ id }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const refScrollX = useRef<FlatList>();

  useEffect(() => {
    refScrollX.current?.scrollToOffset({
      offset: Number(id) * width,
      animated: false,
    });
  });

  return (
    <View style={{ height: hp(220), marginTop: hp(112) }}>
      <FlatList
        horizontal
        ref={refScrollX as React.LegacyRef<FlatList<dataProps>>}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        bounces={false}
        data={dataCard}
        renderItem={(data) => <CardCredit {...data.item} />}
        keyExtractor={(data) => data.id}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

function CardCredit({ name, number, valid, value, backgroundColor }: dataProps) {
  return (
    <View style={{ width, alignItems: 'center' }}>
      <LinearGradient style={styles.cardContainer} colors={backgroundColor}>
        <View style={styles.visaLogoContainer}>
          <VisaLogo height={hp(47)} width={hp(47)} />
          <Text style={styles.visaLogoValueText}>{value}</Text>
        </View>
        <View>
          <View style={styles.chipContainer}>
            <ChipLogo />
            <Text style={styles.validTextOrExpire}>VALID THRU</Text>
          </View>
          <View style={styles.visaLogoContainer}>
            <Text style={styles.numberCard}>•••• •••• •••• {number}</Text>
            <Text style={styles.validTextOrExpire}>{valid}</Text>
          </View>
        </View>
        <Text style={styles.validTextOrExpire}>{name}</Text>
      </LinearGradient>
    </View>
  );
}

interface IndicatorProps {
  scrollX: Animated.Value;
}

function Indicator({ scrollX }: IndicatorProps) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {dataCard.map((_, index) => {
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
            key={_.id}
            style={{
              backgroundColor,
              height: hp(3),
              width: hp(3),
              margin: wp(6),
              borderRadius: hp(1.5),
              transform: [
                {
                  scale,
                },
              ],
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
