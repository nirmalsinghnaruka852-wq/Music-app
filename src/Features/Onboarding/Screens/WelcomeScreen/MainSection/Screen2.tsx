import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import { Animated, useWindowDimensions, View } from "react-native";
import SVGImage from "@/Features/Onboarding/Assets/welcome-screen2.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemeView from "@/Shared/Stores/Theme/Components/ThemeView";
import { useWelcomeContext } from "..";
import { ReactNode } from "react";



export default function Screen2() {
    return (
        <AnimatedContainer>
            <View className="w-full h-full items-center justify-center gap-4 box-border" >
                <SVGImage width={300} height={300} />

                <View className="items-center w-full gap-2" >
                    <ThemeText textColor="white" className="text-4xl font-bold" >
                        No Advertisements
                    </ThemeText>

                    <ThemeText textColor="white" className="text-md font-bold opacity-80" >
                        Listen to favorite songs without any advertisements
                    </ThemeText>
                </View>
            </View>
        </AnimatedContainer>
    )
}



function AnimatedContainer({children}: {children: ReactNode}) {

    const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = useWindowDimensions();

    const {top: paddingTop, bottom: paddingBottom} = useSafeAreaInsets();

    const {pageAnimatedValue} = useWelcomeContext();

    return (
        <Animated.View 
            className="w-full h-full items-center justify-center absolute"
            style={{
                transform: [
                    {translateX: pageAnimatedValue.interpolate({
                        inputRange: [0, 0.9, 2],
                        outputRange: ['100%', '0%', '0%']
                    })},

                    {translateY: pageAnimatedValue.interpolate({
                        inputRange: [0, 0.9, 2],  
                        outputRange: ['60%', '0%', '0%']
                    })}
                ],
            }}
        >
            <ThemeView color="primary" className="absolute rounded-full aspect-square" 
                style={{
                    width: Math.max(WINDOW_WIDTH, WINDOW_HEIGHT) + 400,

                    transform: [{scale: pageAnimatedValue.interpolate({
                        inputRange: [0, 1, 2],
                        outputRange: [0.2, 1, 1]
                    })}],
                }} 
            />

            <Animated.View
                className="w-full h-full items-center justify-center" 
                style={{
                    paddingTop, paddingBottom,

                    opacity: pageAnimatedValue.interpolate({
                        inputRange: [0, 1, 2],
                        outputRange: [0.5, 1, 1]
                    }),

                    transform: [{scale: pageAnimatedValue.interpolate({
                        inputRange: [0, 1, 2],
                        outputRange: [0.6, 1, 1.5]
                    })}]
                }}
            >
                {children}
            </Animated.View>
        </Animated.View>
    )
}