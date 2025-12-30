import { Button } from 'react-native';
import './global.css';
import ThemeText from './src/Stores/Theme/Components/ThemeText';
import ThemeView from './src/Stores/Theme/Components/ThemeView';
import { useThemeHandlers, useThemeStore } from './src/Stores/Theme';
import RippleContainer from './src/Components/Core/RippleContainer';

export default function App() {
  return (
    <RippleContainer className='flex-1 items-center justify-center w-full' >
      <ThemeView useWindBackground className="flex-1 items-center justify-center w-full">
        <ToggleTheme/>
        <ThemeText color='primary' fontSize={8 * 2} className="text-4xl">
          Primary Text
        </ThemeText>
        <ThemeText color='secondary' fontSize={8 * 2} className="text-4xl">
          Secondary Text
        </ThemeText>
        <ThemeText color='error' fontSize={8 * 2} className="text-4xl">
          Error Text
        </ThemeText>
        <ThemeText color='info' fontSize={8 * 2} className="text-4xl">
          Info Text
        </ThemeText>
        <ThemeText color='warning' fontSize={8 * 2} className="text-4xl">
          Warning Text
        </ThemeText>
        
        <ThemeView color='primary'  className='w-full h-4' />
        <ThemeView color='secondary'  className='w-full h-4' />
        <ThemeView color='error'  className='w-full h-4' />
        <ThemeView color='info'  className='w-full h-4' />
        <ThemeView color='warning'  className='w-full h-4' />
      </ThemeView>
    </RippleContainer>
  );
}


function ToggleTheme() {
  const theme = useThemeStore(S => S.theme)
  const {toggleTheme} = useThemeHandlers();
  return (
    <Button
      title={theme}
      onPress={toggleTheme}
    />
  )
}