import { Text, TextProps } from "react-native";
import { useThemeStore } from "..";
import { ColorVariant } from "../types";


export type ThemeTextProps = TextProps & {
    color?: ColorVariant,
}

export default function ThemeText({style, color: _color = 'primary', ...props}: ThemeTextProps): React.JSX.Element {

    const color = useThemeStore(states => states.colors[_color].text);

    return (
        <Text {...props} 
            style={[style, {color}]}
        />
    )
}