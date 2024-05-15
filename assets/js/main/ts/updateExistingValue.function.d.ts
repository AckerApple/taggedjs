import { TagSupport } from './tag/TagSupport.class';
import { InterpolateSubject, TemplateValue } from './tag/update/processSubjectValue.function';
import { InsertBefore } from './interpolations/Clones.type';
export declare function updateExistingValue(subject: InterpolateSubject, value: TemplateValue, ownerSupport: TagSupport, insertBefore: InsertBefore): InterpolateSubject;
