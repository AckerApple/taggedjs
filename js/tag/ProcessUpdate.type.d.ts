import { ContextItem } from './ContextItem.type.js';
import { AnySupport } from './AnySupport.type.js';
import { TagCounts } from './TagCounts.type.js';
import { TemplateValue } from './TemplateValue.type.js';
export type ProcessUpdate = (value: TemplateValue, ownerSupport: AnySupport, contextItem: ContextItem, values: unknown[], counts: TagCounts) => any;
