import { AnySupport } from "../../tag/AnySupport.type.js";
import { ContextItem } from "../../tag/ContextItem.type.js";
export declare function attachDynamicDom(value: any, contexts: ContextItem[], support: AnySupport, // owner
parentContext: ContextItem, depth: number, // used to indicate if variable lives within an owner's element
appendTo?: HTMLElement, insertBefore?: Text): ContextItem;
