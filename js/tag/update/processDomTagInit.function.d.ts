import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport } from '../getSupport.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import type { StringTag } from '../StringTag.type.js';
import { ContextItem } from '../Context.types.js';
export declare function processDomTagInit(value: TemplateValue | StringTag, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: Counts, // {added:0, removed:0}
appendTo?: Element, insertBefore?: Text): AnySupport | undefined;
