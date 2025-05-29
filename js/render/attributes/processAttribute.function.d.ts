import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import type { TagCounts } from '../../tag/TagCounts.type.js';
import { TagVarIdNum } from './getTagJsVar.function.js';
import { NoDisplayValue } from './NoDisplayValue.type.js';
import { SpecialDefinition } from './Special.types.js';
/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export declare function processAttribute(values: unknown[], // all the variables inside html``
attrName: string | TagVarIdNum, element: Element, support: AnySupport, howToSet: HowToSet, //  = howToSetInputValue
context: ContextItem[], isSpecial: SpecialDefinition, counts: TagCounts, value: string | null | undefined | TagVarIdNum): void;
export declare function processNameOnlyAttrValue(values: unknown[], attrValue: string | boolean | Record<string, any>, element: Element, ownerSupport: AnySupport, howToSet: HowToSet, context: ContextItem[], counts: TagCounts): void;
export declare function processAttributeEmit(newAttrValue: any, attrName: string, subject: ContextItem, element: Element, support: AnySupport, howToSet: HowToSet, isSpecial: SpecialDefinition, counts: TagCounts): void;
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean;
export declare function processAttributeSubjectValue(newAttrValue: DisplayValue | NoDisplayValue, element: Element, attrName: string, special: SpecialDefinition, howToSet: HowToSet, support: AnySupport, counts: TagCounts): void;
export declare function processTagCallbackFun(subject: ContextItem, newAttrValue: any, support: AnySupport, attrName: string, element: Element): void;
export {};
