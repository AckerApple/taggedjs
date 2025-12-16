import { AnySupport } from '../index.js';
import { SupportContextItem } from '../SupportContextItem.type.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { ContextItem } from '../ContextItem.type.js';
/** result is an indication to ignore further processing but that does not seem in use anymore */
export declare function tryUpdateToTag(contextItem: ContextItem | SupportContextItem, newValue: TemplaterResult, // newValue
ownerSupport: AnySupport): boolean;
