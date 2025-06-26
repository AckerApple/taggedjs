import { SupportContextItem } from '../SupportContextItem.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { TagCounts } from '../TagCounts.type.js';
/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export declare function tagValueUpdateHandler(newValue: TemplateValue, // newValue
ownerSupport: AnySupport, contextItem: ContextItem | SupportContextItem, _values: any[], counts: TagCounts): void;
