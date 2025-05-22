import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import type { TagCounts } from '../../tag/TagCounts.type.js';
type TagVarIdNum = {
    tagJsVar: number;
};
export type SpecialAction = 'init' | 'destroy';
export type SpecialDefinition = boolean | SpecialAction | 'class' | 'style' | 'autofocus' | 'autoselect';
/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export declare function processAttribute(values: unknown[], attrName: string | TagVarIdNum, element: Element, support: AnySupport, howToSet: HowToSet, //  = howToSetInputValue
context: ContextItem[], isSpecial: SpecialDefinition, counts: TagCounts, value: string | null | undefined | TagVarIdNum): void;
export declare function processNameOnlyAttrValue(values: unknown[], attrValue: string | boolean | Record<string, any>, element: Element, ownerSupport: AnySupport, howToSet: HowToSet, context: ContextItem[], counts: TagCounts): void;
/** Processor for flat attributes and object attributes */
export declare function processAttributeEmit(newAttrValue: any, attrName: string, subject: ContextItem, element: Element, support: AnySupport, howToSet: HowToSet, isSpecial: SpecialDefinition, counts: TagCounts): void;
export type NoDisplayValue = false | null | undefined;
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean;
export declare function processAttributeSubjectValue(newAttrValue: DisplayValue | NoDisplayValue, element: Element, attrName: string, special: SpecialDefinition, howToSet: HowToSet, support: AnySupport, counts: TagCounts): void;
export declare function processTagCallbackFun(subject: ContextItem, newAttrValue: any, support: AnySupport, attrName: string, element: Element): void;
export declare function isNoDisplayValue(attrValue: any): boolean;
export {};
