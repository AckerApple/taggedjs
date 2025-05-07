import { AnySupport } from "../../tag/AnySupport.type.js";
import { ContextItem } from "../../tag/Context.types.js";
import { Counts } from "../interpolateTemplate.js";
export declare function attachDynamicDom(value: any, context: ContextItem[], support: AnySupport, // owner
counts: Counts, // used for animation stagger computing
depth: number, // used to indicate if variable lives within an owner's element
appendTo?: Element, insertBefore?: Text): void;
