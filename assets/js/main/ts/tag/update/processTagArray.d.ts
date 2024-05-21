import { Clones, InsertBefore } from '../../interpolations/Clones.type';
import { Tag } from '../Tag.class';
import { ValueSubject } from '../../subject/ValueSubject';
import { Counts } from '../../interpolations/interpolateTemplate';
import { TagSupport } from '../TagSupport.class';
import { TemplaterResult } from '../../TemplaterResult.class';
export type LastArrayItem = {
    tagSupport: TagSupport;
    index: number;
    deleted?: boolean;
};
export type TagArraySubject = ValueSubject<Tag[]> & {
    insertBefore: InsertBefore;
    placeholder?: Text;
    lastArray?: LastArrayItem[];
};
export declare function processTagArray(subject: TagArraySubject, value: (TemplaterResult | Tag)[], // arry of Tag classes
insertBefore: InsertBefore, // <template end interpolate />
ownerSupport: TagSupport, options: {
    counts: Counts;
    forceElement?: boolean;
}): Clones;
