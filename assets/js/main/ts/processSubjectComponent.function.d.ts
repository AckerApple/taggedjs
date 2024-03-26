import { TemplaterResult } from './TemplaterResult.class';
import { Counts, Template } from './interpolateTemplate';
import { Tag } from './Tag.class';
import { TagSubject } from './Tag.utils';
export declare function processSubjectComponent(templater: TemplaterResult, subject: TagSubject, template: Element | Text | Template, ownerTag: Tag, options: {
    counts: Counts;
    forceElement?: boolean;
}): void;
