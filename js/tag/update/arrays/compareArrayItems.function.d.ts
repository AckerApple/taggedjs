import { LastArrayItem } from '../../Context.types.js';
import { TemplaterResult } from '../../getTemplaterResult.function.js';
import { Tag } from '../../Tag.type.js';
import { ContextItem } from '../../ContextItem.type.js';
/** 1 = destroyed, 2 = value changes, 0 = no change */
export declare function compareArrayItems(value: (TemplaterResult | Tag)[], index: number, lastArray: LastArrayItem[], removed: number): 0 | 1 | 2;
export declare function destroyArrayItem(context: ContextItem): void;
