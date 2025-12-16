import { SupportContextItem } from '../index.js';
import { Callback } from './callbackMaker.function.js';
import { StatesSetter } from './states.utils.js';
export default function callbackStateUpdate<T>(context: SupportContextItem, _oldStates: StatesSetter[], callback: Callback<any, any, any, any, any, any, T>, ...args: any[]): T;
