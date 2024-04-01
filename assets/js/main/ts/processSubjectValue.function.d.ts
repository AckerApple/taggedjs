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
export declare function processSubjectValue(value: any, subject: InterpolateSubject, // could be tag via result.tag
template: Element | Text | Template, // <template end interpolate /> (will be removed)
ownerTag: Tag, // owner
options: processOptions, // {added:0, removed:0}
test?: boolean): Clones;
/** Could be a regular tag or a component. Both are Tag.class */
export declare function processTag(tag: Tag, subject: TagSubject, // could be tag via result.tag
insertBefore: Element | Text | Template, // <template end interpolate /> (will be removed)
ownerTag: Tag): void;
export declare function applyFakeTemplater(tag: Tag, ownerTag: Tag, subject: TagSubject): void;
export {};
