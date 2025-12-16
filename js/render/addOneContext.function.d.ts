import { ContextItem } from '../tag/ContextItem.type.js';
export declare function getNewContext(value: unknown, contexts: ContextItem[], withinOwnerElement: boolean, parentContext: ContextItem): ContextItem;
/** auto adds onto parent.contexts */
export declare function addOneContext(value: unknown, contexts: ContextItem[], withinOwnerElement: boolean, parentContext: ContextItem): ContextItem;
