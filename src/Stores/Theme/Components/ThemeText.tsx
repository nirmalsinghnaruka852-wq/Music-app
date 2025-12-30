import { Text, TextProps } from "react-native";
import { useThemeStore } from "..";
import { ColorVariant, FontSize } from "../types";


type ThemeTextProps = TextProps & {
    color?: ColorVariant,
    fontSize?: FontSize | number
}

export default function ThemeText({style, color: _color = 'primary', fontSize: _fontSize = 0, ...props}: ThemeTextProps): React.JSX.Element {

    const {color, fontSize} = useThemeStore(states => ({
        color: states.colors[_color].text,
        fontSize: typeof _fontSize === 'string' ? states.fontSize[_fontSize] : _fontSize
    }));

    return (
        <Text {...props} 
            style={[
                style, 
                {color}, 
                [fontSize ? {fontSize} : {}]
            ]}
        />
    )
}