import { HowToSet } from './howToSetInputValue.function.js';
import { AnySupport } from '../../tag/Support.class.js';
import { Context, ContextItem } from '../../tag/Context.types.js';
import { Counts } from '../interpolateTemplate.js';
type TagVarIdNum = {
    tagJsVar: number;
};
export type SpecialAction = 'init' | 'destroy';
export type SpecialDefinition = boolean | SpecialAction | 'class' | 'style' | 'autofocus' | 'autoselect';
/** Sets attribute value, subscribes to value updates  */
export declare function processAttribute(values: unknown[], attrName: string | TagVarIdNum, element: Element, support: AnySupport, howToSet: HowToSet, //  = howToSetInputValue
context: Context, isSpecial: SpecialDefinition, counts: Counts, value: string | null | undefined | TagVarIdNum): void;
export declare function updateNameOnlyAttrValue(values: unknown[], attrValue: string | boolean | Record<string, any>, lastValue: string | Record<string, any> | undefined, element: Element, ownerSupport: AnySupport, howToSet: HowToSet, context: Context, counts: Counts): void;
export declare function processNameOnlyAttrValue(values: unknown[], attrValue: string | boolean | Record<string, any>, element: Element, ownerSupport: AnySupport, howToSet: HowToSet, context: Context, counts: Counts): void;
export declare function processAttributeEmit(newAttrValue: any, attrName: string, subject: ContextItem, element: Element, support: AnySupport, howToSet: HowToSet, isSpecial: SpecialDefinition, counts: Counts): any;
export type NoDisplayValue = false | null | undefined;
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean;
export declare function processAttributeSubjectValue(newAttrValue: DisplayValue | NoDisplayValue, element: Element, attrName: string, special: SpecialDefinition, howToSet: HowToSet, support: AnySupport, counts: Counts): void;
export declare function processTagCallbackFun(subject: ContextItem, newAttrValue: any, support: AnySupport, attrName: string, element: Element): any;
export declare function isNoDisplayValue(attrValue: any): boolean;
export {};
