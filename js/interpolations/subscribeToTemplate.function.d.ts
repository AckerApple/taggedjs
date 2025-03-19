import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js';
import { ContextItem } from '../tag/Context.types.js';
import { AnySupport } from '../tag/getSupport.function.js';
import { Counts } from './interpolateTemplate.js';
export type SubToTemplateOptions = {
    insertBefore: Text;
    subject: InterpolateSubject;
    support: AnySupport;
    counts: Counts;
    contextItem: ContextItem;
    appendTo?: Element;
};
/** Used for when dynamic value is truly something to subscribe to */
export declare function subscribeToTemplate({ subject, support, counts, contextItem, appendTo, }: SubToTemplateOptions): void;
