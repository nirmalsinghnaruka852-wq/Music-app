import { ARRAY } from "../../Types/array.type";
import { RANGE } from "../../Types/number.type";
import { FontSize, Theme, ThemeProviderStates } from "./types";


export const _fontSize: ThemeProviderStates['fontSize'] = ['xs', 'sm', 'mg', 'lg', 'xl'].reduce((acc, size, index) => {
    
    type Size = "xs" | "sm" | "md" | "lg" | "xl";
    type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

    acc[size as Size] = 8 * (index + 1);

    for(let i of [1, 2, 3, 4, 5, 6, 7]) {
        const key: FontSize = `${size as Size}-${i as Step}`
        acc[key] = (8 * (index + 1) + i);
    }

    return acc;

}, {} as ThemeProviderStates['fontSize'])



const getColors = <RGB extends ARRAY<RANGE<0, 255>, 3>>(text: RGB, bg: RGB) => ({
    text: `rgb(${text.join(',')})`,
    bg: `rgb(${bg.join(',')})`,
    rgb: {text, bg}
})


export const _colors: Omit<Record<Theme, ThemeProviderStates['colors']>, 'system'> = {
    light: {
        primary: getColors([0,0,0], [255,255,255]),

        secondary: getColors([100,100,100], [150,150,150]),

        error: getColors([240,70,70], [240,70,70]),

        info: getColors([100,140,255], [100,140,255]),

        warning: getColors([250,150,50], [250,150,50]),
    },

    dark: {
        primary: getColors([100,100,100], [150,150,150]),
        
        secondary: getColors([0,0,0], [255,255,255]),
        
        error: getColors([240,70,70], [240,70,70]),

        info: getColors([100,140,255], [100,140,255]),

        warning: getColors([250,150,50], [250,150,50]),
    }
}