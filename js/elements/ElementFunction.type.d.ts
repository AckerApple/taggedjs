import { ContextItem } from "../tag/ContextItem.type.js";
import { InputElementTargetEvent } from "../TagJsEvent.type.js";
import { TagJsComponent } from "../TagJsTags/index.js";
import { TagJsTag } from "../TagJsTags/TagJsTag.type.js";
import { CombinedElementFunctions } from "./elementAttributes.array.js";
type HtmlBasic = void | Date | string | boolean | TagJsTag<any> | number | null | undefined;
export type ToHtmlItem = ((_: InputElementTargetEvent) => (HtmlItem | HtmlItem[] | TagJsComponent<any> | TagJsComponent<any>[]));
export type HtmlItem = /*(
  (_: InputElementTargetEvent) => Tag | HtmlBasic | (Tag | HtmlBasic)[]
) | */ HtmlBasic | any[];
export type AttrValue = string | number | boolean | undefined | ((context: ContextItem) => any);
export type TagChildContent = HtmlItem[] | HtmlItem | ToHtmlItem | ((_: InputElementTargetEvent) => HtmlBasic | TagJsComponent<any>);
export type ElementFunction = ((...children: TagChildContent[]) => ElementFunction & CombinedElementFunctions) & CombinedElementFunctions;
export {};
