import { View, ViewProps } from "react-native";
import { useThemeStore } from "..";
import { ColorVariant } from "../types";


export type ThemeViewProps = ViewProps & {
    color?: ColorVariant,
    backgroundColor?: string,
    useWindBackground?: boolean
}

export default function ThemeView({style, color = 'primary', backgroundColor, useWindBackground=false, ...props}: ThemeViewProps): React.JSX.Element {

    const {_backgroundColor} = useThemeStore(states => ({
        _backgroundColor: states.colors[color].bg
    }));

    if(!backgroundColor) backgroundColor = _backgroundColor;

    return (
        <View {...props} 
            style={[style, useWindBackground === false ? {backgroundColor} : null]}
        />
    )
}