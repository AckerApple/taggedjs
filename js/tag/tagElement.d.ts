import { TagWrapper } from './tag.utils.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { TagMaker } from './TagMaker.type.js';
import { BaseSupport } from './BaseSupport.type.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { AnySupport } from './AnySupport.type.js';
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
export declare function tagElement(app: TagMaker, element: HTMLElement | Element, props?: unknown): {
    support: BaseSupport;
    tags: TagWrapper<unknown>[];
    ValueTypes: typeof ValueTypes;
};
