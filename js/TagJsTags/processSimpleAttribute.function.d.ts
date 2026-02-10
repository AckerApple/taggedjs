import { AnySupport } from "../index.js";
import { HowToSet } from "../interpolations/attributes/howToSetInputValue.function.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
import { TagJsTag } from "./TagJsTag.type.js";
/** init runner */
export declare function processSimpleAttribute(name: string, value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element: HTMLElement, tagJsVar: TagJsTag, contextItem: AttributeContextItem, _ownerSupport: AnySupport, howToSet: HowToSet): void;
