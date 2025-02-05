import { Counts } from '../../interpolations/interpolateTemplate.js';
import { AnySupport } from '../getSupport.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { StringTag } from '../getDomTag.function.js';
import { ContextItem } from '../Context.types.js';
export declare function processFirstSubjectValue(value: TemplateValue | StringTag, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: Counts, // {added:0, removed:0}
valueId: string, appendTo?: Element): AnySupport | undefined;
