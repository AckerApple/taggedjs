import { AnySupport } from './AnySupport.type.js';
import { TemplateValue } from './TemplateValue.type.js';
import { ContextItem } from './ContextItem.type.js';
import { SupportContextItem } from './SupportContextItem.type.js';
export type ContextHandler = (value: TemplateValue, newSupport: AnySupport, contextItem: ContextItem, values: unknown[]) => void;
export type LastArrayItem = ContextItem;
export type CheckValueChange = (value: unknown, subject: ContextItem) => number | boolean;
export type CheckSupportValueChange = (value: unknown, subject: SupportContextItem) => number | boolean;
