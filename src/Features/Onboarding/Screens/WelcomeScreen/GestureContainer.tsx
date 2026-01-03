import { useEffect, useRef } from "react";
import { PanResponder, useWindowDimensions, View } from "react-native";
import { useWelcomeContext } from ".";

export default function GestureContainer({children}: {children: React.ReactNode}) {

    const {width: windowWidth} = useWindowDimensions();

    const { pageAnimatedValue, setCurrentPage, currentPage } = useWelcomeContext();

    const activePage = useRef(currentPage);

    const {panHandlers} = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dy) > 5;
        },

        onPanResponderTerminationRequest: () => false,

        onPanResponderMove: (_, {dx}) => {
            const dxRatio = (-dx / windowWidth) + activePage.current;
            if(dxRatio <= -0.5) return setCurrentPage(0);
            if(dxRatio >= 1.5) return setCurrentPage(1);

            pageAnimatedValue.setValue(dxRatio);
        },

        onPanResponderRelease: (_, {vx, dx}) => {
            if(vx < -1) return setCurrentPage(1);
            
            if(vx > 1) return setCurrentPage(0);

            const dxRatio = (-dx / windowWidth) + activePage.current;

            if(dxRatio > 0.4 && activePage.current === 0) return setCurrentPage(1);
            if(dxRatio < 0.6 && activePage.current === 1) return setCurrentPage(0);

            return setCurrentPage(activePage.current);
        }
    })).current;


    useEffect(() => {
        activePage.current = currentPage;
    }, [currentPage])

    return (
        <View {...panHandlers}
            className="w-full h-full items-center justify-center" 
        >
            {children}
        </View>
    )
}