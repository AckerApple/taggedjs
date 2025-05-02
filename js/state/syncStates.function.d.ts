import { AnySupport } from '../tag/getSupport.function.js';
import { State } from './state.types.js';
import { StatesSetter } from './states.utils.js';
/**
 * Sync two supports
 * @param support FROM
 * @param newestSupport  ONTO
 * @returns
 */
export declare function syncSupports(support: AnySupport, // from
newestSupport: AnySupport): void;
export declare function syncStatesArray(from: StatesSetter[], onto: StatesSetter[]): void;
export declare function syncStates(from: StatesSetter, onto: StatesSetter): void;
/** @deprecated favor using syncSupports */
export declare function oldSyncStates(stateFrom: State, stateTo: State, intoStates: StatesSetter[], statesFrom: StatesSetter[]): void;
