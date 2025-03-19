import { DomObjectChildren } from "./ObjectNode.types.js";
import { AnySupport } from "../../tag/getSupport.function.js";
import { SubToTemplateOptions } from "../subscribeToTemplate.function.js";
import { ContextItem } from "../../tag/Context.types.js";
import { ObjectChildren } from "./LikeObjectElement.type.js";
import { Counts } from "../interpolateTemplate.js";
export declare const blankHandler: () => undefined;
export declare function attachDomElements(nodes: ObjectChildren, values: any[], support: AnySupport, counts: Counts, // used for animation stagger computing
context: ContextItem[], depth: number, // used to know if dynamic variables live within parent owner tag/support
appendTo?: Element, insertBefore?: Text, subs?: SubToTemplateOptions[]): {
    context: ContextItem[];
    subs: SubToTemplateOptions[];
    dom: DomObjectChildren;
};
