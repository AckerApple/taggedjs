import { SignalObject } from '../jsTagVar/signal.function.js';
/** returns a signal that contains an array but also supplies array methods */
export declare function array<T>(initialValue?: T[]): (SignalObject<Array<T>> & Array<T>);
