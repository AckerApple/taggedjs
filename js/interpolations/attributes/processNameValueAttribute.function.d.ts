import { HowToSet } from './howToSetInputValue.function.js';
import { TagGlobal } from '../../tag/getTemplaterResult.function.js';
import { SpecialDefinition } from '../../render/attributes/processAttribute.function.js';
import { ContextItem } from '../../tag/Context.types.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { Counts } from '../interpolateTemplate.js';
export declare function processDynamicNameValueAttribute(attrName: string, value: any | TagGlobal, contextItem: ContextItem, element: Element, howToSet: HowToSet, support: AnySupport, counts: Counts, isSpecial: SpecialDefinition): void;
export declare function processNonDynamicAttr(attrName: string, value: string, element: Element, howToSet: HowToSet, counts: Counts, support: AnySupport, isSpecial: SpecialDefinition): void;
