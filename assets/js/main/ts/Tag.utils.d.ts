import { ValueSubject } from "./ValueSubject";
import { Subject } from "./Subject";
import { Tag } from "./Tag.class";
import { TemplaterResult } from "./TemplaterResult.class";
import { Template } from "./interpolateTemplate";
export type TagSubject = Subject<TemplaterResult> & {
    tag: Tag;
    template: Element | Text | Template;
};
type RegularValue = string | number | boolean;
export type DisplaySubject = Subject<RegularValue> & {
    lastValue?: RegularValue;
    clone?: Element | Text | Template;
    template: Element | Text | Template;
};
export declare function getSubjectFunction(value: any, tag: Tag): ValueSubject<import("./bindSubjectCallback.function").Callback>;
/** for components */
export declare function redrawTag(subject: TagSubject, templater: TemplaterResult, ownerTag: Tag): Tag;
export {};
