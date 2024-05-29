import { PaperProvider } from 'react-native-paper';
import { Navigation } from './app/Navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, View } from 'react-native';

export default function App() {
  library.add(fas);

  return (
    <PaperProvider>
      <View style={styles.background}>
        <Navigation />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000',
  },
});
