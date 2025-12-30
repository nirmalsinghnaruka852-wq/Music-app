import { ReactNode, useRef, useState } from "react";
import { useThemeStore } from "../../Stores/Theme";
import { Animated, GestureResponderEvent, Pressable, PressableProps, useAnimatedValue, View, ViewStyle } from "react-native";
import { ColorVariant } from "../../Stores/Theme/types";


export type RippleContainerProps = PressableProps & {
  children?: ReactNode,
  color?: ColorVariant
  style?: ViewStyle
  rippleOpacity?:number, 
  rippleColor?:string,
  rippleScale?: number,
  rippleCount?: number,
  duration?: number,
}


export default function RippleContainer({children, style, onPress, color='primary', rippleColor, rippleOpacity=0.4, rippleScale=1, duration=300, rippleCount=3, ...props}: RippleContainerProps) {
  
  const rgb = useThemeStore(s => s.colors[color].rgb.text.join(','));
  rippleColor ??= `rgb(${rgb})`;
    
  const [position, setPosition] = useState<{top: number, left: number}>({top: 0, left: 0});

  const animatedValue = useAnimatedValue(0);

  const button = useRef<View>(null);

  function handleOnPress(event: GestureResponderEvent) {
    const {pageX, pageY} = event.nativeEvent;
    
    button.current?.measure((x, y) => {
      setPosition({top: pageY - y, left: pageX - x})
    })

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
    <Pressable ref={button} {...props} onPress={handleOnPress} style={[style, { overflow: 'hidden', position: 'relative' }]}>
      <View className="absolute w-1/2 aspect-square" style={{...position, transform: 'translate(-50%, -50%)'}} >
        {
          [...new Array(Math.min(rippleCount, 5))].map((_, index) => (
            <Animated.View key={index}
              className={'absolute w-full aspect-square rounded-full'}
              style={{ 
                backgroundColor: rippleColor,
                

                opacity: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [rippleOpacity * ((rippleCount - index) / rippleCount), 0],
                }),

                transform: [{
                  scale: animatedValue.interpolate({
                    inputRange: [0, 0.1, 1], 
                    outputRange: [0, rippleScale * 0.1, rippleScale + (index * 0.1)]
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