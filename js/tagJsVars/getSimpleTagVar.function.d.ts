import { ContextItem } from "../index.js";
import { TagJsTag } from "./tagJsVar.type.js";
export declare function getSimpleTagVar(value: any): TagJsTag;
export declare function deleteSimpleValue(contextItem: ContextItem): void;
export declare function checkSimpleValueChange(newValue: unknown, contextItem: ContextItem): -1 | 6;
