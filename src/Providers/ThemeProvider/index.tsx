import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FontSize, HandleColor, MapFontSize, ThemeProviderStates } from "./types";
import { _colors, _fontSize } from "./constance";
import { UseSelector } from "../../Types/functions.type";



const fn = () => {}
export const _states: ThemeProviderStates = {
    theme: 'dark',
    setTheme: fn,

    colors: _colors['dark'],
    handleColor: fn,

    fontSize: _fontSize,
    mapFontSize: fn
}



const Context = createContext<ThemeProviderStates>(_states);



export default function ThemeProvider(props: {children: ReactNode}): React.JSX.Element {

    const [theme, setTheme] = useState(_states.theme);
    const [colors, setColors] = useState(_states.colors);
    const [fontSize, setFontSize] = useState(_states.fontSize);


    const mapFontSize: MapFontSize = (val) => {
        setFontSize(pre => {
            const mapVal = {...pre};
          
            for(let key in mapVal) 
                mapVal[key as FontSize]  *= val;

            return mapVal;
        })
    }


    const handleColor: HandleColor = (state, val) => {
        setColors(pre => ({...pre, [state]: {...pre[state], ...val}}))
    }


    const states = {
        theme, setTheme,
        colors, handleColor,
        fontSize, mapFontSize
    }


    useEffect(() => {
        setColors(_colors[theme])
    }, [theme])


    return <Context.Provider value={states} {...props} />
}



export const useTheme: UseSelector<ThemeProviderStates> = (cb?: any) => {
    const states = useContext(Context);
    return cb?.(states) ?? states;
}

// export const useThemeHandlers = () => {
//     const handlers = useContext(Context);

// }