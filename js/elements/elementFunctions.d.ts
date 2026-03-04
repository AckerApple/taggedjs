import { AttrValue, ElementFunction } from './ElementFunction.type.js';
export type Attrs = {
    [name: string]: AttrValue;
};
export declare function elementFunctions(item: any): {
    attr: (...args: any[]) => ElementFunction;
    attrs: (attributes: Attrs) => ElementFunction;
    /** Used for setting array index-key value */
    key: (arrayValue: any) => /*elided*/ any;
};
/** used during updates */
export declare function registerMockAttrContext(value: any, mockElm: ElementFunction): void;
export declare function isValueForContext(value: any): any;
export declare function loopObjectAttributes(item: ElementFunction, object: any): ElementFunction;
