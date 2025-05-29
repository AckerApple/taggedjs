import type { TagCounts } from '../../tag/TagCounts.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { Tag } from '../Tag.type.js';
export declare function processDomTagInit(value: TemplateValue | Tag, // StringTag,
contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
counts: TagCounts, appendTo?: Element, insertBefore?: Text): AnySupport | undefined;
