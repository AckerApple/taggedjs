import { TagJsComponent } from "../index.js";
import { TagJsTag } from "./TagJsTag.type.js";
export type TagJsTagInnerHTML = TagJsTag<any> & {
    owner?: TagJsComponent<any>;
};
export declare function getInnerHTML(): TagJsTagInnerHTML;
