import React from 'react';
import BouncingPreloader from 'react-native-bouncing-preloaders';
import { hp } from '../../resnponsive';
import { Text, View, StyleSheet } from 'react-native';

export const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Загрузка...</Text>
      <View style={{ position: 'absolute', top: hp(500) }}>
        <BouncingPreloader
          icons={[require('../../assets/splash/logo.png'), null]}
          leftRotation="-680deg"
          rightRotation="360deg"
          leftDistance={-200}
          rightDistance={0}
          speed={1888}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  paragraph: {
    position: 'absolute',
    bottom: 30,
    color: '#fff',
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
