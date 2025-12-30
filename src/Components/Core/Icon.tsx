import * as icons from 'lucide-react-native/icons';
import { LucideProps } from "lucide-react-native";
import { ColorVariant, FontSize } from "../../Stores/Theme/types";
import { useThemeStore } from "../../Stores/Theme";


export type IconProps = LucideProps & {
    name: keyof typeof icons,
    size?: FontSize | number,
    color?: ColorVariant,
    customColor?: string,
}

export default function Icon({name, size, color, customColor, ...props}: IconProps){

    const {colors, fontSize} = useThemeStore(states => ({
        colors: customColor ?? states.colors[color ?? 'primary'].text,
        fontSize: typeof size === 'number' ? size : states.fontSize[size ?? 'sm'],
    }))

    const LucideIcon = icons[name];

  return <LucideIcon color={colors} size={fontSize} {...props} />;
}