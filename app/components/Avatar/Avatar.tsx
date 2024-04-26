import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { hp, wp } from './../../../resnponsive';

export default function Header(): JSX.Element {
  return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} source={require('./../../../assets/avatar.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: hp(10),
    paddingTop: hp(8),
    paddingBottom: hp(8),
    paddingLeft: wp(16),
    paddingRight: wp(16),
  },
  imageContainer: {
    position: 'absolute',
    left: wp(16),
  },
});
