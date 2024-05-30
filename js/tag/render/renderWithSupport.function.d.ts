import { TagSupport } from '../TagSupport.class.js';
import { TagSubject } from '../../subject.types.js';
export declare function renderWithSupport(newTagSupport: TagSupport, lastSupport: TagSupport | undefined, // previous
subject: TagSubject, // events & memory
ownerSupport?: TagSupport): TagSupport;
