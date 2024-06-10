import { BaseSupport, Support } from '../Support.class.js';
import { TagSubject } from '../../subject.types.js';
export declare function renderWithSupport(newSupport: Support | BaseSupport, lastSupport: Support | BaseSupport | undefined, // previous
subject: TagSubject, // events & memory
ownerSupport?: Support): Support;
