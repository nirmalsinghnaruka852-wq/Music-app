import * as icons from 'lucide-react-native/icons';
import { LucideProps } from "lucide-react-native";
import { useThemeStore } from "../../Stores/Theme";
import { ColorStates } from '../../Stores/Theme/types';


export type IconName = keyof typeof icons;

export type IconProps = LucideProps & {
  name: IconName,
  
  size?: number,
  color?: ColorStates,
  customColor?: string,
}

export default function Icon({name, size=16, color='text', customColor, ...props}: IconProps){

  const colors = useThemeStore(states => customColor ?? states.colors[color])

  const LucideIcon = icons[name];

  return <LucideIcon {...props} color={colors} size={size} />;
}