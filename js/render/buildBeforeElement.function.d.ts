import { Counts } from '../interpolations/interpolateTemplate.js';
import { AnySupport } from '../tag/AnySupport.type.js';
import { ContextItem } from '../tag/Context.types.js';
/** Function that kicks off actually putting tags down as HTML elements */
export declare function buildBeforeElement(support: AnySupport, counts: Counts, appendTo?: Element, insertBefore?: Text): {
    context: ContextItem[];
    dom: import("../interpolations/optimizers/ObjectNode.types.js").DomObjectChildren;
};
export declare function addOneContext(value: unknown, context: ContextItem[], withinOwnerElement: boolean): ContextItem;
