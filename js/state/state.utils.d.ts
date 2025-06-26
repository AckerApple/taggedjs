import { AnySupport } from '../tag/AnySupport.type.js';
import { State, StateConfig } from './state.types.js';
export declare function initState(support: AnySupport): void;
export declare function reState(newSupport: AnySupport, prevSupport: AnySupport, prevState: State): void;
export declare class StateEchoBack {
}
/** sends a fake value and then sets back to received value */
export declare function getCallbackValue<T>(callback: StateConfig<T>): [T, T];
