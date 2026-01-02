import { View, ViewProps } from "react-native";
import { useThemeStore } from "..";
import { ColorStates } from "../types";


export type ThemeViewProps = ViewProps & {
    color?: ColorStates,
    backgroundColor?: string,
    useWindBackground?: boolean
}

export default function ThemeView({style, color = 'bg', backgroundColor, useWindBackground=false, ...props}: ThemeViewProps): React.JSX.Element {

    const {_backgroundColor} = useThemeStore(states => ({
        _backgroundColor: states.colors[color]
    }));

    if(!backgroundColor) backgroundColor = _backgroundColor;

    return (
        <View {...props} 
            style={[style, useWindBackground === false ? {backgroundColor} : null]}
        />
    )
}