import { View, ViewProps } from "react-native";
import { useTheme } from "..";
import { ColorVariant, FontSize } from "../types";


type ThemeTextProps = ViewProps & {
    color?: ColorVariant,
    backgroundColor?: string,
    useWindBackground?: boolean
}

export default function ThemeView({style, color = 'primary', backgroundColor, useWindBackground=false, ...props}: ThemeTextProps): React.JSX.Element {

    const {_backgroundColor} = useTheme(theme => ({
        _backgroundColor: theme.colors[color].bg
    }));

    if(!backgroundColor) backgroundColor = _backgroundColor;

    return (
        <View {...props} 
            style={[style, useWindBackground === false ? {backgroundColor} : {}]}
        />
    )
}