/** File largely responsible for reacting to element events, such as onclick */
import { AnySupport } from '../../tag/index.js';
export declare function checkToResolvePromise(callbackResult: any, last: AnySupport, { resolvePromise, resolveValue }: {
    resolvePromise: (value: any) => any;
    resolveValue: (value: any) => any;
}): any;
export declare function thenResolveBy(last: AnySupport, resolvePromise: (value: any) => any): (x: any) => any;
