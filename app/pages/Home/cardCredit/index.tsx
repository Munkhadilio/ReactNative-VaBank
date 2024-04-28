import React from 'react';

import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../../../../resnponsive';
import VisaLogo from './../../../../assets/visaLogo.svg';

export const CardCredit: React.FC<any> = ({ value, id, number, backgroundColor, typeCard }) => {
  const navigate = useNavigation();

  const HandleNavgation = () => {
    navigate.navigate('MyCards', { id });
  };

  const getMarginLeft = () => {
    if (id === '0') return wp(20);
    return 0;
  };

  const getMarginRight = () => {
    if (id === '2') return wp(20);
    return 0;
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => HandleNavgation()}>
      <LinearGradient
        colors={backgroundColor}
        style={[{ marginLeft: getMarginLeft(), marginRight: getMarginRight() }, styles.container]}>
        <VisaLogo />
        <View>
          <Text style={styles.typeCard}>{typeCard}</Text>
          <Text style={styles.money}>{value}</Text>
        </View>
        <Text style={styles.cardNumber}>{number}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(170),
    width: wp(148),
    paddingTop: hp(24),
    paddingBottom: hp(24),
    paddingLeft: wp(16),
    backgroundColor: 'blue',
    borderRadius: hp(30),
    justifyContent: 'space-between',
    marginRight: wp(13),
  },
  typeCard: {
    fontSize: hp(14),
    color: 'rgba(39, 42, 50, 1)',
    lineHeight: hp(14),
    letterSpacing: 0.8,
  },
  money: {
    fontSize: hp(19),
    color: 'rgba(39, 42, 50, 1)',
    lineHeight: hp(24),
    fontWeight: '700',
  },
  cardNumber: {
    fontSize: hp(14),
    color: 'rgba(39, 42, 50, 1)',
    lineHeight: hp(14),
    letterSpacing: 0.8,
  },
});
