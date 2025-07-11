import { AnySupport } from '../tag/AnySupport.type.js';
import { ContextItem } from '../tag/ContextItem.type.js';
import { TagCounts } from '../tag/index.js';
/** Function that kicks off actually putting tags down as HTML elements */
export declare function buildBeforeElement(support: AnySupport, counts: TagCounts, appendTo?: Element, insertBefore?: Text): {
    contexts: ContextItem[];
    dom: import("../interpolations/optimizers/ObjectNode.types.js").DomObjectChildren;
};
export declare function addOneContext(value: unknown, context: ContextItem[], withinOwnerElement: boolean): ContextItem;
