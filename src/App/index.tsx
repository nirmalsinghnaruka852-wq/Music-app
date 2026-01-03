import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from '../Navigation';
import ThemeView from '@/Shared/Stores/Theme/Components/ThemeView';


export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}} >
        <SafeAreaProvider>
          <ThemeView className='flex-1' >
            <Navigation/>
          </ThemeView>
        </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}