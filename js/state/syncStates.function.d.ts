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
/** @deprecated favor using syncSupports */
export declare function syncStates(stateFrom: State, stateTo: State, intoStates: StatesSetter[], statesFrom: StatesSetter[]): void;
