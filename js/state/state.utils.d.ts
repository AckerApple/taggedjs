import { ContextItem } from '../tag/index.js';
import { StateConfig } from './state.types.js';
/** To be called before rendering anything with a state */
export declare function initState(context: ContextItem): void;
export declare class StateEchoBack {
}
/** sends a fake value and then sets back to received value */
export declare function getCallbackValue<T>(callback: StateConfig<T>): [T, T];
