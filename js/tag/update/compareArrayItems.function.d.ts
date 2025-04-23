import { Counts } from '../../interpolations/interpolateTemplate.js';
import { ContextItem, LastArrayItem } from '../Context.types.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import type { StringTag } from '../StringTag.type.js';
export declare function compareArrayItems(value: (TemplaterResult | StringTag)[], index: number, lastArray: LastArrayItem[], removed: number, counts: Counts): 0 | 1 | 2;
export declare function destroyArrayItem(item: ContextItem, counts: Counts): void;
