import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TagArraySubject } from './processTagArray.js';
import { TagSubject } from '../../subject.types.js';
import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
import { TagSupport } from '../TagSupport.class.js';
export declare function processTagResult(tagSupport: TagSupport, subject: TagArraySubject | TagSubject | Function, // used for recording past and current value
insertBefore: InsertBefore, // <template end interpolate />
{ counts, }: {
    counts: Counts;
}): void;
