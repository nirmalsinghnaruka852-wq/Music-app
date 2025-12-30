import { Animated, GestureResponderEvent, LayoutChangeEvent, Pressable, useAnimatedValue, ViewProps } from "react-native";
import { ReactNode, useRef, useState } from "react";


type RippleContainerProps=ViewProps&{
  children : ReactNode,
  rippleOpacity :number, 
  rippleColor:string
   variant: string,
   duration :number 

} 


function RippleContainer({ children, rippleColor , rippleOpacity ,...props }: RippleContainerProps) {
    
    const [position, setPosition] = useState<Record<'X' | 'Y', number>>({X: 0,Y: 0,});
    const opacity = useAnimatedValue(0);
    const scale = useAnimatedValue(0);
    const [layout, setLayout] = useState({ width: 0, height: 0 });

      const onLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        setLayout({ width, height });
      };

      const Handler = (event: GestureResponderEvent) => {
        setPosition({X: event.nativeEvent.locationX, Y:event.nativeEvent.locationX});
        scale.setValue(0);
        opacity.setValue(rippleOpacity);

          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start();
      };

  return (
    <Pressable onPress={Handler} onLayout={onLayout} style={{ overflow: 'hidden', position: 'relative' }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: position.Y - layout.width / 2,
          left: position.Y - layout.width / 2,
          width: layout.width,
          height: layout.width,
          borderRadius: layout.width / 2,
          backgroundColor: rippleColor, 
          transform: [{ scale }],
          opacity,
        }}
      />
      {children}
    </Pressable>
  );
}


export default RippleContainer;