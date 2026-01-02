import * as icons from 'lucide-react-native/icons';
import RippleContainer, { RippleContainerProps } from '../../Core/RippleContainer';
import Icon from '../../Core/Icon';
import { GestureResponderEvent, Text, View } from 'react-native';
import { ButtonSize, ButtonVariants } from './Utils/types';
import { ColorStates } from '../../../Stores/Theme/types';
import { RANGE } from '../../../Types/number.type';
import { getButtonStyle } from './Utils/functions';
import { BUTTON_LAYOUT } from './Utils/constance';
import ThemeText from '../../../Stores/Theme/Components/ThemeText';
import If from '../../Core/If';

type ButtonProp = RippleContainerProps & {
  title: string;
  IconName?: keyof typeof icons;
  endIcon?: keyof typeof icons;
  variant?: ButtonVariants;
  color?: ColorStates;
  size?: number | ButtonSize;
  rounded?: number | `${RANGE<0, 100>}%`;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function Button({
  title,
  IconName,
  endIcon,
  onPress,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  rounded = '10%',
  ...props
}: ButtonProp) {
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
      <If condition={!!IconName}>
         <Icon name={IconName!} customColor={textColor} />
      </If>
      <ThemeText textColor={textColor}></ThemeText>
      <If condition={!!endIcon} >
        <Icon name={endIcon!} customColor={textColor} />
      </If>
    </RippleContainer>
  );
}
