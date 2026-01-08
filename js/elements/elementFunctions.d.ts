import { InputElementTargetEvent } from '../TagJsEvent.type.js';
import { AttributeCallable } from './attributeCallables.js';
import { ElementVar } from './ElementFunction.type.js';
export declare function elementFunctions(item: any): {
    onClose: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onDoubleClick: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onClick: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onBlur: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onChange: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onMousedown: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onMouseup: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onKeydown: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    onKeyup: (callback: (e: InputElementTargetEvent) => any) => import("./ElementFunction.type.js").ElementFunction;
    attr: (...args: any[]) => import("./ElementFunction.type.js").ElementFunction;
    /** Used for setting array index-key value */
    key: (arrayValue: any) => /*elided*/ any;
    /** Use as div.style`border:${border}` or div.style(() => `border:${border}`) */
    style: AttributeCallable;
    /** Use as div.id`main` or div.id(() => `main-${1}`) */
    id: AttributeCallable;
    /** Use as div.class`primary` or div.class(() => `primary`) */
    class: AttributeCallable;
    /** Use as a.href`/path` or a.href(() => `/path`) */
    href: AttributeCallable;
};
/** used during updates */
export declare function registerMockAttrContext(value: any, mockElm: ElementVar): void;
export declare function isValueForContext(value: any): any;
export declare function loopObjectAttributes(item: ElementVar, object: any): import("./ElementFunction.type.js").ElementFunction;
