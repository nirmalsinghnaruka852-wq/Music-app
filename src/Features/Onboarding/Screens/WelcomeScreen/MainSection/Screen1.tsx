import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import { View } from "react-native";
import SVGImage from "@/Features/Onboarding/Assets/welcome-screen1.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { useWelcomeContext } from "..";
import ThemeView from "@/Shared/Stores/Theme/Components/ThemeView";



export default function Screen1() {
    return (
        <AnimatedContainer>
            <View className="w-full h-full items-center justify-center gap-4 box-border" >
                <SVGImage width={300} height={300} />

                <View className="items-center w-full gap-2" >
                    <ThemeText color="primary" className="text-4xl font-bold" >
                        Enjoy Your Musics
                    </ThemeText>

                    <ThemeText color="primary" className="text-md font-bold opacity-80" >
                        Listen to your favorite songs
                    </ThemeText>
                </View>
            </View>
        </AnimatedContainer>
    )
}



function AnimatedContainer({children}: {children: ReactNode}) {

    const {top: paddingTop, bottom: paddingBottom} = useSafeAreaInsets()

    const {pageAnimatedValue} = useWelcomeContext()

    return (
        <ThemeView
            className="w-full h-full items-center justify-center" 

            style={{
                paddingTop, paddingBottom,

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
            {children}
        </ThemeView>
    )
}