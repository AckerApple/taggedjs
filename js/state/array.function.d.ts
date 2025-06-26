import { SignalObject } from './signal.function.js';
export type SignalArray<T> = SignalObject<Array<T>> & Array<T>;
/** returns a signal that contains an array and mocks acting like an array to support root array functionality */
export declare function array<T>(initialValue?: T[]): SignalArray<T>;
