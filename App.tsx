import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeText from './src/Stores/Theme/Components/ThemeText';
import { View } from 'react-native';

import './global.css';


export default function App() {
  return (
    <SafeAreaProvider>
      <View className='flex-1 items-center justify-center' >
        <ThemeText className='text-lg' >Hello World</ThemeText>
      </View>
    </SafeAreaProvider>
  );
}