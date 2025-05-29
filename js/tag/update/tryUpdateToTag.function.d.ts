import { AnySupport } from '../AnySupport.type.js';
import { SupportContextItem } from '../SupportContextItem.type.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { ContextItem } from '../ContextItem.type.js';
import { TagCounts } from '../TagCounts.type.js';
/** result is an indication to ignore further processing but that does not seem in use anymore */
export declare function tryUpdateToTag(contextItem: ContextItem | SupportContextItem, newValue: TemplaterResult, // newValue
ownerSupport: AnySupport, counts: TagCounts): boolean;
