import { TagSupport } from './TagSupport.class';
import { TemplaterResult } from '../TemplaterResult.class';
import { TagComponent, TagMaker } from './tag';
export declare function tagElement(app: TagMaker, // (...args: unknown[]) => TemplaterResult,
element: HTMLElement | Element, props?: unknown): {
    tagSupport: TagSupport;
    tags: TagComponent[];
};
export declare function runWrapper(templater: TemplaterResult): TagSupport;
