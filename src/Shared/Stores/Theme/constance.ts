import { Theme, ColorStates } from "./types";

export const _theme: Theme = 'dark';

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