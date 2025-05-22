import { DomObjectChildren } from "../../interpolations/optimizers/ObjectNode.types.js";
import { AnySupport } from "../../tag/AnySupport.type.js";
import { ContextItem } from "../../tag/ContextItem.type.js";
import { ObjectChildren } from "../../interpolations/optimizers/LikeObjectElement.type.js";
import { TagCounts } from "../../tag/TagCounts.type.js";
export declare const blankHandler: () => undefined;
export declare function attachDomElements(nodes: ObjectChildren, values: any[], support: AnySupport, counts: TagCounts, // used for animation stagger computing
context: ContextItem[], depth: number, // used to know if dynamic variables live within parent owner tag/support
appendTo?: Element, insertBefore?: Text): {
    context: ContextItem[];
    dom: DomObjectChildren;
};
