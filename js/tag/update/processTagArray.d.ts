import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
import { Tag, TagTemplate } from '../Tag.class.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { BaseSupport, Support } from '../Support.class.js';
import { TemplaterResult } from '../TemplaterResult.class.js';
import { TagJsSubject } from './TagJsSubject.class.js';
export type LastArrayItem = {
    support: Support;
    index: number;
    deleted?: boolean;
};
type LastArrayMeta = {
    array: LastArrayItem[];
    lastRuns?: {
        [index: number]: TagTemplate;
    };
};
export type TagArraySubject = TagJsSubject<Tag[]> & {
    insertBefore: InsertBefore;
    lastArray?: LastArrayMeta;
};
export declare function processTagArray(subject: TagArraySubject, value: (TemplaterResult | Tag)[], // arry of Tag classes
insertBefore: InsertBefore, // <template end interpolate />
ownerSupport: BaseSupport | Support, options: {
    counts: Counts;
}, fragment?: DocumentFragment): InsertBefore[];
export {};
