import { TagSubject } from './Tag.utils';
import { Tag } from './Tag.class';
import { InterpolateSubject } from './processSubjectValue.function';
import { Counts } from './interpolateTemplate';
import { TagSupport } from './TagSupport.class';
export declare function checkDestroyPrevious(existing: InterpolateSubject, // existing.value is the old value
newValue: unknown): false | 1 | 2 | 3 | 4;
export declare function destroyTagMemory(tag: Tag, existingSubject: TagSubject): void;
export declare function destroyTagSupportPast(oldTagSupport: TagSupport): void;
export declare function destroyArrayTag(tag: Tag, counts: Counts): void;
