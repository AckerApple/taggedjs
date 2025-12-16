/** File largely responsible for reacting to element events, such as onclick */
import { AnySupport } from '../../tag/index.js';
export type Callback = (...args: any[]) => any;
export declare function bindSubjectCallback(value: Callback, support: AnySupport): {
    (element: Element, args: any[]): any;
    tagFunction: Callback;
    support: AnySupport;
};
export declare function runTagCallback(value: Callback, support: AnySupport, bindTo: unknown, args: any[]): any;
export declare function afterTagCallback(callbackResult: any, last: AnySupport): any;
