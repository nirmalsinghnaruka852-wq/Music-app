import * as icons from 'lucide-react-native/icons';
import RippleContainer, { RippleContainerProps } from '../Core/RippleContainer';
import Icon from '../Core/Icon';
import { GestureResponderEvent, Text, View } from 'react-native';
import { Variant, ColorVariant } from '../../Stores/Theme/types';
import { radiusMap, sizeMap } from '../../Stores/Theme/constance';
import { useThemeStore } from '../../Stores/Theme';
import { useButtonVariant } from './Button.style';

type ButtonProp = RippleContainerProps & {
  title: string;
  startIcon?: keyof typeof icons;
  endIcon?: keyof typeof icons;
  changeIcon?: keyof typeof icons;
  colour?: ColorVariant;
  variant?: Variant;
  size?: keyof typeof sizeMap,
  rounded?: keyof typeof radiusMap,
};

export default function Button({title,startIcon,endIcon, onPress,style,variant = 'solid',colour = 'primary',size = 'md',rounded = 'md',...props}: ButtonProp) {

  const s = sizeMap[size]
  const radius = radiusMap[rounded]
  const theme = useButtonVariant(variant, colour)


  const handleButton = (event: GestureResponderEvent) => {
    onPress?.(event)
  }

  return (
 <RippleContainer {...props} color={colour} onPress={handleButton}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: s.py,
            paddingHorizontal: s.px,
            borderRadius: radius,
            backgroundColor: theme.backgroundColor,
            borderWidth: theme.borderWidth,
            borderColor: theme.borderColor,
          },
          style,
        ]}
      >
        {startIcon && <Icon name={startIcon} customColor={theme.contentColor} />}
        <Text style={{ color: theme.contentColor, fontSize: s.text }}>
          {title}
        </Text>
        {endIcon && <Icon name={endIcon} customColor={theme.contentColor} />}
      </View>
    </RippleContainer>
  )
}

