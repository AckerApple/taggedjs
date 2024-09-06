import { TemplaterResult } from './TemplaterResult.class.js';
import { BaseSupport } from './Support.class.js';
import { TagComponent, TagMaker } from './tag.utils.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { ContextItem } from './Context.types.js';
export type TagAppElement = Element & {
    ValueTypes: typeof ValueTypes;
    setUse: any;
};
/**
 *
 * @param app taggedjs tag
 * @param element HTMLElement
 * @param props object
 * @returns
 */
export declare function tagElement(app: TagMaker, element: HTMLElement | Element, props?: unknown): {
    support: BaseSupport;
    tags: TagComponent[];
    ValueTypes: typeof ValueTypes;
};
export declare function runWrapper(templater: TemplaterResult, placeholder: Text, appElement: Element, subject: ContextItem): import("./Support.class.js").AnySupport;
