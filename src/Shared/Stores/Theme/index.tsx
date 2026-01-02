import { Theme } from "./types";
import { _colors } from "./constance";
import { createStore } from "@fun-tools/store";



const {useStore, useHandlers} = createStore({
    states: {
        theme: 'light' as Theme,
        colors: _colors['light']
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