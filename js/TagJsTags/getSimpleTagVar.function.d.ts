import { ContextItem } from "../index.js";
import { TagJsTag } from "./TagJsTag.type.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
export declare function deleteSimpleAttribute(contextItem: AttributeContextItem): void;
export declare function getSimpleTagVar(value: any): TagJsTag;
export declare function deleteSimpleValue(context: ContextItem): void;
export declare function checkSimpleValueChange(newValue: unknown, contextItem: ContextItem): 0 | 6;
export declare function checkUpdateDeleteSimpleValueChange(newValue: unknown, contextItem: ContextItem): 0 | 6;
