import { Theme } from "./types";
import { _colors, _theme } from "./constance";
import { createStore } from "@fun-tools/store";



const {useStore, useHandlers} = createStore({
    states: {
        theme: _theme,
        colors: _colors[_theme]
    },

    syncHandlers: {
        toggleTheme(state) {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            state.colors = _colors[state.theme];
        }
    }
})


export {
    useStore as useThemeStore,
    useHandlers as useThemeHandlers
}