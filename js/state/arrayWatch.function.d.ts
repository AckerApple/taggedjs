import { SignalArray } from './array.signal.js';
/** Changes in supplied array will cause calling tag to render */
export declare function arrayWatch<T>(initialValue?: T[], onChange?: (array: T[]) => any): SignalArray<T>;
