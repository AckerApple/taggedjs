import { Wrapper } from '../TemplaterResult.class.js';
import { InsertBefore } from '../../interpolations/Clones.type.js';
import { TagSubject } from '../../subject.types.js';
import { TagSupport } from '../TagSupport.class.js';
import { InterpolateSubject, TemplateValue, processOptions } from './processFirstSubject.utils.js';
export declare function processFirstSubjectValue(value: TemplateValue, subject: InterpolateSubject, // could be tag via result.tag
insertBefore: InsertBefore, // <template end interpolate /> (will be removed)
ownerSupport: TagSupport, // owner
options: processOptions): import("../../interpolations/Clones.type.js").Clones | undefined;
export declare function oneRenderToTagSupport(wrapper: Wrapper, subject: TagSubject, ownerSupport: TagSupport): TagSupport;
