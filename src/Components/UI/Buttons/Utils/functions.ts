import { useMemo } from "react";
import { useThemeStore } from "../../../../Stores/Theme";
import { ColorStates } from "../../../../Stores/Theme/types";
import { ButtonVariants } from "./types";

export function getButtonStyle(variant: ButtonVariants, color: ColorStates) {
    const {textColor, bgColor} = useThemeStore((states) => {
        if(['text', 'bg'].includes(color ?? '')) {
            return {
                bgColor: states.colors[color],
                textColor: states.colors[color === 'text' ? 'bg' : 'text']
            }
        }

        return {
            bgColor: states.colors[color],
            textColor: 'rgb(255,255,255)'
        }
    })


    const style = useMemo(() => ({
        'solid': {
            color: textColor,
            backgroundColor: bgColor,
            borderColor: bgColor,
            borderWidth: 1
        },

        'outlined': {
            color: bgColor,
            backgroundColor: 'transparent',
            borderColor: bgColor,
            borderWidth: 1
        },

        'soft': {
            color: bgColor,
            backgroundColor: bgColor.replace(')', ', 0.2)'),
            borderColor: 'transparent',
            borderWidth: 0
        },

        'soft-outlined': {
            color: bgColor,
            backgroundColor: bgColor.replace(')', ', 0.2)'),
            borderColor: bgColor,
            borderWidth: 1
        },

        'text': {
            color: bgColor,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0
        }
    }[variant]), [bgColor, textColor]);

    return style;
}