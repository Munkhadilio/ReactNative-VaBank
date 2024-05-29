import React, { useEffect, useState } from 'react';

import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../../../../resnponsive';
import VisaLogo from './../../../../assets/visaLogo.svg';

const cardColors = {
  Premium: ['rgba(252, 255, 223, 1)', 'rgba(241, 254, 135, 1)'],
  Standart: ['rgba(234, 234, 234, 1)', 'rgba(178, 208, 206, 1)'],
  Deposit: ['rgba(242, 239, 244, 1)', 'rgba(184, 169, 198, 1)'],
};

export const CardCredit: React.FC<any> = ({ cards }) => {
  const navigation = useNavigation();
  const handleNavigation = (cardName, id) => {
    navigation.navigate('MyCards', { cardName, id });
  };

  return (
    <>
      {cards &&
        cards.map((card, id) => (
          <>
            <TouchableOpacity
              key={id}
              activeOpacity={0.9}
              onPress={() => handleNavigation(card.cardName, id)}>
              <LinearGradient
                colors={cardColors[card.cardName] || ['#4c669f', '#3b5998']}
                style={[styles.container, { marginLeft: id === 0 ? wp(20) : 0 }]}>
                <>
                  <VisaLogo />
                  <View>
                    <Text style={styles.typeCard}>{card.cardName}</Text>
                    <Text style={styles.cardHolderName}>{card.cardHolderName}</Text>
                  </View>
                  <Text style={styles.cardNumber}>{card.last4Digits}</Text>
                </>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ))}
      {cards ? (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('AddCard')}>
          <LinearGradient colors={['#55bae6', '#1b60f7']} style={styles.container}>
            <Text style={styles.typeCard}>Открыть карту</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('AddCard')}>
          <LinearGradient
            colors={['#55bae6', '#1b60f7']}
            style={[styles.container, { marginLeft: wp(20) }]}>
            <Text style={styles.typeCard}>Открыть карту</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
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
    fontSize: hp(19),
    color: '#000000',
    lineHeight: hp(24),
    fontWeight: '700',
  },
  cardNumber: {
    fontSize: hp(14),
    color: 'rgba(39, 42, 50, 1)',
    lineHeight: hp(14),
    letterSpacing: 0.8,
  },
  cardHolderName: {
    marginTop: hp(14),
    fontSize: hp(14),
    color: 'rgba(39, 42, 50, 1)',
    lineHeight: hp(14),
    letterSpacing: 0.8,
    width: wp(120),
    flexWrap: 'wrap',
  },
});
