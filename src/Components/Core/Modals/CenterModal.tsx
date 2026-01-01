import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { Animated, Modal, ModalProps, PanResponder, useAnimatedValue, useWindowDimensions } from "react-native";
import RippleContainer from "../RippleContainer";
import ThemeView, { ThemeViewProps } from "../../../Stores/Theme/Components/ThemeView";
import { useThemeStore } from "../../../Stores/Theme";
import { ColorStates } from "../../../Stores/Theme/types";



export type CenterModalProps = Omit<ModalProps, 'animationType'> & {
    children: ReactNode,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    preventBack?: boolean,
    containerProps?: ThemeViewProps,
    backdropColor?: ColorStates
}


export default function CenterModal({children, visible, setVisible, preventBack, onRequestClose, style, containerProps, backdropColor: backdropVariant='text', ...props}: CenterModalProps) {

    const backdropColor = useThemeStore(states => states.colors[backdropVariant].replace(')', ', 0.8)'));

    const {width: windowWidth, height: windowHeight} = useWindowDimensions();

    const [show, setShow] = useState(visible);
    
    const animatedValue = useAnimatedValue(0);

    const translate = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

    const {panHandlers} = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dy) > 5;
        },

        onPanResponderTerminationRequest: () => false,

        onPanResponderMove: (_, {dx, dy}) => {
            translate.setValue({x: dx, y: dy});
        },

        onPanResponderRelease: (_, {vx, vy, dx, dy}) => {
            const isNearEdge = [
                Math.abs(dx) > windowWidth * 0.4, 
                Math.abs(dy) > windowHeight * 0.4
            ].some(Boolean);
            
            const isMovingFast = [Math.abs(vx) > 2, Math.abs(vy) > 2].some(Boolean);

            if(isNearEdge || isMovingFast) {
                return setVisible(false);
            }

            Animated.spring(translate, {
                toValue: {x: 0, y: 0},
                bounciness: 12,
                useNativeDriver: true
            }).start()
        }

    })).current;

    function handleClose() {
        setTimeout(() => setShow(false), 150)

        Animated.spring(animatedValue, {
            toValue: 0,
            bounciness: 12,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {        
        if(visible){
            setShow(true);
            translate.setValue({x: 0, y: 0});
            
            Animated.spring(animatedValue, {
                toValue: 1,
                bounciness: 12,
                useNativeDriver: true
            }).start()
        } else {
            handleClose();
        }
    }, [visible])

    
    return (
        <Modal {...props} 
            visible={show}
            transparent

            onRequestClose={(event) => {
                if(preventBack) return;
                setVisible(false);
                onRequestClose?.(event);
            }}
        >
            <Animated.View className="flex-1 w-full h-full items-center justify-center" 
                style={{
                    opacity: animatedValue,
                    backgroundColor: backdropColor
                }}
            >
                <RippleContainer className="flex-1 w-full" onPressOut={() => setVisible(false)} rippleOpacity={0.2} />
                
                <Animated.View {...panHandlers}
                    className={'w-full p-2 relative'}
                    style={{
                        opacity: animatedValue,
                        transform: [
                            {translateX: translate.x}, {translateY: translate.y}, 
                            {scale: animatedValue.interpolate({inputRange: [0, 1], outputRange: [0.4, 1]})}
                        ]
                    }}
                >
                    <ThemeView
                        {...containerProps}
                        style={[style, {overflow: 'hidden', borderRadius: 12, padding: 4, width: '100%'}]} 
                    >
                        {children}
                    </ThemeView>
                </Animated.View>
                
                <RippleContainer className="flex-1 w-full" onPressOut={() => setVisible(false)} rippleOpacity={0.2} />
            </Animated.View>
        </Modal>
    )
}