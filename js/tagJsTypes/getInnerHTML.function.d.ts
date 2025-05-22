import { AnySupport, ContextItem, TagCounts } from "../index.js";
import { ProcessInit } from "../tag/ProcessInit.type.js";
type InnerHTMLValue = {
    tagJsType: 'innerHTML';
    processInit: ProcessInit;
};
declare function processInnerHTML(value: InnerHTMLValue, contextItem: ContextItem, ownerSupport: AnySupport, counts: TagCounts, // {added:0, removed:0}
appendTo?: Element, insertBefore?: Text): void;
export declare function getInnerHTML(): {
    tagJsType: string;
    processInit: typeof processInnerHTML;
};
export {};
