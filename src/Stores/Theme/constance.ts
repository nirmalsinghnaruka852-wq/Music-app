import { Theme, ColorStates } from "./types";


export const _colors: Record<Theme, Record<ColorStates, string>> = {
    light: {
        'text': 'rgb(0, 0, 0)',
        'bg': 'rgb(240, 242, 245)',

        'primary': 'rgb(38, 115, 221)',
        'error': 'rgb(245, 34, 45)',
        'warning': 'rgb(255, 184, 0)',
        'info': 'rgb(74, 108, 135)'
    },

    dark: {
        'text': 'rgb(240, 242, 245)',
        'bg': 'rgb(0, 0, 0)',

        'primary': 'rgb(38, 115, 221)',
        'error': 'rgb(245, 34, 45)',
        'warning': 'rgb(255, 184, 0)',
        'info': 'rgb(74, 108, 135)'
    }
}


  export const sizeMap = {
    sm: { py: 8, px: 12, text: 14 },
    md: { py: 12, px: 16, text: 16 },
    lg: { py: 16, px: 20, text: 18 },
    full: { py: 16, px: 24, text: 16 },
  } as const

 export const radiusMap = {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
  } as const
