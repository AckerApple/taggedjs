import { TemplaterResult } from '../TemplaterResult.class.js';
import { AnySupport } from '../Support.class.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { ContextItem } from '../Context.types.js';
import { StringTag } from '../Tag.class.js';
export declare function processTagArray(subject: ContextItem, value: (TemplaterResult | StringTag)[], // arry of Tag classes
ownerSupport: AnySupport, counts: Counts, appendTo?: Element): void;
export declare function destroyArrayItem(item: ContextItem, counts: Counts): void;
