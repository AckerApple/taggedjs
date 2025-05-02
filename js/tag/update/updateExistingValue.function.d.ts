import { AnySupport, SupportContextItem } from '../getSupport.function.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { TemplateValue } from './processFirstSubject.utils.js';
import { ContextItem } from '../Context.types.js';
/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export declare function updateExistingValue(contextItem: ContextItem | SupportContextItem, newValue: TemplateValue, // newValue
ownerSupport: AnySupport): void;
/** Used for all tag value updates. Determines if value changed since last render */
export declare function forceUpdateExistingValue(contextItem: ContextItem | SupportContextItem, newValue: TemplateValue, // newValue
ownerSupport: AnySupport): void;
export declare function subjectCheckValueChange(value: any, contextItem: ContextItem): -1 | 66;
export declare function prepareUpdateToComponent(templater: TemplaterResult, contextItem: SupportContextItem, ownerSupport: AnySupport): void;
export declare function updateContextItemBySupport(support: AnySupport, contextItem: SupportContextItem, value: TemplaterResult, ownerSupport: AnySupport): void;
/** result is an indication to ignore further processing but that does not seem in use anymore */
export declare function tryUpdateToTag(contextItem: ContextItem | SupportContextItem, newValue: TemplaterResult, // newValue
ownerSupport: AnySupport): boolean;
