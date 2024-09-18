import { SyncCallbackError } from '../errors.js';
export type Callback<A, B, C, D, E, F, T> = (a: A, b: B, c: C, d: D, e: E, f: F) => T;
type innerCallback = <A, B, C, D, E, F, T>(_callback: Callback<A, B, C, D, E, F, T>) => (_a?: A, _b?: B, _c?: C, _d?: D, _e?: E, _f?: F) => T;
export declare const callbackMaker: () => innerCallback;
export declare const syncError: SyncCallbackError;
export {};
