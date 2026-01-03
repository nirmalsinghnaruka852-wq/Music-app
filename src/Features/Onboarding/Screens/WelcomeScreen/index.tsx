import ThemeView from "@/Shared/Stores/Theme/Components/ThemeView";
import { Animated, useAnimatedValue, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FooterSection from "./FooterSection";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import MainSection from "./MainSection";
import GestureContainer from "./GestureContainer";


const Context = createContext<{
    pageAnimatedValue: Animated.Value,
    currentPage: number,
    setCurrentPage: (page: number) => void
}>({
    pageAnimatedValue: new Animated.Value(0),
    currentPage: 0,
    setCurrentPage: () => {}
})

export default function WelcomeScreen() {

    const {bottom: paddingBottom} = useSafeAreaInsets();

    const pageAnimatedValue = useAnimatedValue(0);

    const [currentPage, _setCurrentPage] = useState(0);

    function setCurrentPage(page: number) {
        if(page < 0) page = 0;
        if(page > 1) page = 1;

        Animated.spring(pageAnimatedValue, {
            toValue: page,
            bounciness: 12,
            useNativeDriver: false
        }).start();

        setTimeout(() => {
            _setCurrentPage(page);
        }, 100);
    }

    const states = {
        pageAnimatedValue,
        currentPage, setCurrentPage
    }

    return (
        <Context.Provider value={states}>    
            <ThemeView className="relative w-full h-full">
                <GestureContainer>
                    <MainSection/>
                </GestureContainer>

                <View 
                    style={{paddingBottom}} 
                    className="absolute left-0 bottom-10 w-full items-center justify-between gap-2 px-3 box-border" 
                >
                    <FooterSection/>
                </View>
            </ThemeView>
        </Context.Provider>
    )
}

export const useWelcomeContext = () => useContext(Context);