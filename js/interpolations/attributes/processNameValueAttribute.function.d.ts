import { HowToSet } from './howToSetInputValue.function.js';
import { TagGlobal } from '../../tag/getTemplaterResult.function.js';
import { SpecialDefinition } from '../../render/attributes/Special.types.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { AnySupport } from '../../tag/index.js';
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js';
export declare function processDynamicNameValueAttribute(attrName: string, value: any | TagGlobal, contextItem: AttributeContextItem, element: Element, howToSet: HowToSet, support: AnySupport, isSpecial: SpecialDefinition): void | ContextItem;
export declare function processNonDynamicAttr(attrName: string, value: string, element: Element, howToSet: HowToSet, isSpecial: SpecialDefinition, context: ContextItem): ContextItem | void;
