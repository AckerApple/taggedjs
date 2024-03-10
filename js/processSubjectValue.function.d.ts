import { TagArraySubject } from "./processTagArray.js";
import { Clones } from "./Clones.type.js";
import { Tag } from "./Tag.class.js";
import { Counts, Template } from "./interpolateTemplate.js";
import { DisplaySubject, TagSubject } from "./Tag.utils.js";
import { ValueSubject } from "./ValueSubject.js";
import { Callback } from "./bindSubjectCallback.function.js";
type processOptions = {
    forceElement?: boolean;
    counts: Counts;
};
export type ClonesAndPromise = {
    clones: Clones;
};
export type InterpolateSubject = TagArraySubject | TagSubject | DisplaySubject | ValueSubject<Callback>;
export declare function processSubjectValue(value: any, result: InterpolateSubject, // could be tag via result.tag
template: Element | Text | Template, // <template end interpolate /> (will be removed)
ownerTag: Tag, // owner
options: processOptions): Clones;
export declare function processTag(value: any, result: TagSubject, // could be tag via result.tag
template: Element | Text | Template, // <template end interpolate /> (will be removed)
ownerTag: Tag, // owner
options: processOptions): Clones;
export declare function destroySimpleValue(template: Element | Text | Template, subject: DisplaySubject): void;
export {};
