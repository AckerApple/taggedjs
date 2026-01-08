import { ContextItem } from '../tag/index.js';
import { ElementFunction } from './ElementFunction.type.js';
type AttrFn = (item: any, args: [name: string | unknown, value?: any]) => any;
export type AttributeCallable = {
    (strings: TemplateStringsArray, ...values: any[]): ElementFunction;
    (value: string): ElementFunction;
    (value: (context: ContextItem) => any): ElementFunction;
};
type AttrCallableInternal = (item: any, stringsOrValue: TemplateStringsArray | string | object | ((context: ContextItem) => any), values: any[]) => ElementFunction;
export declare function makeAttrCallable(attrName: string, attr: AttrFn): AttrCallableInternal;
export {};
