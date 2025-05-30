import { Tag } from "../index.js";
import { TagJsVar } from "./tagJsVar.type.js";
export type TagJsVarInnerHTML = TagJsVar & {
    owner?: Tag;
};
export declare function getInnerHTML(): TagJsVarInnerHTML;
