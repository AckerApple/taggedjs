import { TagJsComponent } from "../index.js";
import { TagJsVar } from "./tagJsVar.type.js";
export type TagJsVarInnerHTML = TagJsVar & {
    owner?: TagJsComponent<any>;
};
export declare function getInnerHTML(): TagJsVarInnerHTML;
