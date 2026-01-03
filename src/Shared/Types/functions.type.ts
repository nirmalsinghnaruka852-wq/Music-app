import { Animated } from "react-native"

export type UseSelector<A, R=A> = {
    (): R,
    <T>(cb: (s: A) => T) : T
}

const interpol = new Animated.Value(0).interpolate;
export type AnimatedInterpolValue = ReturnType<typeof interpol>;