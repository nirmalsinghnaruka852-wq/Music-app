import * as icons from 'lucide-react-native/icons';
import RippleContainer, { RippleContainerProps } from '../Core/RippleContainer';
import Icon from '../Core/Icon';
import { GestureResponderEvent, Text, View } from 'react-native';
import { ButtonSize, ButtonVariants } from './Buttons/Utils/types';
import { ColorStates } from '../../Stores/Theme/types';
import { RANGE } from '../../Types/number.type';
import { getButtonStyle } from './Buttons/Utils/functions';
import { BUTTON_LAYOUT } from './Buttons/Utils/constance';
import ThemeText from '../../Stores/Theme/Components/ThemeText';

type ButtonProp = RippleContainerProps & {
  title: string;
  startIcon?: keyof typeof icons;
  endIcon?: keyof typeof icons;
  variant?: ButtonVariants;
  color?: ColorStates;
  size?: number | ButtonSize;
  rounded?: number | `${RANGE<0, 100>}%`;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function Button({title,startIcon, endIcon,onPress,variant = 'solid', color = 'primary', size = 'md' ,rounded = '10%',...props}: ButtonProp) {
  const { color: textColor, ...style } = getButtonStyle(variant, color);
  const height = typeof size === 'number' ? size : BUTTON_LAYOUT[size].height;

  
  const handleButton = (event: GestureResponderEvent) => {
    onPress?.(event);
  };

  return (
    <RippleContainer
      {...props}
      rippleColor={textColor}
      style={{ ...style, height, borderRadius: rounded }}
      className="flex-1 items-center justify-center"
      onPress={handleButton}
    >
      <View className="flex-1 items-center justify-center">
        {startIcon && <Icon name={startIcon} customColor={textColor} />}
        <ThemeText textColor={textColor}></ThemeText>
        {endIcon && <Icon name={endIcon} customColor={textColor} />}
      </View>
    </RippleContainer>
  );
}
