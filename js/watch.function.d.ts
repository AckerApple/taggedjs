export type WatchCallback = (currentValues: any[], previousValues: any[] | undefined) => unknown | ((currentValues: any[]) => unknown) | (() => unknown);
/** When an item in watch array changes, callback function will be triggered */
export declare function watch(currentValues: unknown[], callback: WatchCallback): {
    currentValues: unknown[];
    previousValues: undefined;
} | {
    currentValues: unknown[];
    previousValues: unknown[];
};
