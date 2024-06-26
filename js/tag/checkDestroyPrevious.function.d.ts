import { InterpolateSubject } from './update/processFirstSubject.utils.js';
import { Counts } from '../interpolations/interpolateTemplate.js';
import { Support } from './Support.class.js';
import { ValueTypes } from './ValueTypes.enum.js';
export declare function checkDestroyPrevious(subject: InterpolateSubject, // existing.value is the old value
newValue: unknown, valueType: ValueTypes): false | "changed-simple-value" | "array" | 2 | "different-tag";
export declare function isSimpleType(value: any): boolean;
export declare function destroyArrayTag(support: Support, counts: Counts): void;
