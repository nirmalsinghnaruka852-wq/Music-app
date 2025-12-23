import { ARRAY } from "../../Types/array.type";
import { RANGE } from "../../Types/number.type";

export type Theme = 'light' | 'dark';
export type SetTheme = (theme: Theme) => void;


export type ColorEntities = {
    text: string, 
    bg: string,
    rgb: {
        text: ARRAY<RANGE<0, 255>, 3>,
        bg: ARRAY<RANGE<0, 255>, 3>   
    }
};

export type ColorVariant = 'primary' | 'secondary' | 'error' | 'info' | 'warning';
export type HandleColor = (state: ColorVariant, val: Partial<ColorEntities>) => void;


export type FontSize = `${'xs' | 'sm' | 'md' | 'lg' | 'xl'}${`-${1 | 2 | 3 | 4 | 5 | 6 | 7}` | ''}`;
export type MapFontSize = (val: number) => void;


export type ThemeProviderStates = {
    theme: Theme,
    setTheme: SetTheme,

    colors: Record<ColorVariant, ColorEntities>,
    handleColor: HandleColor,

    fontSize: Record<FontSize, number>,
    mapFontSize: MapFontSize
}
