import { InterpolateSubject } from '../tag/update/processFirstSubject.utils.js';
import { ContextItem } from '../tag/Context.types.js';
import { AnySupport } from '../tag/AnySupport.type.js';
import { Counts } from './interpolateTemplate.js';
export type SubToTemplateOptions = {
    insertBefore: Text;
    subject: InterpolateSubject;
    support: AnySupport;
    counts: Counts;
    contextItem: ContextItem;
    appendTo?: Element;
};
