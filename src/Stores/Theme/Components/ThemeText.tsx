import { Text, TextProps } from "react-native";
import { useThemeStore } from "..";
import { ColorStates } from "../types";


export type ThemeTextProps = TextProps & {
    color?: ColorStates,
    textColor?: string
}

export default function ThemeText({style, color: _color = 'text', textColor, ...props}: ThemeTextProps): React.JSX.Element {

    const color = useThemeStore(states => textColor ?? states.colors[_color]);

    return (
        <Text {...props} 
            style={[style, {color}]}
        />
    )
}