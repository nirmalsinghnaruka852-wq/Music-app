import { FontSize, Theme } from "./types";
import { _colors, _fontSize } from "./constance";
import { createStore } from "@fun-tools/store";



const {useStore, useHandlers} = createStore({
    states: {
        theme: 'dark' as Theme,
        colors: _colors['dark'],
        fontSize: _fontSize,
    },

    syncHandlers: {
        toggleTheme(state) {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            state.colors = _colors[state.theme];
        },

        mapFontSize(state, val) {
            for(let key in state.fontSize) 
                state.fontSize[key as FontSize]  *= val;
        }
    }
})

export {
    useStore as useThemeStore,
    useHandlers as useThemeHandlers
}