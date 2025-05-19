import { SupportContextItem } from '../createHtmlSupport.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { AdvancedContextItem } from '../Context.types.js';
import { AnySupport } from '../AnySupport.type.js';
/** Used for all tag value updates. Determines if value changed since last render */
export declare function forceUpdateExistingValue(contextItem: AdvancedContextItem | SupportContextItem, newValue: TemplateValue, // newValue
ownerSupport: AnySupport): void;
