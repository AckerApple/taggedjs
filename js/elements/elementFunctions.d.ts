import { AttrValue, ElementFunction } from './ElementFunction.type.js';
export type Attrs = {
    [name: string]: AttrValue;
};
export declare function elementFunctions(_item: any): {
    attr: (this: ElementFunction, ...args: any[]) => ElementFunction;
    attrs: (this: ElementFunction, attributes: Attrs) => ElementFunction;
    /** Used for setting array index-key value */
    key: (this: ElementFunction, arrayValue: any) => ElementFunction;
};
/** used during updates */
export declare function registerMockAttrContext(value: any, mockElm: ElementFunction): void;
export declare function isValueForContext(value: any): any;
export declare function loopObjectAttributes(item: ElementFunction, object: any): ElementFunction;
