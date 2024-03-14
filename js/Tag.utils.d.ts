import { TagSupport } from "./TagSupport.class";
import { ValueSubject } from "./ValueSubject";
import { Subject } from "./Subject";
import { Tag } from "./Tag.class";
import { TemplaterResult } from "./templater.utils";
import { Template } from "./interpolateTemplate";
export type TagSubject = Subject<TemplaterResult> & {
    tagSupport: TagSupport;
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
export declare function setValueRedraw(templater: TemplaterResult, // latest tag function to call for rendering
existing: TagSubject, ownerTag: Tag): void;
export {};
