import { useSyncExternalStore } from "react";
import { 
    AsyncHandler,
    AutoBuildHandler, AutoBuildHandlerRecord, 
    CreateStoreContextProps, ExtractActionType, HandlerRecord, States, SyncHandler 
} from "./types";



export default function createStore<
    S extends States,
    SH extends Record<string, SyncHandler<S>> = Record<string, SyncHandler<S>>,
    AH extends Record<string, AsyncHandler<S>> = Record<string, AsyncHandler<S>>
>({states, syncHandlers, asyncHandlers}: CreateStoreContextProps<S, SH, AH>) {

    const allHandlers: HandlerRecord<S, SH, AH> = Object.freeze(
        Object.fromEntries([
            ...Object.entries(syncHandlers ?? {}).map(([key, cb]) => [
                key, (action: ExtractActionType<typeof cb>) => {cb(states, action); notify();}
            ]),
            ...Object.entries(asyncHandlers ?? {}).map(([key, cb]) => [
                key, async (action: ExtractActionType<typeof cb>) => {await cb(states, action); notify();}
            ]),
            ...Object.entries(cookDefaultHandlers(states, notify))
        ])
    ) as HandlerRecord<S, SH, AH>


    const consumers = new Set<() => void>();

    
    function consume(consumer: () => void) {
        consumers.add(consumer);
        return () => consumers.delete(consumer);
    }


    function notify() {
        consumers.forEach(con => con());
    }


    const snapshotCache = new WeakMap<(state: S) => object, object>();


    function getSnapshot<T extends object>(selector: (state: S) => T): T {
        const newSnapshot = selector(states);
        const cachedSnapshot = snapshotCache.get(selector);

        if(cachedSnapshot && shallowEqual(newSnapshot, cachedSnapshot)) {
            return cachedSnapshot as T;
        }
            
        snapshotCache.set(selector, newSnapshot);
        return Object.freeze(newSnapshot);
    }
    
    
    function useStore<T extends object>(selector: (state: S) => T): T {
        return useSyncExternalStore(
            consume,
            () => getSnapshot(selector),
            () => getSnapshot(selector)
        )
    }


    function useHandlers(): HandlerRecord<S, SH, AH> {
        return allHandlers;
    }


    return {
        useStore,
        useHandlers
    }
  
}



function cookDefaultHandlers<S extends States>(states: S, cb: () => void): AutoBuildHandlerRecord<S> {

    const withCallback = <R>(fun: (...args: any[]) => R) => {
        return (...args: any[]): R => {
            const val = fun(...args);
            cb();
            return val;
        }
    }


    const defaultStates: S = JSON.parse(JSON.stringify(states));

    
    return Object.fromEntries(
        Object.entries(states).map(([key, val]: [keyof S, S[keyof S]]) => {
            const handlers: AutoBuildHandler<S[keyof S]> = {
                set: withCallback((action) => {
                    states[key] = typeof action === 'function' ? action(states[key]) : action;
                }),

                reset: withCallback(() => {
                    states[key] = defaultStates[key];
                }),
                
                ...(
                    Array.isArray(val) ? {
                        push: withCallback((val) => {
                            states[key] = [...states[key], val] as S[keyof S]
                        }),
                        
                        pop: withCallback(() => {
                            states[key] = states[key].slice(0, -1)
                        }),

                        shift: withCallback(() => {
                            states[key] = states[key].slice(1)
                        }),
                        
                        unshift: withCallback((val) => {
                            states[key] = [val, ...states[key]] as S[keyof S]
                        }),

                        filter: withCallback((cb) => {
                            states[key] = states[key].filter(cb)
                        }),

                        map: withCallback((cb) => {
                            states[key] = states[key].map(cb)
                        })

                    } : val && typeof val === "object" ? {
                        update: withCallback((_path, val) => {
                            let temp: any = states[key];
                            const path = _path.split('.');

                            const fn = (obj: any, index = 0): S[keyof S] => {
                                if (path.length === index) return val;
                                const key = path[index];

                                return {
                                    ...obj,
                                    [key]: fn(obj?.[key] ?? {}, index + 1)
                                };
                            }

                            states[key] = fn(states[key]);
                        }),

                        updateMany: withCallback((val) => {
                            const fn = (target: any, source: any) => {
                                if (typeof source !== "object" || source === null) return source;
                                if (Array.isArray(source)) return source;

                                const result = { ...target };

                                for (const key in source) {
                                    if (Object.prototype.hasOwnProperty.call(target, key)) {
                                        result[key] = fn(target[key], source[key]);
                                    }
                                }

                                return result;
                            }

                            states[key] = fn(states[key], val);
                        })
                    } : {}
                )
            } as unknown as AutoBuildHandler<S[keyof S]>
            
            return [key, handlers]
        })
    ) as unknown as AutoBuildHandlerRecord<S>
}


function shallowEqual(a: any, b: any) {
    if(a === b) return true;
    
    if(typeof a !== 'object' || typeof b !== 'object') return false;

    if(Array.isArray(a) !== Array.isArray(b)) return false;

    const key1 = Object.keys(a);
    const key2 = Object.keys(b);

    if(key1.length !== key2.length) return false;

    for(let key of key1) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (!Object.is(a[key], b[key])) return false;
    }

    return true;
}