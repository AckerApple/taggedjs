import { ContextItem } from '../tag/ContextItem.type.js';
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js';
export declare function getNewContext(value: unknown, contexts: ContextItem[], withinOwnerElement: boolean, parentContext: ContextItem, tagJsVar?: TagJsTag<any>): ContextItem;
/** auto adds onto parent.contexts */
export declare function addOneContext(value: unknown, contexts: ContextItem[], withinOwnerElement: boolean, parentContext: ContextItem): ContextItem;
