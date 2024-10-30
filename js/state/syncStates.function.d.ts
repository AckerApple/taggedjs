import { State } from './state.types.js';
import { StatesSetter } from './states.utils.js';
export declare function syncStates(stateFrom: State, stateTo: State, oldStates: StatesSetter[], statesFrom: StatesSetter[]): void;
