import { AnySupport, ContextItem, TagCounts } from "../index.js";
export declare function getSimpleTagVar(value: any): {
    tagJsType: string;
    value: any;
    processInit: typeof processSimpleValueInit;
    checkValueChange: typeof checkSimpleValueChange;
    delete: typeof deleteSimpleValue;
};
declare function processSimpleValueInit(value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem: ContextItem, ownerSupport: AnySupport, counts: TagCounts, // {added:0, removed:0}
appendTo?: Element, insertBefore?: Text): void;
export declare function deleteSimpleValue(contextItem: ContextItem): void;
export declare function checkSimpleValueChange(newValue: unknown, contextItem: ContextItem): -1 | 6;
export {};
