import type { TagCounts } from '../../tag/TagCounts.type.js';
import { LastArrayItem } from '../Context.types.js';
import { TemplaterResult } from '../getTemplaterResult.function.js';
import { Tag } from '../Tag.type.js';
import { ContextItem } from '../ContextItem.type.js';
export declare function compareArrayItems(value: (TemplaterResult | Tag)[], index: number, lastArray: LastArrayItem[], removed: number, counts: TagCounts): 1 | 0 | 2;
export declare function destroyArrayItem(item: ContextItem, counts: TagCounts): void;
