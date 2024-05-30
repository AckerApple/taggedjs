import { InsertBefore } from './interpolations/Clones.type.js';
import { TagSupport } from './tag/TagSupport.class.js';
import { TemplaterResult } from './tag/TemplaterResult.class.js';
import { Template } from './interpolations/interpolateTemplate.js';
import { Subject } from './subject/Subject.class.js';
import { ValueSubject } from './subject/ValueSubject.js';
export type WasTagSubject = Subject<TemplaterResult> & {
    tagSupport?: TagSupport;
};
export type TagSubject = ValueSubject<TemplaterResult> & {
    tagSupport: TagSupport;
};
export type RegularValue = string | number | boolean;
export type DisplaySubject = Subject<RegularValue> & {
    lastValue?: RegularValue;
    clone?: Element | Text | Template;
    insertBefore: InsertBefore;
};
