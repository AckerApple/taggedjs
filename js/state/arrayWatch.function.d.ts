import { SignalArray } from './array.function.js';
/** Changes in supplied array will cause calling tag to render */
export declare function arrayWatch<T>(initialValue?: T[], onChange?: (array: T[]) => any): SignalArray<T>;
