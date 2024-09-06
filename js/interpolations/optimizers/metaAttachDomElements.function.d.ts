import { BaseSupport, Support } from "../../tag/Support.class.js";
import { Context } from "../../tag/Tag.class.js";
import { Counts } from "../interpolateTemplate.js";
import { SubToTemplateOptions } from "../subscribeToTemplate.function.js";
import { DomObjectChildren } from "./ObjectNode.types.js";
import { ObjectChildren } from "./exchangeParsedForValues.function.js";
export declare function attachDomElement(nodes: ObjectChildren, values: any[], support: BaseSupport | Support, counts: Counts, // used for animation stagger computing
owner?: Element, subs?: SubToTemplateOptions[], context?: Context): {
    context: Context;
    subs: SubToTemplateOptions[];
    dom: DomObjectChildren;
};
