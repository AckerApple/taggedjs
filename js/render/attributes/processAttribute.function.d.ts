import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { ContextItem } from '../../tag/Context.types.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
type TagVarIdNum = {
    tagJsVar: number;
};
export type SpecialAction = 'init' | 'destroy';
export type SpecialDefinition = boolean | SpecialAction | 'class' | 'style' | 'autofocus' | 'autoselect';
/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export declare function processAttribute(values: unknown[], attrName: string | TagVarIdNum, element: Element, support: AnySupport, howToSet: HowToSet, //  = howToSetInputValue
context: ContextItem[], isSpecial: SpecialDefinition, counts: Counts, value: string | null | undefined | TagVarIdNum): void;
export declare function processNameOnlyAttrValue(values: unknown[], attrValue: string | boolean | Record<string, any>, element: Element, ownerSupport: AnySupport, howToSet: HowToSet, context: ContextItem[], counts: Counts): void;
export declare function processAttributeEmit(newAttrValue: any, attrName: string, subject: ContextItem, element: Element, support: AnySupport, howToSet: HowToSet, isSpecial: SpecialDefinition, counts: Counts): void;
export type NoDisplayValue = false | null | undefined;
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean;
export declare function processAttributeSubjectValue(newAttrValue: DisplayValue | NoDisplayValue, element: Element, attrName: string, special: SpecialDefinition, howToSet: HowToSet, support: AnySupport, counts: Counts): void;
export declare function processTagCallbackFun(subject: ContextItem, newAttrValue: any, support: AnySupport, attrName: string, element: Element): void;
export declare function isNoDisplayValue(attrValue: any): boolean;
export {};
