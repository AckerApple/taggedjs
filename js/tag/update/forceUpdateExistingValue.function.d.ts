import { SupportContextItem } from '../SupportContextItem.type.js';
import { AdvancedContextItem } from '../AdvancedContextItem.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { TagCounts } from '../TagCounts.type.js';
/** Used for all tag value updates. Determines if value changed since last render */
export declare function forceUpdateExistingValue(contextItem: AdvancedContextItem | SupportContextItem, newValue: TemplateValue, // newValue
ownerSupport: AnySupport, counts: TagCounts): void;
