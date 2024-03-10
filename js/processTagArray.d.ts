import { Clones } from "./Clones.type.js";
import { Tag } from "./Tag.class.js";
import { ValueSubject } from "./ValueSubject.js";
import { Counts, Template } from "./interpolateTemplate.js";
export type LastArrayItem = {
    tag: Tag;
    index: number;
};
export type TagArraySubject = ValueSubject<Tag[]> & {
    lastArray: LastArrayItem[];
    template: Element | Text | Template;
    isChildSubject?: boolean;
};
export declare function processTagArray(result: TagArraySubject, value: Tag[], // arry of Tag classes
template: Element | Text | Template, // <template end interpolate />
ownerTag: Tag, options: {
    counts: Counts;
    forceElement?: boolean;
}): Clones;
