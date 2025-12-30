import { useRef } from "react"
import {Animated} from "react-native"

type Animate =  Animated.Value

export function useAnimatedValues (val:number ):Animate{
     const variable = useRef<Animate>(new Animated.Value(val))
     return variable.current 
}

// in futuer i will improve this and add the feature for the simplicity