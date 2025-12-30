import { ARRAY } from "../../Types/array.type";
import { RANGE } from "../../Types/number.type";

export type Theme = 'light' | 'dark';

export type ColorEntities = {
    text: string, 
    bg: string,
    rgb: {
        text: ARRAY<RANGE<0, 255>, 3>,
        bg: ARRAY<RANGE<0, 255>, 3>   
    }
};


export type ColorVariant = 'primary' | 'secondary' | 'error' | 'info' | 'warning';