import React, { useRef } from 'react';

import { TouchableOpacity, StyleSheet, Text, View, Animated } from 'react-native';
import { hp, wp } from '../../../../resnponsive';

import CardCreditIcon from './../../../../assets/currentLoans/cardCreditIcon.svg';
import PlusIcon from './../../../../assets/currentLoans/plus.svg';
import ArrowIcon from './../../../../assets/currentLoans/arrow.svg';

export const CurrentLoans = () => {
  const [show, setShow] = React.useState(true);

  const heightAnimated = useRef(new Animated.Value(hp(90))).current;

  const handleHidden = () => {
    if (show) {
      Animated.timing(heightAnimated, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
      return setShow(false);
    }
    Animated.timing(heightAnimated, {
      toValue: hp(90),
      duration: 150,
      useNativeDriver: false,
    }).start();
    return setShow(true);
  };

  return (
    <>
      <View style={styles.loanHeader}>
        <TouchableOpacity
          onPress={() => handleHidden()}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: heightAnimated.interpolate({
                    inputRange: [0, hp(90)],
                    outputRange: ['-90deg', '0deg'],
                  }),
                },
              ],
            }}>
            <ArrowIcon />
          </Animated.View>
          <Text style={styles.currentLoans}>КРЕДИТЫ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLoan}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
      <Animated.View style={{ overflow: 'hidden', height: heightAnimated }}>
        <TouchableOpacity style={styles.itemCurrentLoan}>
          <View style={styles.iconContainer}>
            <CardCreditIcon stroke="black" />
          </View>
          <View>
            <Text style={styles.accountNumber}>Кредит Nº 38745825</Text>
            <Text style={styles.accountExpires}>Срок кредита 12/22/2023</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.accountNumber}>530 000 тг</Text>
            <Text style={styles.accountExpires}>Rate 22.5%</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
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
  buttonLoan: {
    backgroundColor: '#3D3B3E',
    height: hp(20),
    width: hp(20),
    borderRadius: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  itemCurrentLoan: {
    width: wp(335),
    backgroundColor: '#212121',
    paddingTop: hp(22),
    paddingBottom: hp(22),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    opacity: 0.7,
    marginTop: hp(12),
    borderRadius: hp(26),
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#B2D0CE',
    height: hp(32),
    width: hp(32),
    borderRadius: hp(12),
    marginRight: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountNumber: {
    color: 'white',
    fontSize: hp(17),
    lineHeight: hp(18),
  },
  accountExpires: {
    color: '#79767D',
    fontSize: hp(14),
    lineHeight: hp(16),
  },
  value: {
    position: 'absolute',
    right: wp(20),
    alignItems: 'flex-end',
  },
});
