import { AnySupport } from '../tag/Support.class.js';
import { State } from './state.types.js';
import { Callback } from './callbackMaker.function.js';
export default function callbackStateUpdate<T>(support: AnySupport, callback: Callback<any, any, any, any, any, any, T>, oldState: State, ...args: any[]): T;
