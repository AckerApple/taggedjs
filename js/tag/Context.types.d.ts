import { AnySupport } from './AnySupport.type.js';
import { TemplateValue } from './TemplateValue.type.js';
import { ContextItem } from './ContextItem.type.js';
import { SupportContextItem } from './SupportContextItem.type.js';
import { TagCounts } from './TagCounts.type.js';
export type ContextHandler = (value: TemplateValue, newSupport: AnySupport, contextItem: ContextItem, values: unknown[], counts: TagCounts) => void;
export type LastArrayItem = ContextItem;
export type CheckValueChange = (value: unknown, subject: ContextItem, counts: TagCounts) => number | boolean;
export type CheckSupportValueChange = (value: unknown, subject: SupportContextItem, counts: TagCounts) => number | boolean;
