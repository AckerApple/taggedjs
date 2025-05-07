import { SupportContextItem } from '../createHtmlSupport.function.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { ContextItem } from '../Context.types.js';
import { AnySupport } from '../AnySupport.type.js';
/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export declare function updateExistingValue(newValue: TemplateValue, // newValue
ownerSupport: AnySupport, contextItem: ContextItem | SupportContextItem): void;
export declare function prepareUpdateToComponent(templater: TemplaterResult, contextItem: SupportContextItem, ownerSupport: AnySupport): void;
