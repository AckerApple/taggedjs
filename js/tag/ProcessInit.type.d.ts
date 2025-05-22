import type { TagCounts } from './TagCounts.type.js';
import { ContextItem } from './ContextItem.type.js';
import { AnySupport } from './AnySupport.type.js';
export type ProcessInit = (value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem: ContextItem, ownerSupport: AnySupport, counts: TagCounts, // {added:0, removed:0}
appendTo?: Element, insertBefore?: Text) => any;
