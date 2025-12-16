import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../../tag/index.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { TagVarIdNum } from './getTagJsVar.function.js';
import { NoDisplayValue } from './NoDisplayValue.type.js';
import { SpecialDefinition } from './Special.types.js';
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js';
/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export declare function processAttribute(attrName: string | TagVarIdNum, value: string | null | undefined | TagVarIdNum, values: unknown[], // all the variables inside html``
element: HTMLElement, support: AnySupport, howToSet: HowToSet, //  = howToSetInputValue
contexts: ContextItem[], parentContext: ContextItem, isSpecial: SpecialDefinition): ContextItem | ContextItem[] | void;
/** Only used during updates */
export declare function processAttributeEmit(newAttrValue: any, attrName: string, subject: AttributeContextItem, element: HTMLElement, support: AnySupport, howToSet: HowToSet, isSpecial: SpecialDefinition): void;
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean;
/** figure out what type of attribute we are dealing with and/or feed value into handler to figure how to update */
export declare function processAttributeSubjectValue(newAttrValue: DisplayValue | NoDisplayValue, element: HTMLElement, attrName: string, special: SpecialDefinition, howToSet: HowToSet, support: AnySupport): void;
export declare function processTagCallbackFun(newAttrValue: any, support: AnySupport, attrName: string, element: Element): void;
export {};
