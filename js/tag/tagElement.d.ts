import { Support } from './Support.class.js';
import { TemplaterResult } from './TemplaterResult.class.js';
import { TagComponent, TagMaker } from './tag.utils.js';
/**
 *
 * @param app taggedjs tag
 * @param element HTMLElement
 * @param props object
 * @returns
 */
export declare function tagElement(app: TagMaker, // (...args: unknown[]) => TemplaterResult,
element: HTMLElement | Element, props?: unknown): {
    support: Support;
    tags: TagComponent[];
};
export declare function runWrapper(templater: TemplaterResult, insertBefore: Element, placeholder: Text): Support;
