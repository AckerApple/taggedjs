import { InterpolateSubject } from './update/processFirstSubject.utils';
import { Counts } from '../interpolations/interpolateTemplate';
import { InsertBefore } from '../interpolations/Clones.type';
import { TagSupport } from './TagSupport.class';
export declare function checkDestroyPrevious(subject: InterpolateSubject, // existing.value is the old value
newValue: unknown, insertBefore: InsertBefore): false | "array" | 2 | "different-tag" | "changed-simple-value";
export declare function isSimpleType(value: any): boolean;
export declare function destroyArrayTag(tagSupport: TagSupport, counts: Counts): void;
export declare function restoreTagMarker(lastSupport: TagSupport): void;
