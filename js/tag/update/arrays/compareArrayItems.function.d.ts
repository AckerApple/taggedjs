import { LastArrayItem } from '../../Context.types.js';
import { SupportContextItem } from '../../SupportContextItem.type.js';
import type { StringTag } from '../../StringTag.type.js';
import { ContextItem } from '../../ContextItem.type.js';
export declare function runArrayItemDiff(oldKey: string, newValueTag: StringTag, prevContext: SupportContextItem, lastArray: LastArrayItem[], index: number): 0 | 2;
export declare function destroyArrayItem(context: ContextItem): void;
