import { Counts } from '../../interpolations/interpolateTemplate.js';
import { ContextItem } from '../Context.types.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import type { StringTag } from '../StringTag.type.js';
export declare function compareArrayItems(_subTag: unknown, // used to compare arrays
value: (TemplaterResult | StringTag)[], index: number, lastArray: ContextItem[], removed: number, counts: Counts): 1 | 0 | 2;
export declare function destroyArrayItem(item: ContextItem, counts: Counts): void;
