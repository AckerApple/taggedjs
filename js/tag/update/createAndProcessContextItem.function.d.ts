import type { TagCounts } from '../../tag/TagCounts.type.js';
import { AdvancedContextItem } from '../AdvancedContextItem.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { ContextItem } from '../ContextItem.type.js';
/** Must provide insertBefore OR appendTo */
export declare function createAndProcessContextItem(value: TemplateValue, ownerSupport: AnySupport, counts: TagCounts, contexts: ContextItem[], insertBefore?: Text, // used during updates
appendTo?: Element): AdvancedContextItem;
