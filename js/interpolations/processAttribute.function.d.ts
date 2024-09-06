import { HowToSet } from './interpolateAttributes.js';
import { AnySupport } from '../tag/Support.class.js';
import { ContextItem } from '../tag/Tag.class.js';
export type AttrCombo = [
    string,
    (ContextItem | string | null)?
];
/** Sets attribute value, subscribes to value updates  */
export declare function processAttribute(attrs: AttrCombo, element: Element, support: AnySupport, howToSet?: HowToSet): void;
export declare function processNameValue(attrName: string, value: any, element: Element, howToSet: HowToSet): void;
export declare function processNameOnlyEmit(value: any, support: AnySupport, subject: ContextItem, element: Element, howToSet: HowToSet): void;
export declare function processAttributeEmit(isSpecial: boolean, newAttrValue: any, attrName: string, result: ContextItem, element: Element, support: AnySupport, howToSet: HowToSet): any;
export type NoDisplayValue = false | null | undefined;
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean;
export declare function processAttributeSubjectValue(newAttrValue: DisplayValue | NoDisplayValue, element: Element, attrName: string, isSpecial: boolean, howToSet: HowToSet, support: AnySupport, subject: ContextItem): any;
export {};
