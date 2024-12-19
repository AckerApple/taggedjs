import { AnySupport, SupportContextItem } from '../getSupport.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { ContextItem } from '../Context.types.js';
/** Used for all tag value updates. Determines if value changed since last render */
export declare function updateExistingValue(contextItem: ContextItem | SupportContextItem, value: TemplateValue, ownerSupport: AnySupport): void;
