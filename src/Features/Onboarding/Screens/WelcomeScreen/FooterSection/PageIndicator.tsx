import { Animated, View } from "react-native";
import { useWelcomeContext } from "..";
import { useThemeStore } from "@/Shared/Stores/Theme";
import RippleContainer from "@/Shared/Components/Core/RippleContainer";

export default function PageIndicator() {

    const backgroundColor = useThemeStore(states => states.colors.primary)

    const {pageAnimatedValue, currentPage, setCurrentPage} = useWelcomeContext();

    const W = 10;
    const outputRange = [0, 1];

    return (
        <View className="flex-row items-center gap-1" >

            {
                [...Array(2)].map((_, index) => (
                    <Animated.View
                        key={index}
                        className={'aspect-square rounded-full relative overflow-hidden items-center justify-center'}

                        style={{
                            backgroundColor: pageAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [backgroundColor, 'rgb(255, 255, 255)']
                            }),

                            elevation: 8,
                            
                            width: pageAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: outputRange.map((idx) => idx === index ? W * 3 : W)
                            }),
                            
                            opacity: pageAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: outputRange.map((idx) => idx === index ? 1 : 0.5)
                            })
                        }}
                    >
                        <RippleContainer 
                            rippleScale={2}
                            rippleColor={currentPage === 0 ? "white" : backgroundColor}
                            className="rounded-full w-full h-full"
                            onPress={() => setCurrentPage(index)}
                        />
                    </Animated.View>
                ))
            }
            
        </View>
    )
}