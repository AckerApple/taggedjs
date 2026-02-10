import { AnySupport } from '../index.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { Props } from '../../Props.js';
import { UnknownFunction } from '../index.js';
import { Subscription } from '../../index.js';
export declare function castProps(props: Props, newSupport: AnySupport, currentDepth: number): Props;
export declare function checkProp(value: unknown | TemplaterResult | SubableProp | unknown[] | Record<string, unknown>, ownerSupport: AnySupport, newSupport: AnySupport, depth: number, pos: number, owner?: any): unknown;
type SubablePropMeta = {
    subscription: Subscription<any>;
    restore: () => any;
};
type SubableProp = {
    [name: string]: SubablePropMeta;
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
export declare function isSkipPropValue(value: unknown): true | "component";
export {};
