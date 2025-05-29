import type { TagCounts } from '../../tag/TagCounts.type.js';
import { ContextItem } from '../../tag/ContextItem.type.js';
import { AnySupport } from '../../tag/AnySupport.type.js';
import { TemplateValue } from '../../tag/TemplateValue.type.js';
export declare function processRenderOnceInit(value: TemplateValue, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: TagCounts, appendTo?: Element, insertBefore?: Text): AnySupport;
