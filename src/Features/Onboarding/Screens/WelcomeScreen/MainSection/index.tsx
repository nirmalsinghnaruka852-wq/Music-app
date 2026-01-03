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
            <View className="w-full h-full items-center justify-center" >
                <Screen1/>
            </View>


            <Animated.View 
                className="w-full h-full items-center justify-center absolute" 
                
                style={{
                    transform: [
                        {translateX: pageAnimatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['100%', '0%']
                        })},

                        {translateY: pageAnimatedValue.interpolate({
                            inputRange: [0, 1],  
                            outputRange: ['60%', '0%']
                        })}
                    ],

                    opacity: pageAnimatedValue,
                }}
            >
                <Animated.View className="absolute rounded-full aspect-square" 
                    style={{
                        backgroundColor: primaryColor,

                        width: Math.max(WINDOW_WIDTH, WINDOW_HEIGHT) + 400,

                        transform: [{scale: pageAnimatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.2, 1]
                        })}],

                        opacity: pageAnimatedValue,
                    }} 
                />

                <Screen2/>
            </Animated.View>
        </View>
    )
}