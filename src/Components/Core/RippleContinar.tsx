import { ReactNode, useState } from "react";
import { useThemeStore } from "../../Stores/Theme";
import { Animated, GestureResponderEvent, Pressable, PressableProps, useAnimatedValue, View, ViewStyle } from "react-native";
import { ColorVariant } from "../../Stores/Theme/types";


export type RippleContainerProps = PressableProps & {
  children: ReactNode,

  color?: ColorVariant
  style?: ViewStyle
  rippleOpacity?:number, 
  rippleColor?:string,
  rippleScale?: number,
  rippleCount?: number,
  duration?: number,
}


export default function RippleContainer({children, style, onPress, color='primary', rippleColor, rippleOpacity=0.5, rippleScale=1, duration=300, rippleCount=3, ...props}: RippleContainerProps) {
  
  const rgb = useThemeStore(s => s.colors[color].rgb.text.join(','));
  rippleColor ??= `rgb(${rgb})`;
    
  const [position, setPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

  const animatedValue = useAnimatedValue(0);


  function handleOnPress(event: GestureResponderEvent) {
    const {locationY: top, locationX: left} = event.nativeEvent;
    setPosition({top, left});
    startAnimation();
    
    onPress?.(event);
  }


  function startAnimation() {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start(() => {
      animatedValue.setValue(0);
    })
  }


  return (
    <Pressable {...props} onPress={handleOnPress} style={[style, { overflow: 'hidden', position: 'relative' }]}>
      <View className="absolute w-1/2 aspect-square" style={{...position, transform: 'translate(-50%, -50%)'}} >
        {
          [...new Array(Math.min(rippleCount, 5))].map((_, index) => (
            <Animated.View key={index}
              className={'absolute w-full aspect-square rounded-full'}
              style={{ 
                backgroundColor: rippleColor,

                opacity: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [rippleOpacity - (index * 0.2), 0],
                }),

                transform: [{
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1], outputRange: [0, rippleScale - (index * 0.2)]
                  })
                }]
              }}
            />
          ))
        }
      </View>

      {children}
    </Pressable>
  );
}