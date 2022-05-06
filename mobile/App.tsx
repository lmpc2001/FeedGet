import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { theme } from './src/theme';
import Widget from './src/components/Widget';

import { preventAutoHideAsync } from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>
      <Widget />
      <StatusBar
        style="light"
        backgroundColor='transparent'
        translucent
      />
    </View>
  );
}
