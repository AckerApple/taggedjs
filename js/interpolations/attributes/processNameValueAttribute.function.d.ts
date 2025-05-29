import { HowToSet } from './howToSetInputValue.function.js';
import { TagGlobal } from '../../tag/getTemplaterResult.function.js';
import { SpecialDefinition } from '../../render/attributes/Special.types.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import type { TagCounts } from '../../tag/TagCounts.type.js';
export declare function processDynamicNameValueAttribute(attrName: string, value: any | TagGlobal, contextItem: ContextItem, element: Element, howToSet: HowToSet, support: AnySupport, counts: TagCounts, isSpecial: SpecialDefinition): void;
export declare function processNonDynamicAttr(attrName: string, value: string, element: Element, howToSet: HowToSet, counts: TagCounts, support: AnySupport, isSpecial: SpecialDefinition): void;
