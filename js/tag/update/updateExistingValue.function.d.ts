import { TagSubject } from '../../subject.types.js';
import { Support } from '../Support.class.js';
import { InterpolateSubject, TemplateValue } from './processFirstSubject.utils.js';
import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
export declare function updateExistingValue(subject: InterpolateSubject, value: TemplateValue, ownerSupport: Support, insertBefore: InsertBefore): TagSubject | InterpolateSubject;
