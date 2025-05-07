import { AnySupport } from '../tag/AnySupport.type.js';
import { Callback } from './callbackMaker.function.js';
import { StatesSetter } from './states.utils.js';
export default function callbackStateUpdate<T>(support: AnySupport, oldStates: StatesSetter[], callback: Callback<any, any, any, any, any, any, T>, ...args: any[]): T;
