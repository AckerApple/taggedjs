import { BaseSupport, Support } from "../../tag/Support.class.js";
import { Context } from "../../tag/Tag.class.js";
import { Counts } from "../interpolateTemplate.js";
import { DomObjectChildren, ObjectChildren } from "./ObjectNode.types.js";
export declare function attachDomElement(nodes: ObjectChildren, scope: Context, support: BaseSupport | Support, fragment: DocumentFragment, counts: Counts, // used for animation stagger computing
owner: Element): DomObjectChildren;
