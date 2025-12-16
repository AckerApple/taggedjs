import { DomObjectChildren } from "../../interpolations/optimizers/ObjectNode.types.js";
import { AnySupport } from "../../tag/AnySupport.type.js";
import { ContextItem } from "../../tag/ContextItem.type.js";
import { ObjectChildren } from "../../interpolations/optimizers/LikeObjectElement.type.js";
import { SupportContextItem } from "../../index.js";
export declare function attachDomElements(nodes: ObjectChildren, values: any[], support: AnySupport, parentContext: SupportContextItem, depth: number, // used to know if dynamic variables live within parent owner tag/support
appendTo?: Element, insertBefore?: Text): {
    contexts: ContextItem[];
    dom: DomObjectChildren;
};
