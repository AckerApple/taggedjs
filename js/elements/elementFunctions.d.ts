import { InputElementTargetEvent } from '../TagJsEvent.type.js';
import { ElementVar } from './htmlTag.function.js';
import { AttributeCallable } from './attributeCallables.js';
export declare function elementFunctions(item: any): {
    onClose: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onDoubleClick: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onClick: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onBlur: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onChange: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onMousedown: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onMouseup: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onKeydown: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    onKeyup: (callback: (e: InputElementTargetEvent) => any) => import("./htmlTag.function.js").ElementFunction;
    attr: (...args: any[]) => import("./htmlTag.function.js").ElementFunction;
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
export declare function loopObjectAttributes(item: ElementVar, object: any): import("./htmlTag.function.js").ElementFunction;
