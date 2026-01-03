import { Animated, TextProps } from "react-native";
import { useThemeStore } from "..";
import { ColorStates } from "../types";
import { AnimatedInterpolValue } from "@/Shared/Types/functions.type";


export type ThemeTextProps = TextProps & {
    color?: ColorStates,
    textColor?: string | AnimatedInterpolValue
}

export default function ThemeText({style, color: _color = 'text', textColor, ...props}: ThemeTextProps): React.JSX.Element {

    const color = useThemeStore(states => textColor ?? states.colors[_color]);

    return (
        <Animated.Text {...props} 
           style={[style, {color}]}
        />
    )
}