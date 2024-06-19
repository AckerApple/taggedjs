import { TagSubject } from '../../subject.types.js';
import { BaseSupport, Support } from '../Support.class.js';
import { InsertBefore } from '../../interpolations/InsertBefore.type.js';
import { Props } from '../../Props.js';
export declare function updateExistingTagComponent(ownerSupport: BaseSupport | Support, support: Support, // lastest
subject: TagSubject, insertBefore: InsertBefore, renderUp?: boolean): Support | BaseSupport;
export declare function syncFunctionProps(newSupport: Support, lastSupport: Support, ownerSupport: BaseSupport | Support, newPropsArray: any[], // templater.props
depth?: number): Props;
export declare function moveProviders(lastSupport: Support, newSupport: Support): void;
