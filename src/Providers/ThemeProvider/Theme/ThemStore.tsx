import {createStore } from '@fun-tools/store'
import { _colors, _fontSize } from '../constance'
import { FontSize } from '../types'

type theme = 'light'|'dark'



const ThemStore = createStore({
    states:{
        theme: 'dark' as theme,
        colors: _colors['dark'], 
        fontSize: _fontSize,      
    },


    syncHandlers:{
        mapFontSize:(state ,value)=>{
            const mapVal = {...state.fontSize}
          
            for(let key in mapVal) 
                mapVal[key as FontSize]  *= value;
        
            state.fontSize = mapVal
        },

        handleColor:( state,state2, value )=>{   
            state.colors = {...state.colors, [state2]: {...state.colors[state2], ...value}
        }

    }
       
})


export default ThemStore