import { TemplaterResult } from "./tag.js";
export declare function renderAppToElement(app: (...args: unknown[]) => TemplaterResult, element: Element, props: unknown): void;
export declare function applyTagUpdater(wrapper: TemplaterResult): {
    tag: import("./Tag.class.js").Tag;
    tagSupport: import("./getTagSupport.js").TagSupport;
};
