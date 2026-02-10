import { InputElementTargetEvent } from '../index.js';
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js';
import { elementFunctions } from './elementFunctions.js';
import { ElementFunction } from './ElementFunction.type.js';
import { ElementVarBase } from './ElementVarBase.type.js';
export type TruthyVar = number | string | boolean | ((_: InputElementTargetEvent) => string | boolean | number);
export type Attributes = {
    onKeyup?: (_: InputElementTargetEvent) => any;
    onKeydown?: (_: InputElementTargetEvent) => any;
    onClick?: (_: InputElementTargetEvent) => any;
    onChange?: (_: InputElementTargetEvent) => any;
    onBlur?: (_: InputElementTargetEvent) => any;
    /** You may want to instead use "onClick" because "onclick" is a string function that runs in browser */
    onclick?: string;
    /** You may want to instead use "onChange" because "onchange" is a string function that runs in browser */
    onchange?: string;
    /** You may want to instead use "onBlur" because "onblur" is a string function that runs in browser */
    onblur?: string;
    checked?: TruthyVar;
    disabled?: TruthyVar;
    autofocus?: TruthyVar;
    class?: string | object | ((_: InputElementTargetEvent) => string | object);
    style?: string | object | ((_: InputElementTargetEvent) => string | object);
    attr?: string | object | TagJsTag | void | undefined | ((_: InputElementTargetEvent) => any);
} & {
    [attrName: string]: object | string | boolean | number | TagJsTag | undefined | void | ((_: InputElementTargetEvent) => any);
};
export declare function htmlTag(tagName: string): ElementFunction;
export declare function getPushKid(element: ElementVarBase, _elmFunctions: typeof elementFunctions): ElementFunction;
