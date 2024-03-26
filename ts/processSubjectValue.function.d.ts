import { TagArraySubject } from './processTagArray';
import { Clones } from './Clones.type';
import { Tag } from './Tag.class';
import { Counts, Template } from './interpolateTemplate';
import { DisplaySubject, TagSubject } from './Tag.utils';
import { ValueSubject } from './ValueSubject';
import { Callback } from './bindSubjectCallback.function';
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
/** Could be a regular tag or a component. Both are Tag.class */
export declare function processTag(value: any, result: TagSubject, // could be tag via result.tag
template: Element | Text | Template, // <template end interpolate /> (will be removed)
ownerTag: Tag, // owner
options: processOptions): void;
export {};
