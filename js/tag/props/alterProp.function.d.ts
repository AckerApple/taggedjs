import { AnySupport } from '../AnySupport.type.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { Props } from '../../Props.js';
import { UnknownFunction } from '../index.js';
import { Subject } from '../../subject/Subject.class.js';
export declare function castProps(props: Props, newSupport: AnySupport, depth: number): unknown[];
export declare function checkProp(value: unknown | TemplaterResult | SubableProp | unknown[] | Record<string, unknown>, ownerSupport: AnySupport, newSupport: AnySupport, depth: number, owner?: any): unknown;
type SubableProp = {
    [name: string]: {
        subscription: Subject<void>;
    };
};
export type WrapRunner = (() => unknown) & {
    original: unknown;
    mem: UnknownFunction;
    toCall: UnknownFunction;
};
export declare function getPropWrap(value: {
    mem?: unknown;
}, owner: any, ownerSupport: AnySupport): {
    mem?: unknown;
};
/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export declare function callbackPropOwner(toCall: UnknownFunction, // original function
owner: any, callWith: unknown[], ownerSupport: AnySupport): unknown;
export declare function isSkipPropValue(value: unknown): string | true;
export {};
