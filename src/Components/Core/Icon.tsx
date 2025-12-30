import * as icons from 'lucide-react-native/icons';
import { LucideProps } from "lucide-react-native";
import { ColorVariant } from "../../Stores/Theme/types";
import { useThemeStore } from "../../Stores/Theme";


export type IconProps = LucideProps & {
    name: keyof typeof icons,
    size?: number,
    color?: ColorVariant,
    customColor?: string,
}

export default function Icon({name, size, color, customColor, ...props}: IconProps){

    const colors = useThemeStore(states => customColor ?? states.colors[color ?? 'primary'].text)

    const LucideIcon = icons[name];

  return <LucideIcon {...props} color={colors} size={size} />;
}