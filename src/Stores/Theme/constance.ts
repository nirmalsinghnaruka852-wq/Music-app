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