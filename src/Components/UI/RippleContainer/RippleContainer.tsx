import { ReactNode } from "react";
import { Alert, GestureResponderEvent, Pressable } from "react-native";

type RippleContainerProps = {
  children: ReactNode;
};

function RippleContainer({ children }: RippleContainerProps){
  const bubbleHandler=(event:GestureResponderEvent )=>{
    Alert.alert("Pressed!", "Check the console for full event details");

  }

  return (
    <Pressable  onPressIn={bubbleHandler}>
      {children}
    </Pressable >
  );
}

export default RippleContainer;
