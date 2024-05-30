import { TemplaterResult } from '../TemplaterResult.class.js';
import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TagSubject } from '../../subject.types.js';
import { TagSupport } from '../TagSupport.class.js';
import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
export declare function processSubjectComponent(templater: TemplaterResult, subject: TagSubject, insertBefore: InsertBefore, ownerSupport: TagSupport, options: {
    counts: Counts;
}): TagSupport;
