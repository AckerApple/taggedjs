import { InputElementTargetEvent } from '../index.js';
import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js';
import { ReadOnlyVar, TagJsVar } from '../tagJsVars/tagJsVar.type.js';
import { elementFunctions } from './elementFunctions.js';
import { ElementVar } from './ElementFunction.type.js';
export type TruthyVar = number | string | boolean | ((_: InputElementTargetEvent) => string | boolean | number);
export type MockElmListener = [
    string,
    callback: ((e: InputElementTargetEvent) => any) & {
        toCallback: any;
    }
];
export type ElementVarBase = ReadOnlyVar & {
    tagName: string;
    innerHTML: any[];
    attributes: Attribute[];
    elementFunctions: typeof elementFunctions;
    /** Children and self contexts all together */
    contexts?: TagJsVar[];
    /** Just this element listeners */
    listeners: MockElmListener[];
    /** Parent and Child elements listeners */
    allListeners: MockElmListener[];
};
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
    autofocus?: TruthyVar;
    style?: string | object | ((_: InputElementTargetEvent) => string | object);
    attr?: string | object | TagJsVar | void | undefined | ((_: InputElementTargetEvent) => any);
} & {
    [attrName: string]: object | string | boolean | number | TagJsVar | undefined | void | ((_: InputElementTargetEvent) => any);
};
export declare function htmlTag(tagName: string): ElementVar;
export declare function getPushKid(element: ElementVarBase, _elmFunctions: typeof elementFunctions): ElementVar;
