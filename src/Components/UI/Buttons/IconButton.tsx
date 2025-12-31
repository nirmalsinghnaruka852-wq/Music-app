import { ColorStates } from "../../../Stores/Theme/types"
import { RANGE } from "../../../Types/number.type"
import Icon, { IconNames } from "../../Core/Icon"
import RippleContainer, { RippleContainerProps } from "../../Core/RippleContainer"
import { BUTTON_LAYOUT } from "./Utils/constance"
import { getButtonStyle } from "./Utils/functions"
import { ButtonSize, ButtonVariants } from "./Utils/types"


export type IconButtonProps = RippleContainerProps & {
    icon: IconNames,
    
    variant?: ButtonVariants,
    color?: ColorStates,
    size?: number | ButtonSize,
    rounded?: number | `${RANGE<0, 100>}%`
}

export default function IconButton({variant='soft', color='primary', icon, size='md', rounded='50%', ...props}: IconButtonProps) {

    const {color: textColor, ...style} = getButtonStyle(variant, color);

    const height = typeof size === 'number' ? size : BUTTON_LAYOUT[size].height;
    return (
        <RippleContainer {...props}
            rippleColor={textColor}
            style={{...style, height, borderRadius: rounded}}
            className="aspect-square items-center justify-center"
        >
            <Icon customColor={textColor} name={icon} size={Math.floor(height * 0.6)} />
        </RippleContainer>
    )
}