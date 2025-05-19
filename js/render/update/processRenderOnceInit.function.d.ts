import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TemplateValue } from '../../tag/update/processFirstSubject.utils.js';
import { ContextItem } from '../../tag/Context.types.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
export declare function processRenderOnceInit(value: TemplateValue, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: Counts, // {added:0, removed:0}
appendTo?: Element, insertBefore?: Text): AnySupport;
