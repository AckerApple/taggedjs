import { TemplaterResult } from '../getTemplaterResult.function.js';
import { AnySupport } from '../index.js';
import { Tag } from '../Tag.type.js';
import { ContextItem } from '../ContextItem.type.js';
export declare function processTagArray(contextItem: ContextItem, value: (TemplaterResult | Tag)[], // arry of Tag classes
ownerSupport: AnySupport, appendTo?: Element): void;
