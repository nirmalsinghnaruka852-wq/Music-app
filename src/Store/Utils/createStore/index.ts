import { useSyncExternalStore } from "react";
import { 
    AsyncHandlerRecord, AutoBuildHandler, AutoBuildHandlerRecord, 
    CreateStoreContextProps, HandlerRecord, States, SyncHandlerRecord 
} from "./types";



export default function createStore<S extends States, H extends SyncHandlerRecord<S>, AH extends AsyncHandlerRecord<S>>({states, handlers, asyncHandlers}: CreateStoreContextProps<S, H, AH>) {

    const allHandlers: HandlerRecord<S, H, AH> = Object.freeze(
        Object.fromEntries([
            ...Object.entries(handlers ?? {}).map(([key, cb]) => [
                key, (action: any) => {cb(states, action); notify();}
            ]),
            ...Object.entries(asyncHandlers ?? {}).map(([key, cb]) => [
                key, async (action: any) => {await cb(states, action); notify();}
            ]),
            ...Object.entries(cookDefaultHandlers(states, notify))
        ])
    )


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

        if(cachedSnapshot) {
            const hasChanged = Object.keys(newSnapshot).some(
                key => (newSnapshot as any)[key] !== (cachedSnapshot as any)[key]
            );

            if(!hasChanged) return cachedSnapshot as T;
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


    function useHandlers() {
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
                        push: withCallback((val) => states[key].push(val)),
                        pop: withCallback(() => states[key].pop()),
                        shift: withCallback(() => states[key].shift()),
                        unshift: withCallback(() => states[key].unshift()),

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

                            for(let i=0; i<path.length - 1; i++) 
                                temp = temp[path[i]];

                            temp[path[path.length - 1]] = val;
                        }),

                        updateMany: withCallback((val) => {
                            for(let secKey in val) {
                                if(Object.hasOwn(states[key], secKey)) {
                                    states[key][secKey] = val[secKey]
                                }
                            }
                        })
                    } : {}
                )
            } as unknown as AutoBuildHandler<S[keyof S]>
            
            return [key, handlers]
        })
    ) as unknown as AutoBuildHandlerRecord<S>
}