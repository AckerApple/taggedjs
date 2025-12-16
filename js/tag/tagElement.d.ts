import { TagWrapper } from './tag.utils.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { TagMaker } from './TagMaker.type.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { AnySupport } from './index.js';
export type TagAppElement = Element & {
    ValueTypes: typeof ValueTypes;
    setUse: typeof setUseMemory;
};
export declare const appElements: {
    support: AnySupport;
    element: Element;
}[];
/**
 *
 * @param app taggedjs tag
 * @param element HTMLElement
 * @param props object
 * @returns
 */
export declare function tagElement(app: TagMaker, element: HTMLElement | Element, // aka appElement
props?: unknown): {
    support: AnySupport;
    tags: TagWrapper<unknown>[];
    ValueTypes: typeof ValueTypes;
};
