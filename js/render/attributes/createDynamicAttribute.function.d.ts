import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import type { TagCounts } from '../../tag/TagCounts.type.js';
import { SpecialDefinition } from './Special.types.js';
/** Support string attributes with dynamics Ex: <div style="color:black;font-size::${fontSize};"></div> */
export declare function createDynamicArrayAttribute(attrName: string, array: any[], element: HTMLElement, context: ContextItem[], howToSet: HowToSet, //  = howToSetInputValue
support: AnySupport, counts: TagCounts, values: unknown[]): void;
export declare function createDynamicAttribute(attrName: string, value: any, element: Element, context: ContextItem[], howToSet: HowToSet, //  = howToSetInputValue
support: AnySupport, counts: TagCounts, isSpecial: SpecialDefinition): void;
