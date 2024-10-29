import { AnySupport } from '../tag/Support.class.js';
import { State, StateConfig } from './state.types.js';
import { StateMemory } from './StateMemory.type.js';
export type GetSet<T> = (y: T) => [T, T];
export declare function initState(support: AnySupport, config: StateMemory): void;
export declare function reState(support: AnySupport, config: StateMemory, prevState: State): void;
export declare class StateEchoBack {
}
export declare function getCallbackValue<T>(callback: StateConfig<T>): [T, T];
