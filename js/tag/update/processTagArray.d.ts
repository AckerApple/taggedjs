import { TemplaterResult } from '../getTemplaterResult.function.js';
import type { TagCounts } from '../../tag/TagCounts.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { Tag } from '../Tag.type.js';
import { ContextItem } from '../ContextItem.type.js';
export declare function processTagArray(subject: ContextItem, value: (TemplaterResult | Tag)[], // arry of Tag classes
ownerSupport: AnySupport, counts: TagCounts, appendTo?: Element): void;
