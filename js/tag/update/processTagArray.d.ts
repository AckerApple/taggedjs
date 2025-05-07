import { TemplaterResult } from '../getTemplaterResult.function.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { ContextItem } from '../Context.types.js';
import { StringTag } from '../StringTag.type.js';
import { AnySupport } from '../AnySupport.type.js';
export declare function processTagArray(subject: ContextItem, value: (TemplaterResult | StringTag)[], // arry of Tag classes
ownerSupport: AnySupport, counts: Counts, appendTo?: Element): void;
