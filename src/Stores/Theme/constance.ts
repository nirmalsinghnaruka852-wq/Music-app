import { ARRAY } from "../../Types/array.type";
import { RANGE } from "../../Types/number.type";
import { ColorEntities, ColorVariant, Theme } from "./types";

const getColors = <RGB extends ARRAY<RANGE<0, 255>, 3>>(text: RGB, bg: RGB): ColorEntities => ({
    text: `rgb(${text.join(',')})`,
    bg: `rgb(${bg.join(',')})`,
    rgb: {text, bg}
})


export const _colors: Record<Theme, Record<ColorVariant, ColorEntities>> = {
    light: {
        primary: getColors([0,0,0], [255,255,255]),

        secondary: getColors([100,100,100], [150,150,150]),

        error: getColors([240,70,70], [240,70,70]),

        info: getColors([100,140,255], [100,140,255]),

        warning: getColors([250,150,50], [250,150,50]),
    },

    dark: {
        primary: getColors([250,250,250], [50,50,50]),
        
        secondary: getColors([0,0,0], [255,255,255]),
        
        error: getColors([240,70,70], [240,70,70]),

        info: getColors([100,140,255], [100,140,255]),

        warning: getColors([250,150,50], [250,150,50]),
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
