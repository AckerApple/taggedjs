import { AnySupport } from '../AnySupport.type.js';
import { SupportContextItem } from '../createHtmlSupport.function.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { ContextItem } from '../Context.types.js';
/** result is an indication to ignore further processing but that does not seem in use anymore */
export declare function tryUpdateToTag(contextItem: ContextItem | SupportContextItem, newValue: TemplaterResult, // newValue
ownerSupport: AnySupport): boolean;
