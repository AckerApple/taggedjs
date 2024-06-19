import { InsertBefore } from './InsertBefore.type.js';
import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js';
import { AnySupport } from '../tag/Support.class.js';
import { Counts } from './interpolateTemplate.js';
export declare function subscribeToTemplate(fragment: DocumentFragment, insertBefore: InsertBefore, subject: InterpolateSubject, support: AnySupport, counts: Counts): void;
