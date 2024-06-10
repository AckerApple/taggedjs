import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
import { Support } from '../Support.class.js';
import { Tag } from '../Tag.class.js';
import { InterpolateSubject, TemplateValue, processOptions } from './processFirstSubject.utils.js';
export declare function processFirstSubjectValue(value: TemplateValue | Tag, subject: InterpolateSubject, // could be tag via result.tag
insertBefore: InsertBefore, // <template end interpolate /> (will be removed)
ownerSupport: Support, // owner
options: processOptions, // {added:0, removed:0}
fragment?: DocumentFragment): import("../Support.class.js").BaseSupport | InsertBefore[] | undefined;
