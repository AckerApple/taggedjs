import { SupportContextItem } from '../SupportContextItem.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../index.js';
import { TemplateValue } from '../TemplateValue.type.js';
/** Used for all tag value updates. Determines if value changed since last render */
export declare function forceUpdateExistingValue(contextItem: ContextItem | SupportContextItem, newValue: TemplateValue, // newValue
ownerSupport: AnySupport): number;
