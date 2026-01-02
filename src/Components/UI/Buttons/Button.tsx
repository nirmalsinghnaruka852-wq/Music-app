import RippleContainer, { RippleContainerProps } from '../../Core/RippleContainer';
import Icon, { IconName } from '../../Core/Icon';
import { ButtonSize, ButtonVariants } from './Utils/types';
import { RANGE } from '../../../Types/number.type';
import { getButtonStyle } from './Utils/functions';
import { BUTTON_LAYOUT } from './Utils/constance';
import ThemeText from '../../../Stores/Theme/Components/ThemeText';
import ShowWhen from '../../Core/ShowWhen';

type ButtonProp = RippleContainerProps & {
  title: string;

  startIcon?: IconName;
  endIcon?: IconName;
  variant?: ButtonVariants;
  size?: ButtonSize;
  rounded?: number | `${RANGE<0, 100>}%`;
};


export default function Button({ title, startIcon, endIcon, variant = 'solid', color = 'primary', size = 'md', rounded, ...props}: ButtonProp) {
  
  const { color: textColor, borderColor, backgroundColor } = getButtonStyle(variant, color);

  const {fontSize, ...containerStyle} = {
    ...BUTTON_LAYOUT[size], 
    ...rounded !== undefined ? {borderRadius: rounded} : {}
  };

  return (
    <RippleContainer
      {...props}
      rippleColor={textColor}
      style={{ ...containerStyle, backgroundColor, borderColor, flexDirection: 'row', gap: Math.floor(fontSize / 2), alignItems: 'center', justifyContent: 'center' }}
    >
      <ShowWhen when={!!startIcon}>
        <Icon name={startIcon as IconName} customColor={textColor} />
      </ShowWhen>

      <ThemeText textColor={textColor} style={{fontSize}} >{title}</ThemeText>
      
      <ShowWhen when={!!endIcon} >
        <Icon name={endIcon as IconName} customColor={textColor} />
      </ShowWhen>
    </RippleContainer>
  );
}
