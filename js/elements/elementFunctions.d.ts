import { InputElementTargetEvent } from '../TagJsEvent.type.js';
import { AttributeCallable } from './attributeCallables.js';
import { AttrValue, ElementFunction } from './ElementFunction.type.js';
export type Attrs = {
    [name: string]: AttrValue;
};
export declare function elementFunctions(item: any): {
    onClose: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onCancel: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onDoubleClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onBlur: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onChange: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onInput: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    contextMenu: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMousedown: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMouseup: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMouseover: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onMouseout: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onKeydown: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    onKeyup: (callback: (e: InputElementTargetEvent) => any) => ElementFunction;
    attr: (...args: any[]) => ElementFunction;
    attrs: (attributes: Attrs) => ElementFunction;
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
    /** Use as input.value`text` or input.value(() => `${value}`) */
    value: AttributeCallable;
    /** Use as input.placeholder`text` or input.placeholder(() => `${value}`) */
    placeholder: AttributeCallable;
    /** Use as input.src`text` or input.src(() => `${value}`) */
    src: AttributeCallable;
    /** Use as input.type`text` or input.type(() => `${value}`) */
    type: AttributeCallable;
    /** Use as input.type`text` or input.type(() => `${value}`) */
    title: AttributeCallable;
    /** Use as input.checked`boolean` or input.checked(() => `${boolean}`) */
    checked: AttributeCallable;
    /** Use as input.checked`boolean` or input.checked(() => `${boolean}`) */
    disabled: AttributeCallable;
    /** Use as input.checked`boolean` or input.checked(() => `${boolean}`) */
    selected: AttributeCallable;
    cellSpacing: AttributeCallable;
    cellPadding: AttributeCallable;
    border: AttributeCallable;
    minLength: AttributeCallable;
    maxLength: AttributeCallable;
    open: AttributeCallable;
};
/** used during updates */
export declare function registerMockAttrContext(value: any, mockElm: ElementFunction): void;
export declare function isValueForContext(value: any): any;
export declare function loopObjectAttributes(item: ElementFunction, object: any): ElementFunction;
