import Icon from "@/Shared/Components/Core/Icon";
import RippleContainer from "@/Shared/Components/Core/RippleContainer";
import ThemeText from "@/Shared/Stores/Theme/Components/ThemeText";
import ThemeView from "@/Shared/Stores/Theme/Components/ThemeView";
import { useEffect } from "react";
import { Animated, useAnimatedValue, View } from "react-native";
import { useWelcomeContext } from "..";
import { useThemeStore } from "@/Shared/Stores/Theme";

const H = 52;
const MAX_W = 100 + H / 2;


export default function ActionButton() {

    const primaryColor = useThemeStore(states => states.colors.primary)

    const {pageAnimatedValue, currentPage, setCurrentPage} = useWelcomeContext();

    const scaleAnimation = useAnimatedValue(1);

    function handlePressInOut(action: 'in' | 'out') {
        Animated.spring(scaleAnimation, {
            toValue: action === 'in' ? 0.90 : 1,
            bounciness: 8,
            useNativeDriver: false
        }).start();
    }

    return (
        <View className="items-end" > 
            <Animated.View
                className="w-full h-full items-center justify-center flex-row rounded-full overflow-hidden"

                style={{
                    height: H,
                    transform: [{scale: scaleAnimation}],
                    
                    width: pageAnimatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [H, MAX_W]
                    }),

                    backgroundColor: pageAnimatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [primaryColor, 'rgb(255, 255, 255)']
                    })
                }}
            >
                <RippleContainer
                    onPress={() => setCurrentPage(currentPage + 1)} 
                    onPressIn={() => handlePressInOut('in')}
                    onPressOut={() => handlePressInOut('out')}
                    color="primary" 
                    rippleScale={2} 
                    className="items-center justify-center w-full h-full"
                >
                    <Animated.View 
                        className={'absolute items-center justify-center'}
                        style={{
                            opacity: pageAnimatedValue,

                            transform: [{translateX: pageAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [MAX_W, 0]
                            })}]
                        }}
                    >
                        <ThemeText className="text-xl font-semibold" 
                            textColor={pageAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['rgb(255, 255, 255)', primaryColor]
                            })} 
                        >
                            Get Start
                        </ThemeText>
                    </Animated.View>

                    <Animated.View 
                        className={'absolute items-center justify-center'}
                        style={{
                            opacity: pageAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0]
                            }),

                            transform: [{translateX: pageAnimatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, MAX_W]
                            })}]
                        }}
                    >
                        <Icon 
                            name="ArrowRight" size={20} 
                            customColor={currentPage === 0 ? 'white' : primaryColor} 
                        />
                    </Animated.View>
                </RippleContainer>
            </Animated.View>
        </View>
    )
}