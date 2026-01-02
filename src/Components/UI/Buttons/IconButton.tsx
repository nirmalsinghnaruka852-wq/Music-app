import { RANGE } from "../../../Types/number.type"
import Icon, { IconName } from "../../Core/Icon"
import RippleContainer, { RippleContainerProps } from "../../Core/RippleContainer"
import { BUTTON_LAYOUT } from "./Utils/constance"
import { getButtonStyle } from "./Utils/functions"
import { ButtonSize, ButtonVariants } from "./Utils/types"


export type IconButtonProps = RippleContainerProps & {
    icon: IconName,
    
    variant?: ButtonVariants,
    size?: number | ButtonSize,
    rounded?: number | `${RANGE<0, 100>}%`
}

export default function IconButton({variant='soft', color='primary', icon, size='md', rounded='50%', ...props}: IconButtonProps) {

    const {color: textColor, ...style} = getButtonStyle(variant, color);

    const height = typeof size === 'number' ? size : BUTTON_LAYOUT[size].height;
    const borderWidth = typeof size === 'number' ? 1 : BUTTON_LAYOUT[size].borderWidth;
    return (
        <RippleContainer {...props}
            rippleColor={textColor}
            style={{...style, height, borderRadius: rounded, borderWidth}}
            className="aspect-square items-center justify-center"
        >
            <Icon customColor={textColor} name={icon} size={Math.floor(height * 0.6)} />
        </RippleContainer>
    )
}