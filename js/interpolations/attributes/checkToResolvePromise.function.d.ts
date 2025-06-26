/** File largely responsible for reacting to element events, such as onclick */
import { AnySupport } from '../../tag/AnySupport.type.js';
import { TagGlobal } from '../../tag/getTemplaterResult.function.js';
export declare function checkToResolvePromise(callbackResult: any, last: AnySupport, global: TagGlobal, mode: 'bind' | 'onInit', { resolvePromise, resolveValue }: {
    resolvePromise: (value: any) => any;
    resolveValue: (value: any) => any;
}): any;
export declare function thenResolveBy(last: AnySupport, resolvePromise: (value: any) => any): (x: any) => any;
