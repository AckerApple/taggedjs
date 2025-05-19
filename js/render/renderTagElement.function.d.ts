import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
import { SupportContextItem } from '../tag/createHtmlSupport.function.js';
import { TagWrapper } from '../tag/tag.utils.js';
import { TagMaker } from '../tag/TagMaker.type.js';
import { AnySupport, BaseTagGlobal } from '../index.js';
export declare function renderTagElement(app: TagMaker, global: BaseTagGlobal, templater: TemplaterResult, templater2: TemplaterResult, element: Element, subject: SupportContextItem, isAppFunction: boolean): {
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
    };
};
export declare function runWrapper(templater: TemplaterResult, placeholder: Text, appElement: Element, subject: SupportContextItem, isAppFunction: boolean): AnySupport;
