export type UseSelector<A, R=A> = {
    (): R,
    <T>(cb: (s: A) => T) : T
}