import { TagJsComponent } from "../index.js";
import { TagJsTag } from "./TagJsTag.type.js";
export type TagJsTagInnerHTML = TagJsTag & {
    owner?: TagJsComponent<any>;
};
export declare function getInnerHTML(): TagJsTagInnerHTML;
