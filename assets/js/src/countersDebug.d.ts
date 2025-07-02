import { Subject, ValueSubject } from "taggedjs";
export declare const counters: import("taggedjs").TaggedFunction<({ appCounterSubject }: {
    appCounterSubject: Subject<number>;
}, _?: any) => import("taggedjs").Tag>;
export declare const innerCounterContent: () => (statesRenderCount?: number, statesRenderCount2?: number, counter?: number, counter2?: number, renderCount?: number, propCounter?: number, initCounter?: number, callbacks?: <A, B, C, D, E, F, T>(_callback: import("taggedjs").Callback<A, B, C, D, E, F, T>) => (_a?: A, _b?: B, _c?: C, _d?: D, _e?: E, _f?: F) => T, callbackTo?: (A?: unknown, B?: unknown, C?: unknown, D?: unknown, E?: unknown, F?: unknown) => void, increasePropCounter?: () => void, immutableProps?: {
    propCounter: number;
    increasePropCounter: () => void;
}, _?: void, callbackTestSub?: Subject<number>, callbackTestSub2?: Subject<number>, pipedSubject0?: ValueSubject<string>, increaseCounter?: () => void, pipedSubject1?: Subject<[string, number]>, pipedSubject2?: Subject<[string, number]>, memory?: {
    counter: number;
}, readStartTime?: number, __?: void) => import("taggedjs").Tag;
