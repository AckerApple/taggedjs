import { TemplaterResult } from "./templater.utils.js";
import { Counts, Template } from "./interpolateTemplate.js";
import { Tag } from "./Tag.class.js";
import { TagSubject } from "./Tag.utils.js";
export declare function processSubjectComponent(value: TemplaterResult, subject: TagSubject, template: Element | Text | Template, ownerTag: Tag, options: {
    counts: Counts;
    forceElement?: boolean;
}): import("./Clones.type.js").Clones;
