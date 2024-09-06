/** File largely responsible for reacting to element events, such as onclick */
import { BaseSupport, Support } from '../tag/Support.class.js';
import { TagGlobal } from '../tag/TemplaterResult.class.js';
export type Callback = (...args: any[]) => any;
export declare function bindSubjectCallback(value: Callback, support: BaseSupport | Support): {
    (element: Element, args: any[]): "no-data-ever" | Promise<string>;
    tagFunction: Callback;
    support: BaseSupport | Support;
};
export declare function runTagCallback(value: Callback, support: BaseSupport | Support, bindTo: unknown, args: any[]): "no-data-ever" | Promise<string>;
export declare function afterTagCallback(tag: BaseSupport | Support, callbackResult: any): "no-data-ever" | Promise<string>;
export declare function findTagToCallback(support: BaseSupport | Support): BaseSupport | Support;
export declare function checkAfterCallbackPromise(callbackResult: any, last: BaseSupport | Support, global: TagGlobal): "no-data-ever" | Promise<string>;
export declare function runBlocked(tag: BaseSupport | Support): BaseSupport | Support | undefined;
