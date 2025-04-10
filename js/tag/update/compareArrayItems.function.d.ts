import { Counts } from '../../interpolations/interpolateTemplate.js';
import { ContextItem } from '../Context.types.js';
export declare function compareArrayItems(_subTag: unknown, // used to compare arrays
value: unknown[], index: number, lastArray: ContextItem[], removed: number, counts: Counts): 1 | 0 | 2;
export declare function destroyArrayItem(item: ContextItem, counts: Counts): void;
