import { OBJECT_KEYS, OBJECT_VALUE } from "../../../Types/object.type";



export type States = Record<string, any>;
export type Action<T> = T | ((val: T) => T);



export type SyncHandlerRecord<S, A=any> = Record<string, (state: S, action: A) => void>;
export type AsyncHandlerRecord<S, A=any> = Record<string, (state: S, action: A) => Promise<void>>;



export type CreateStoreContextProps<
    S extends States, 
    H extends SyncHandlerRecord<S>, 
    AH extends AsyncHandlerRecord<S>
> = {
    states: S,
    handlers?: H,
    asyncHandlers?: AH
}



export type AutoBuildHandler<V> = {
    set: (cb: Action<V>) => void,
    reset: () => void
} & (
    V extends Array<infer T> ? {
        push: (val: T) => void,
        pop: () => T | null,
        shift: () => T | null,
        unshift: (val: T) => void,
        filter: (cb: (item: T) => boolean) => void,
        map: (cb: (item: T) => T) => void
    } : V extends States ? {
        update: (key: OBJECT_KEYS<V>, val: OBJECT_VALUE<V, OBJECT_KEYS<V>>) => void,
        updateMany: (val: Partial<V>) => void
    } : {}
)



export type AutoBuildHandlerRecord<S extends States> = {
    [K in keyof S]: AutoBuildHandler<S[K]>
}



type ExtractActionType<T> = T extends (state: any, action: infer A) => any ? A : never;

export type HandlerRecord<S extends States, H extends SyncHandlerRecord<S>, AH extends AsyncHandlerRecord<S>> = AutoBuildHandlerRecord<S> & {
    [K in keyof H]: (action: ExtractActionType<H[K]>) => void
} & {
    [K in keyof AH]: (action: ExtractActionType<AH[K]>) => Promise<void>
}