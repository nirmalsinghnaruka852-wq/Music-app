import './global.css';
import { Button, View } from 'react-native';
import ThemeProvider, { useTheme } from './src/Providers/ThemeProvider';
import ThemeText from './src/Providers/ThemeProvider/Components/ThemeText';
import ThemeView from './src/Providers/ThemeProvider/Components/ThemeView';
import createStore from './src/Store/Utils/createStore';

const {useStore, useHandlers} = createStore<{count: number, arr: Array<number>, obj: {key1: number, key2: number}}>({
  states: {
    count: 0,
    arr: [],
    obj: {
      key1: 0,
      key2: 0
    }
  }
})

export default function App() {
  return (
    <ThemeProvider>
      <ThemeView useWindBackground className="flex-1 items-center justify-center bg-red-100">
        <ThemeView color='primary'  className='w-full h-4' />
        <Test/>
        <ThemeView color='secondary'  className='w-full h-4' />
        <Test1/>
        <ThemeView color='error'  className='w-full h-4' />
        <Test2/>
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

function Test() {
  const {count, key1} = useStore((state) => ({count: state.count, key1: state.obj.key1}));
  const {count: countHandler} = useHandlers()
  console.log('test')
  return (
    <>
      <ThemeText>{count}, {key1}</ThemeText>
      <View className='flex-row gap-2' >
        <Button title='+' onPress={() => countHandler.set(count + 1)}/>
        <Button title='-' onPress={() => countHandler.set(pre => pre - 1)}/>
        <Button title='reset' onPress={() => countHandler.reset()}/>
      </View>
    </>
  )
}


function Test1() {
  const {arr} = useStore((state) => ({arr: state.arr}));
  const {arr: arrHandler} = useHandlers();

  return (
    <>
      <View className='flex-row gap-2' >
        {
          arr.map(item => (
            <ThemeText key={item} >{item}</ThemeText>
          ))
        }
      </View>

      <View className='flex-row gap-2' >
        <Button title='push' onPress={() => arrHandler.push(arr.length)}/>
        <Button title='pop' onPress={() => arrHandler.pop()}/>
        <Button title='shift' onPress={() => arrHandler.shift()}/>
        <Button title='unshift' onPress={() => arrHandler.unshift(arr[0] - 1)}/>
        <Button title='map' onPress={() => arrHandler.map(item => item + 1)}/>
        <Button title='reset' onPress={() => arrHandler.reset()}/>
      </View>
    </>
  )
}

function Test2() {
  const {key2} = useStore((state) => ({key2: state.obj.key2}));
  const {obj: objHandler} = useHandlers();

  console.log('test2')

  return (
    <>
     <ThemeText>{key2}</ThemeText>
      <View className='flex-row gap-2' >
        <Button title='update' onPress={() => objHandler.update('key2', key2 + 1)}/>
        <Button title='update-many' onPress={() => objHandler.updateMany({key1: Math.floor(Math.random() * 10)})}/>
        <Button title='reset' onPress={() => objHandler.reset()}/>
      </View>
    </>
  )
}