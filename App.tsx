import './global.css';
import { Button } from 'react-native';
import ThemeProvider, { useTheme } from './src/Providers/ThemeProvider';
import ThemeText from './src/Providers/ThemeProvider/Components/ThemeText';
import ThemeView from './src/Providers/ThemeProvider/Components/ThemeView';
import createStore from './src/Store/Utils/createStore';

const {useStore, useHandlers} = createStore({
  states: {
    name: {
      first: '',
      last: ''
    },
    age: ''
  }, 

  handlers: {
    setName: (state, action: {first: string, last: string}) => {
      state.name.first = action.first;
      state.name.last = action.last;
    },
    setAge: (state, action: string) => {
      state.age = action;
    } 
  }
})

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
        <Test/>
        <Test2/>
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

function Test() {
  const {age} = useStore((state) => ({age: state.age}));


  // console.log({age})
  const {name: nameHandler, age: ageHandler} = useHandlers();
  return (
    <>
      <ThemeText>{age}</ThemeText>
      <Button title='Set Name' onPress={() => nameHandler.update('first', Math.random().toString())}/>
      <Button title='Set Age' onPress={() => ageHandler.set(Math.random().toString())}/>
    </>
  )
}


function Test2() {
  const {name} = useStore((state) => ({
    name: state.name.first + state.name.last,
  }));

  console.log({name})

  const {setName, setAge} = useHandlers();
  return (
    <>
      <ThemeText>{name}</ThemeText>
      <Button title='Set Name' onPress={() => setName({first: Math.random().toString(), last: Math.random().toString()})}/>
      <Button title='Set Age' onPress={() => setAge(Math.random().toString())}/>
    </>
  )
}