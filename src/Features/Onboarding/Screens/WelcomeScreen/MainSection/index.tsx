import { Animated, useWindowDimensions, View } from "react-native";
import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import { useWelcomeContext } from "..";
import { useThemeStore } from "@/Shared/Stores/Theme";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";

export default function MainSection() {

    const primaryColor = useThemeStore(states => states.colors.primary)

    const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = useWindowDimensions()

    const {pageAnimatedValue} = useWelcomeContext();


    return (
        <View className="w-full h-full relative" >
            <Animated.View 
                className="w-full h-full items-center justify-center" 
                style={{
                    opacity: pageAnimatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                    }),

                    transform: [{scale: pageAnimatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.6]
                    })}]
                }}
            >
                <Screen1/>
            </Animated.View>


            <Screen2/>
        </View>
    )
}