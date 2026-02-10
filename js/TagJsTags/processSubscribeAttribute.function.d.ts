import { AnySupport, TemplateValue } from "../index.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
import { SubscribeValue } from "./subscribe.function.js";
import { TagJsTag } from "./TagJsTag.type.js";
export declare function processSubscribeAttribute(name: string, value: SubscribeValue, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element: Element, _tagJsVar: TagJsTag, // same as value
contextItem: AttributeContextItem, ownerSupport: AnySupport): {
    subContext: import("../index.js").SubContext;
    onOutput: (callbackValue: TemplateValue, syncRun: boolean) => void;
};
