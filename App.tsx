import { Button } from 'react-native';
import './global.css';
import ThemeProvider, { useTheme } from './src/Providers/ThemeProvider';
import ThemeText from './src/Providers/ThemeProvider/Components/ThemeText';
import ThemeView from './src/Providers/ThemeProvider/Components/ThemeView';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeView useWindBackground className="flex-1 items-center justify-center bg-red-100">
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
    </ThemeProvider>
  );
}


function ToggleTheme() {
  const {theme, setTheme} = useTheme()
  return (
    <Button
      title={theme}
      onPress={() => setTheme(theme === 'dark' ? 'light' : "dark")}
    />
  )
}