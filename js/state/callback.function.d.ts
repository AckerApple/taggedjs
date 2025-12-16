import { ContextItem } from '../tag/index.js';
import { StateMemory } from './StateMemory.type.js';
/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export declare function callback<T extends (...args: any[]) => any>(callback: T): T;
type CallbackState = {
    callback: any;
};
export declare function createTrigger(context: ContextItem, oldState: StateMemory, callbackState: CallbackState): (...args: any[]) => unknown;
export {};
