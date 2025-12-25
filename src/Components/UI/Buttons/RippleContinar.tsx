import { ReactNode, useRef, useState } from "react";
import { Alert, GestureResponderEvent, Pressable ,Animated ,View, LayoutChangeEvent} from "react-native";
// import { View } from "react-native/types_generated/index";

type RippleContainerProps = {
  children: ReactNode;
};

function RippleContainer({ children }: RippleContainerProps){
    const postionInX = useRef(0)
    const postionInY = useRef(0)
    const opacity = useRef(new Animated.Value(0)).current
    const scale  = useRef(new Animated.Value(0)).current
    const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setLayout({ width, height });
  };
   const Handler =(event:GestureResponderEvent)=>{
    postionInX.current= event.nativeEvent.locationX
    postionInY.current = event.nativeEvent.locationY
    scale .setValue(0);
    opacity.setValue(0.5);

  
      Animated.parallel([
      Animated.timing(scale , { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();

   }

  return (
     <Pressable onPress={Handler} onLayout={onLayout} style={{
      overflow:'hidden'
     }}>{children}
      <Animated.View  style={{
        position:'absolute',
         top: postionInY.current - layout.width / 2,
          left:  postionInX.current- layout.width / 2,
         width: layout.width,
          height: layout.width,
          borderRadius: layout.width / 2,
          backgroundColor: 'rgba(0,0,0,0.2)',
          transform: [{ scale   }],
          opacity,

      }}>

      </Animated.View>
     </Pressable>
  );
}

export default RippleContainer;
