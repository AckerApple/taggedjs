import { AnySupport } from '../tag/Support.class.js';
import { Callback } from './callbackMaker.function.js';
import { StatesSetter } from './states.utils.js';
import { State } from './state.types.js';
export default function callbackStateUpdate<T>(support: AnySupport, callback: Callback<any, any, any, any, any, any, T>, oldState: {
    stateArray: State;
    states: StatesSetter[];
}, // State,
...args: any[]): T;
