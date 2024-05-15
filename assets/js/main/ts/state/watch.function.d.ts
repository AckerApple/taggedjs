import { Subject } from '../subject';
export type WatchCallback<T> = (currentValues: any[], previousValues: any[] | undefined) => T | ((currentValues: any[]) => T) | (() => T);
/**
 * When an item in watch array changes, callback function will be triggered. Triggers on initial watch setup. TIP: try watch.noInit()
 * @param currentValues T[]
 * @param callback WatchCallback
 * @returns T[]
 */
export declare const watch: {
    <T>(currentValues: any[], callback: WatchCallback<T>): T;
    /** When an item in watch array changes, callback function will be triggered. Does not trigger on initial watch setup. */
    noInit<T_1>(currentValues: any[], callback: WatchCallback<T_1>): T_1 | undefined;
    /** When an item in watch array changes and all values are truthy then callback function will be triggered */
    truthy<T_2>(currentValues: any[], callback: WatchCallback<T_2>): Subject<T_2>;
    /** When an item in watch array changes, callback function will be triggered */
    asSubject<T_3>(currentValues: any[], callback: WatchCallback<T_3>): Subject<T_3>;
};
