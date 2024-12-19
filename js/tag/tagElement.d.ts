import { TemplaterResult } from './getTemplaterResult.function.js';
import { AnySupport, SupportContextItem } from './getSupport.function.js';
import { TagWrapper } from './tag.utils.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { TagMaker } from './TagMaker.type.js';
import { BaseSupport } from './BaseSupport.type.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
export type TagAppElement = Element & {
    ValueTypes: typeof ValueTypes;
    setUse: typeof setUseMemory;
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
    tags: TagWrapper<unknown>[];
    ValueTypes: typeof ValueTypes;
};
export declare function runWrapper(templater: TemplaterResult, placeholder: Text, appElement: Element, subject: SupportContextItem, isAppFunction: boolean): AnySupport;
