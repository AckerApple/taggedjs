import { TagSupport } from './TagSupport.class';
import { TemplaterResult } from './templater.utils';
import { Tag } from './Tag.class';
import { TagComponent } from './tag';
export declare function tagElement(app: TagComponent, // (...args: unknown[]) => TemplaterResult,
element: HTMLElement | Element, props: unknown): {
    tag: Tag;
    tags: TagComponent[];
};
export declare function applyTagUpdater(wrapper: TemplaterResult): {
    tag: Tag;
    tagSupport: TagSupport;
};
/** Overwrites arguments.tagSupport.mutatingRender */
export declare function addAppTagRender(tagSupport: TagSupport, tag: Tag): void;
