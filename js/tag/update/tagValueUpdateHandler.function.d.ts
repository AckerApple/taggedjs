import { SupportContextItem } from '../SupportContextItem.type.js';
import { AnySupport } from '../index.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { ContextItem } from '../ContextItem.type.js';
/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export declare function tagValueUpdateHandler(newValue: TemplateValue, // newValue
contextItem: ContextItem | SupportContextItem, ownerSupport: AnySupport): number;
