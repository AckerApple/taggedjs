import { LastArrayItem } from '../../Context.types.js';
import { TemplaterResult } from '../../getTemplaterResult.function.js';
import { ContextItem } from '../../ContextItem.type.js';
import { TagJsComponent } from '../../../TagJsTags/index.js';
/** 1 = destroyed, 2 = value changes, 0 = no change */
export declare function compareArrayItems(value: (TemplaterResult | TagJsComponent<any>)[], index: number, lastArray: LastArrayItem[], removed: number): 0 | 1 | 2;
export declare function destroyArrayItem(context: ContextItem): void;
