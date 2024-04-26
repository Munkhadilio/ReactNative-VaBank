import React from 'react';
import { StyleSheet, View } from 'react-native';
import { wp } from '../../../resnponsive';
import { Header } from '../../components/Header/Header';
import CardCredit from './cardCredit';
import Transactions from './transactions';

export const MyCards = ({ route, navigation }) => {
  const { id } = route.params;
  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.background}>
        <CardCredit id={id} />
        <Transactions />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    right: wp(-20),
    top: -30,
  },
});
