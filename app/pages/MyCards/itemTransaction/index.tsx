import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ArrowDown from '../../../../assets/arrow-down.svg';
import { hp, wp } from '../../../../resnponsive';

interface IItemTransaction {
  title: string;
  value: string;
  shop: string;
  type: '+' | '-';
}

export default function ItemTransaction({ title, value, shop, type }: IItemTransaction) {
  return (
    <View style={styles.itemContainer}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: type === '+' ? '#F2FE8D' : '#B2D0CE',
          },
        ]}>
        <ArrowDown />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.transferText}>{title}</Text>
          <Text style={styles.transferText}>{value}</Text>
        </View>
        <Text style={styles.textShop}>{shop}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: hp(32),
    width: hp(32),
    borderRadius: hp(16),
    backgroundColor: '#453F48',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(16),
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: hp(17),
  },
  transferText: {
    fontSize: hp(17),
    color: 'white',
    lineHeight: hp(18),
  },
  textShop: {
    fontSize: hp(14),
    lineHeight: hp(18),
    letterSpacing: 0.8,
    color: '#79767D',
  },
  iconRotate: {
    transform: [{ rotate: '180deg' }],
  },
});
