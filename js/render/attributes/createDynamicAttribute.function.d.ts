import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { AnySupport } from '../../tag/index.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { SpecialDefinition } from './Special.types.js';
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js';
/** Support string attributes with dynamics Ex: <div style="color:black;font-size::${fontSize};"></div> */
export declare function createDynamicArrayAttribute(attrName: string, array: any[], element: HTMLElement, contexts: ContextItem[], howToSet: HowToSet, //  = howToSetInputValue
values: unknown[], parentContext: ContextItem): ContextItem[];
export declare function createDynamicAttribute(attrName: string, value: any, element: HTMLElement, context: ContextItem[], parentContext: ContextItem, howToSet: HowToSet, //  = howToSetInputValue
support: AnySupport, isSpecial: SpecialDefinition, varIndex: number): void | AttributeContextItem;
