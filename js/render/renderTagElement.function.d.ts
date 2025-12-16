import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import { SupportContextItem } from '../tag/SupportContextItem.type.js';
import { TagWrapper } from '../tag/tag.utils.js';
import { TagMaker } from '../tag/TagMaker.type.js';
import { AnySupport, SupportTagGlobal } from '../index.js';
export declare function renderTagElement(app: TagMaker, global: SupportTagGlobal, templater: TemplaterResult, templater2: TemplaterResult, element: Element, // appElement
context: SupportContextItem, isAppFunction: boolean): {
    support: AnySupport;
    tags: TagWrapper<unknown>[];
    ValueTypes: {
        tag: string;
        dom: string;
        templater: string;
        tagComponent: string;
        tagArray: string;
        renderOnce: string;
        stateRender: string;
        version: number;
        subscribe: string;
        signal: string;
        host: string;
    };
};
