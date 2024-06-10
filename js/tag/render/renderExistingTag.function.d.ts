import { BaseSupport, Support } from '../Support.class.js';
import { TagSubject } from '../../subject.types.js';
/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export declare function renderExistingTag(oldestSupport: Support | BaseSupport, // oldest with elements on html
newSupport: Support | BaseSupport, // new to be rendered
ownerSupport: BaseSupport | Support, // ownerSupport
subject: TagSubject): Support;
