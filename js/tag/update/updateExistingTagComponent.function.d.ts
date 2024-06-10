import { TagSubject } from '../../subject.types.js';
import { BaseSupport, Support } from '../Support.class.js';
import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
export declare function updateExistingTagComponent(ownerSupport: Support, support: Support, // lastest
subject: TagSubject, insertBefore: InsertBefore, renderUp?: boolean): Support | BaseSupport;
export declare function moveProviders(lastSupport: Support, newSupport: Support): void;
