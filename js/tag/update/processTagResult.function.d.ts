import { Counts } from '../../interpolations/interpolateTemplate.js';
import { TagArraySubject } from './processTagArray.js';
import { TagSubject } from '../../subject.types.js';
import { Support } from '../Support.class.js';
/** checks if previous support exists on subject or as a last global support. If first render, calls builder. Otherwise calls support.updateBy() */
export declare function processTagResult(support: Support, subject: TagArraySubject | TagSubject | Function, // used for recording past and current value
{ counts, }: {
    counts: Counts;
}, fragment?: DocumentFragment): Support;
