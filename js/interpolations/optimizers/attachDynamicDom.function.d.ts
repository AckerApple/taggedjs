import { AnySupport } from "../../tag/AnySupport.type.js";
import { ContextItem } from "../../tag/ContextItem.type.js";
import type { TagCounts } from '../../tag/TagCounts.type.js';
export declare function attachDynamicDom(value: any, context: ContextItem[], support: AnySupport, // owner
counts: TagCounts, // used for animation stagger computing
depth: number, // used to indicate if variable lives within an owner's element
appendTo?: Element, insertBefore?: Text): void;
