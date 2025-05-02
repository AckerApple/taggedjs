/** File largely responsible for reacting to element events, such as onclick */
import { AnySupport } from '../../tag/getSupport.function.js';
import { TagGlobal } from '../../tag/getTemplaterResult.function.js';
import { StatesSetter } from '../../state/states.utils.js';
export type Callback = (...args: any[]) => any;
export declare function bindSubjectCallback(value: Callback, support: AnySupport): {
    (element: Element, args: any[]): any;
    tagFunction: Callback;
    support: AnySupport;
    states: StatesSetter[];
};
export declare function runTagCallback(value: Callback, support: AnySupport, states: StatesSetter[], bindTo: unknown, args: any[]): any;
export declare function afterTagCallback(callbackResult: any, eventHandlerSupport: AnySupport): any;
export declare function checkAfterCallbackPromise(callbackResult: any, last: AnySupport, global: TagGlobal): any;
export declare function runBlocked(tag: AnySupport): AnySupport;
