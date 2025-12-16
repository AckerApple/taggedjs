import { AnySupport } from '../tag/index.js';
import { ContextItem } from '../tag/ContextItem.type.js';
/** Function that kicks off actually putting tags down as HTML elements */
export declare function buildBeforeElement(support: AnySupport, appendTo?: Element, insertBefore?: Text): {
    contexts: ContextItem[];
    dom: import("../interpolations/optimizers/ObjectNode.types.js").DomObjectChildren;
};
