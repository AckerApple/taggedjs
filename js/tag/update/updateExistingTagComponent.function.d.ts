import { TagSubject } from '../../subject.types.js';
import { BaseTagSupport, TagSupport } from '../TagSupport.class.js';
import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
export declare function updateExistingTagComponent(ownerSupport: TagSupport, tagSupport: TagSupport, // lastest
subject: TagSubject, insertBefore: InsertBefore): TagSupport | BaseTagSupport;
