import { OBJECT_KEYS, OBJECT_VALUE } from "../../../Types/object.type";



export type States = Record<string, any>;
export type Action<T> = T | ((val: T) => T);

export type SyncHandler<S> = (state: S, action?: any) => void;
export type AsyncHandler<S> = (state: S, action?: any) => Promise<void>;


export type SyncHandlerRecord<S, SH extends Record<string, SyncHandler<S>> = Record<string, SyncHandler<S>>> = {
    [K in keyof SH]: (state: S, action?: ExtractActionType<SH[K]>) => void
};

export type AsyncHandlerRecord<S, AH extends Record<string, AsyncHandler<S>> = Record<string, AsyncHandler<S>>> = {
    [K in keyof AH]: (state: S, action?: ExtractActionType<AH[K]>) => Promise<void>
};



export type CreateStoreContextProps<
    S extends States,
    SH extends Record<string, SyncHandler<S>> = Record<string, SyncHandler<S>>,
    AH extends Record<string, AsyncHandler<S>> = Record<string, AsyncHandler<S>>
> = {
    states: S,
    syncHandlers?: SH,
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



export type ExtractActionType<T> = T extends (state: States, action: infer A) => void ? A : never;

type ReturnHandlers<S, V, R> = (
    V extends (state: S) => R ? (
        () => R 
    ) : V extends (state: S, action: infer A) => R ? (
        (action: A) => R
    ) : never
)

export type HandlerRecord<
    S extends States,
    SH extends Record<string, SyncHandler<S>> = Record<string, SyncHandler<S>>,
    AH extends Record<string, AsyncHandler<S>> = Record<string, AsyncHandler<S>>
> = AutoBuildHandlerRecord<S> & {
    [K in keyof SH]: ReturnHandlers<S, SH[K], void>
} & {
    [K in keyof AH]: ReturnHandlers<S, AH[K], Promise<void>>
}