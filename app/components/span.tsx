import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { hp, wp } from '../../resnponsive';

import XIcon from './../../assets/span/x.svg';
import LightIcon from './../../assets/span/lightIcon.svg';

export default function Span(): JSX.Element {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <LinearGradient
        start={{ x: 0.7, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#B2D0CE', '#EAEAEA']}
        style={styles.startInvestingContainer}>
        <TouchableOpacity style={styles.closeSpan}>
          <XIcon />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.iconContainer}>
            <LightIcon />
          </View>
          <View>
            <Text style={styles.accountNumber}>Инвестировать прямо сейчас!</Text>
            <Text style={styles.accountExpires}>Защищенные сбережения и инвестиционные планы</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: hp(32),
    width: hp(32),
    borderRadius: hp(12),
    marginRight: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  accountNumber: {
    color: 'black',
    fontSize: hp(17),
    lineHeight: hp(18),
  },
  accountExpires: {
    color: '#262626',
    fontSize: hp(14),
    lineHeight: hp(16),
  },
  startInvestingContainer: {
    width: wp(335),
    paddingTop: hp(22),
    paddingBottom: hp(22),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    marginTop: hp(16),
    borderRadius: hp(26),
    flexDirection: 'row',
  },
  closeSpan: {
    position: 'absolute',
    top: hp(13),
    right: hp(14),
  },
});
